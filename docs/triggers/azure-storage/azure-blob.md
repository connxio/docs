import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Azure Blob

The Azure Blob trigger retrieves blobs from an Azure Storage container and sends them into the Connxio pipeline.

## Configure the trigger

Add an Azure Blob trigger to your integration and configure the settings below.

## General settings

<TriggerGeneralSettings showTriggerInterval />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Container Name",
description: "Required. The container to retrieve blobs from. The container must already exist; Connxio does not create it.",
},
{
name: "Use data lake",
description: "Enables Data Lake support. When enabled, you must also specify a Directory.",
},
{
name: "Directory",
description: <>Shown and required when <strong>Use data lake</strong> is enabled. The directory to retrieve files from.</>,
},
]} />

## Advanced settings

<PropertyReference properties={[
{
name: "Pick limit",
description: "Optional. The maximum number of blobs to retrieve per pickup. Use this to limit the load on receiving services.",
},
{
name: "Regex filter",
description: "An inclusive filter that selects only matching blobs. Uses C# regular expression syntax.",
},
{
name: "Wrapper",
description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
},
]} />

## Retry

If a scheduled pickup fails before the message is retrieved, Connxio retries every 60 seconds until pickup succeeds, even when the configured trigger interval is longer.

After pickup, Connxio cannot guarantee that a message can be returned to external storage. Failures at this stage use the catastrophic retry handling described in [Retry](../../integrations/retry.md).
