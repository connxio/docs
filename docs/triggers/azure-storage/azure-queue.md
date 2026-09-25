import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Azure Queue

The Azure Queue trigger retrieves messages from an Azure Storage queue and sends them into the Connxio pipeline.

## Configure the trigger

Add an Azure Queue trigger to your integration and configure the settings below.

## General settings

<TriggerGeneralSettings />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Queue name",
description: "Required. The queue to retrieve messages from.",
},
]} />

## Advanced settings

<PropertyReference properties={[
{
name: "Pick limit",
description: "Optional. The maximum number of messages to retrieve per pickup. Use this to limit the load on receiving services.",
},
{
name: "Use pure message sending",
description: <>Enable when the queue contains the actual message content. When disabled, Connxio expects a <code>SasUri</code> pointing to the content in Blob Storage.</>,
},
{
name: "Wrapper",
description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
},
]} />

## Retry

See [Retry](../../integrations/retry.md) for Connxio's retry configuration and message failure handling.
