import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Azure Queue

The Azure Queue action sends messages from the Connxio pipeline to an Azure Storage queue. Send the message content directly or send a reference to the content in Blob Storage.

## Configure the action

Add an Azure Queue action to your integration and configure the settings below.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Queue name",
description: "Required. The queue to send messages to.",
example: "outgoing-messages",
},
]} />

## Advanced settings

<PropertyReference properties={[
{
name: "Use pure message sending",
description: "Enable to send the message content directly in the queue message. When disabled, Connxio sends a reference to the content in Blob Storage.",
},
{
name: "Message contract",
description: <>The structure of the Blob Storage reference sent when Use pure message sending is disabled. Choose the contract expected by the receiver. <strong>SasUri Only</strong> sends the URI pointing to the stored content.</>,
example: "SasUri Only",
},
]} />

## Duplicate detection

<ActionDuplicateDetection />

## Retry

See [Retry](../../integrations/retry.md) for Connxio's retry configuration and message failure handling.
