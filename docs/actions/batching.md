---
sidebar_position: 30
sidebar_custom_props:
  action_group: Transform
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import Link from '@docusaurus/Link';

# Batching

The Batching action groups multiple messages into one output message. Messages wait in a bucket until the configured interval runs, then a batching code component or JavaScript written directly in the Connxio portal combines them for subsequent actions.

## Configure the action

Add a Batching action to your integration and select **Code component** or **Script**. For **Code component**, select a batching code component; to create one, see the [Batch example](../integrations/code-components.md#batch-component) in Code components. For **Script**, write your JavaScript in the editor as described below. Select **Done** and save the integration when you are finished.

## General settings

<ActionGeneralSettings showTriggerInterval />

## Batching type

You can select **[Code component](#code-component-settings)** to use an uploaded or externally hosted batching component, or **[Script](#script-settings)** to write JavaScript directly in the portal.

## Code component settings

The following settings apply when **Code component** is selected.

<PropertyReference properties={[
{
name: "Code component",
description: <>Required when Use external code component is disabled. Select the uploaded batching component to run. Use <strong>+</strong> to create a component. See <Link to="/integrations/code-components/#uploading-your-component">Uploading your component</Link> for details.</>,
},
{
name: "Use external code component",
description: "Enable to load a component from an external URI instead of selecting an uploaded component.",
},
]} />

## External code components

Enable **Use external code component** to provide an external URI. The DLL or ZIP must be available through an HTTP GET endpoint.

<PropertyReference properties={[
{
name: "External component URI",
description: "Required when Use external code component is enabled. The URI of the DLL or ZIP to load.",
example: "https://example.com/MyCodeComponent.dll",
},
]} />

## ZIP components

ZIP components can be selected from uploaded code components or loaded from an external URI. When the selected code component is a ZIP component, the **DLL filename with extension** field appears automatically.

<PropertyReference properties={[
{
name: "Use zip mapping",
description: <>Use ZIP mapping for a component packaged with its dependencies in a ZIP, whether uploaded to Connxio or loaded from an external URI. See <Link to="/integrations/code-components/#zipped-code-components">Zipped Code Components</Link> for packaging instructions.</>,
},
{
name: "DLL filename with extension",
description: "Required for ZIP components. The main component DLL inside the ZIP, including the .dll extension. Appears automatically when you select an uploaded ZIP component, or when you enable Use zip mapping for an external component.",
example: "MyCodeComponent.dll",
},
]} />

## Script settings

Select **Script** to combine messages without building and uploading a code component.

<PropertyReference properties={[
{
name: "Script",
description: <>Required when Script is selected. Define an <code>execute(event)</code> handler that receives an array of input events and returns one output event containing message content and metadata. Use <strong>Expand script editor</strong> to open the larger editor.</>,
},
]} />

### Example: combine JSON messages

This example parses each input message's JSON content and combines the results into a JSON array. The output uses the first input message's metadata.

```javascript
/**
 * @param {TransformationEvent[]} event - Messages to combine.
 * @returns {TransformationEvent} The combined message.
 */
const execute = (event) => {
  const batchedContent = [];
  for (const item of event) {
    batchedContent.push(JSON.parse(item.content));
  }
  return {
    content: JSON.stringify(batchedContent),
    metadata: event[0].metadata,
  };
};
```

For example, two input messages with contents `{"id":"item-1"}` and `{"id":"item-2"}` produce this output:

```json
[
  { "id": "item-1" },
  { "id": "item-2" }
]
```

See the [Script action](script.md) for details about the script environment, testing, and dependencies. Batching scripts receive an array of events; the Script action receives a single event.

## Retry

Retry behavior depends on where failure occurs:

1. If a transient error happens before the batching code runs, messages are returned to the queue and retried after 60 seconds.
2. If failure happens after batching code runs, Connxio retries send attempts with increasing delay, then schedules the message through the [disaster pipeline](../integrations/retry.md).

Retries can produce smaller output files than expected. Check your logging provider for warnings; if none appear, contact your representative.

## Limitations

Current limits:

1. A single batch can include up to `1000` input messages
2. Connxio supports messages below `100 MB`

If more than 1000 messages are queued when the interval fires, Connxio splits them into multiple batches.

Example:

> If 2300 messages are in the bucket, Connxio creates three output files: 1000, 1000, and 300 messages.

These limits prevent oversized files and protect both internal and external systems from resource spikes. For plans around files above 100 MB, contact your representative.
