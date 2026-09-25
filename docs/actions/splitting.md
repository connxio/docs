---
sidebar_position: 40
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import Link from '@docusaurus/Link';

# Splitting

The Splitting action breaks one message into multiple smaller messages using a splitting code component. Each output continues through the pipeline independently as a new message.

## Configure the action

Add a Splitting action to your integration and select a splitting code component. To create one, see the [Split example](../integrations/code-components.md#split-component) in Code components.

## General settings

<ActionGeneralSettings />

## Component settings

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

## Testing and best practices

Connxio can generate messages at ~4000 per second at full capacity, so uncontrolled test runs can produce a lot of traffic and incur costs. Recommended test progression:

1. One file that splits into 2 messages.
2. Two files with 200 messages each.
3. Progressively larger files (multiply by 10) up to production level.

Always test at **peak load × 2** to account for unexpected spikes.

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
