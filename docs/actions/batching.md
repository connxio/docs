---
sidebar_position: 30
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import Link from '@docusaurus/Link';

# Batching

The Batching action groups multiple messages into one output message. Messages wait in a bucket until the configured interval runs, then a batching code component combines them and sends the result through the pipeline.

## Configure the action

Add a Batching action to your integration and select a batching code component. To create one, see the [Batch example](../integrations/code-components.md#batch-component) in Code components.

## General settings

<ActionGeneralSettings showTriggerInterval />

## Component settings

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
