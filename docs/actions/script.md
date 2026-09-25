---
sidebar_position: 10
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Script

The Script action transforms message content and metadata using JavaScript written directly in the Connxio portal. Use it for small transformations without building and uploading a code component.

## Configure the action

Add a Script action to your integration and write your JavaScript in the code editor. Modify the supplied example or use the example below. Select **Done** and save the integration when you are finished.

## General settings

<ActionGeneralSettings />

## Writing a script

Define an `execute(event)` handler. The `event` object contains the message content and metadata. Return the modified event so the next action receives your changes.

This example parses JSON content, adds a field, and writes the updated JSON back to the event:

```javascript
/**
 * @param {TransformationEvent} event - Message content and metadata.
 * @returns {TransformationEvent} The modified event.
 */
const execute = (event) => {
  const myObj = JSON.parse(event.content);
  myObj.newField = "This is a new field added to the JSON object.";
  event.content = JSON.stringify(myObj);
  return event;
};
```

:::info Script environment
Scripts run in a sandbox with limited access to system resources. File I/O is not available. The `fetch` API is available for HTTP requests, but other network operations are restricted.
:::

## Testing a script

Use **Test Script** in the editor to run your script with sample content and metadata before using it in a live integration. Review the generated output and any errors in the test results.

<div style={{maxWidth: '800px'}}>
  <ThemedImage
    alt="test script shape"
    style={{boxShadow: 'none'}}
    sources={{
      light: useBaseUrl('/img/docs/transformations/test-script-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/test-script-dark.webp#dark-only'),
    }}
  />
</div>

Use `console.log()` to write debug information to the **Logs** section of the test results. Entries appear in the order they were written. Console logs are ignored when the script runs in a live integration.

## Dependencies

You can import external JavaScript modules in your scripts using ESM (ECMAScript Modules) syntax. Modules are automatically resolved from [jsDelivr](https://www.jsdelivr.com/) or [esm.sh](https://esm.sh/), so you can import them by package name and version:

```javascript
import { cloneDeep } from "lodash-es@4.17.23";
```

:::info Versioning

- Always specify a version when importing modules to ensure consistent behavior
- If no version is specified, the latest version available will be used, which may lead to unexpected changes if the module is updated
  :::

### Example: XML to JSON transformation

```javascript
import { XMLParser } from "fast-xml-parser@5.3.4";

/**
 * @param {TransformationEvent} event - Contains the file content and metadata about the file.
 * @returns {TransformationEvent} Return the modified event.
 */
const execute = (event) => {
  const xmlString = event.content;
  // Create parser instance
  const parser = new XMLParser();
  // Parse XML
  const result = parser.parse(xmlString);
  const myObj = {
    id: result.Root.TheProperty.TheId,
  };
  event.content = JSON.stringify(myObj);
  return event;
};
```

:::warning Module compatibility

- Only modules with ESM builds are supported
- Module compatibility varies depending on the module's dependencies and implementation. Modules without external dependencies have the highest likelihood of working correctly in the sandboxed environment
- Adding a module import will increase the execution time of your script
  :::

<!-- ### Creating custom modules

You can publish your own reusable modules to npm and use them in your scripts. This is useful when you have transformation logic that you want to share across multiple integrations or with your team.

#### Module structure

Create a standard JavaScript/TypeScript project with an ESM entry point:

```bash
my-connxio-module/
├── package.json
├── src/
│   └── index.js
└── dist/
    └── index.js  (compiled output)
```

Your main module file should export the functions you want to use:

```javascript
// src/index.js - Named exports (recommended for clarity)
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeString(str) {
  return str.trim().toLowerCase();
}

// Or use a default export
export default {
  validateEmail,
  sanitizeString,
};
```

#### Package.json configuration

Ensure your `package.json` is configured for ESM:

```json
{
  "name": "@yourorg/my-connxio-module",
  "version": "1.0.0",
  "description": "Custom module for Connxio scripts",
  "type": "module",
  "main": "dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  },
  "files": ["dist"]
}
```

The `"type": "module"` field is essential—it tells npm that your module uses ESM syntax.

:::warning No external npm dependencies

Custom modules **cannot have external npm dependencies**. Your module must be completely self-contained with all functionality implemented in the module itself. If you need to use a third-party library, import it directly in your script instead of bundling it with your custom module.

:::

#### Sandboxing constraints

When creating custom modules, keep in mind the following restrictions of the sandboxed environment:

- **No Node.js APIs** - No `fs`, `path`, `http`, `crypto` modules
- **No native modules** - Your module cannot use compiled C/C++ extensions
- **No external network calls** (except `fetch` API) - No direct socket connections
- **No external npm dependencies** - Your module must be completely self-contained

Modules are limited to pure JavaScript with no external dependencies.

#### Testing locally

Before publishing, test your module locally by importing it in Node.js:

```javascript
// test.js
import { validateEmail, sanitizeString } from "./dist/index.js";

const result = validateEmail("user@example.com");
console.log(result); // true
```

You can also build and test it as if it were imported from jsDelivr by using a local HTTP server or bundler.

#### Making your module accessible

You have two options for making your custom module accessible:

**Option 1: Publish to npm**

Publish your module to npm, and it will be automatically available for import:

```javascript
import { validateEmail, sanitizeString } from "@yourorg/my-connxio-module";
```

**Option 2: Self-host the .js file**

You can also host the compiled `.js` file yourself on any publicly accessible CDN or web server and import it directly:

```javascript
import {
  validateEmail,
  sanitizeString,
} from "https://my-api-or-cdn.com/validateemail.js";
```

This gives you full control over versioning and deployment.

#### Using your custom module

Once your module is published to npm or self-hosted, import it in your scripts:

```javascript
// Named imports from npm
import { validateEmail, sanitizeString } from "@yourorg/my-connxio-module";

/**
 * @param {TransformationEvent} event - Contains the file content and metadata about the file.
 * @returns {TransformationEvent} Return the modified event.
 */
const execute = (event) => {
  const data = JSON.parse(event.content);

  if (!validateEmail(data.email)) {
    throw new Error("Error|Invalid email address");
  }

  data.name = sanitizeString(data.name);
  event.content = JSON.stringify(data);
  return event;
};
```

Or with a self-hosted module:

```javascript
import utils from "https://my-api-or-cdn.com/utils.js";

/**
 * @param {TransformationEvent} event - Contains the file content and metadata about the file.
 * @returns {TransformationEvent} Return the modified event.
 */
const execute = (event) => {
  const data = JSON.parse(event.content);

  if (!utils.validateEmail(data.email)) {
    throw new Error("Error|Invalid email address");
  }

  data.name = utils.sanitizeString(data.name);
  event.content = JSON.stringify(data);
  return event;
};
```

#### Dependency considerations

- **Avoid heavy dependencies** - Each import increases script execution time
- **Check ESM compatibility** - Ensure all dependencies provide ESM builds
- **Simple is better** - Modules without external dependencies are more reliable in the sandboxed environment
- **Specify versions** - Always pin your module version for consistency

```javascript
// Good - specific version from npm
import { myFunc } from "@yourorg/my-module@1.2.3";

// Also good - self-hosted with version
import { myFunc } from "https://my-cdn.com/my-module/v1.2.3/index.js";
``` -->

## Termination

Throw an `Error` to stop processing a message. Prefix the error message with a code word followed by a pipe (`|`) to control how the termination is logged. The text after the pipe becomes the log description.

```javascript
throw new Error("Warning|Integration terminated with warning");
```

<PropertyReference properties={[
{
name: "Success",
description: "Logs the termination as a success with the minimum log level.",
},
{
name: "Warning",
description: "Logs the termination as a warning with the minimum log level.",
},
{
name: "Error",
description: "Logs the termination as an error with the none log level.",
},
{
name: "Loglevel:None",
description: "Logs the termination with the Terminated status and the none log level instead of the default minimum level.",
},
{
name: "Loglevel:Never",
description: "Stops processing without logging the termination.",
},
{
name: "PersistError",
description: <>Append <code>|PersistError</code> to the end of the error message to persist the error to failures.</>,
example: 'throw new Error("Error|Processing failed|PersistError");',
},
{
name: "Default behavior",
description: "Errors without a recognized code word use normal error handling and the error log level. The integration is not considered terminated by the user.",
},
]} />

See [Logging](../integrations/logging.md) for log levels and integration logging configuration.
