---
sidebar_position: 40
sidebar_custom_props:
  action_group: Transform
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import Link from '@docusaurus/Link';

# Splitting

The Splitting action breaks one message into multiple smaller messages using a splitting code component or JavaScript written directly in the Connxio portal. Each output is processed independently as a new message.

## Configure the action

Add a Splitting action to your integration and select **Code component** or **Script**. For **Code component**, select a splitting code component; to create one, see the [Split example](../integrations/code-components.md#split-component) in Code components. For **Script**, write your JavaScript in the editor as described below. Select **Done** and save the integration when you are finished.

## General settings

<ActionGeneralSettings />

## Splitting type

You can select **[Code component](#code-component-settings)** to use an uploaded or externally hosted splitting component, or **[Script](#script-settings)** to write JavaScript directly in the portal.

## Code component settings

The following settings apply when **Code component** is selected.

<PropertyReference properties={[
{
name: "Code component",
description: <>Required when Use external code component is disabled. Select the uploaded splitting component to run. Use <strong>+</strong> to create a component. See <Link to="/integrations/code-components/#uploading-your-component">Uploading your component</Link> for details.</>,
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

Select **Script** to split messages without building and uploading a code component.

<PropertyReference properties={[
{
name: "Script",
description: <>Required when Script is selected. Define an <code>execute(event)</code> handler that returns an array of output events, each containing message content and metadata. Use <strong>Expand script editor</strong> to open the larger editor.</>,
},
]} />

### Example: split a JSON list

This example creates one output message for each item in the input's `list` array. Each output contains the item as JSON and retains the input message's metadata.

```javascript
/**
 * @param {TransformationEvent} event - Message content and metadata.
 * @returns {TransformationEvent[]} The split messages.
 */
const execute = (event) => {
  const { list } = JSON.parse(event.content);
  return list.map((item) => ({
    content: JSON.stringify(item),
    metadata: event.metadata,
  }));
};
```

For example, this input produces two messages, with contents `{"id":"item-1"}` and `{"id":"item-2"}`:

```json
{
  "list": [{ "id": "item-1" }, { "id": "item-2" }]
}
```

See the [Script action](script.md) for details about the script environment, testing, and dependencies. Splitting scripts return an array of events; the Script action returns a single event.

## Retry

Retry behavior depends on where failure occurs:

1. If a transient error happens before the splitting code runs, the original message is returned to the queue and retried up to 10 times.
2. If failure happens after splitting code runs, Connxio retries delivery with increasing delay, then schedules the message through the [disaster pipeline](../integrations/retry.md).

Retries can delay delivery of split message units. Check your logging provider for warnings; if none appear, contact your representative.

## Limitations

Connxio supports input files up to `100 MB`. There is no limit on the number of output messages. Each split message is treated as an independent message, with its own [logs](../integrations/logging.md), [resend events](../interaction/resending-api.md), and errors.

:::caution
Splitting can generate large amounts of traffic. Test your receiving systems thoroughly before sending production-level loads.
:::
