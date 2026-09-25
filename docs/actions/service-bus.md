import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Azure Service Bus

The Azure Service Bus action sends messages from the Connxio pipeline to a queue or topic. Send the payload directly or store it in Azure Blob Storage and send a reference through Service Bus.

## Configure the action

Add a Service Bus action to your integration and configure the settings below.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Service Bus namespace. Use <strong>+</strong> to create a configuration. The connection string must not contain <code>EntityPath</code>; specify the topic or queue name below.</>,
},
{
name: "Service Bus type",
description: "Choose Topic or Queue to select the destination for outgoing messages.",
},
{
name: "Topic name",
description: "Required when Topic is selected. The topic to send messages to.",
},
{
name: "Queue name",
description: "Required when Queue is selected. The queue to send messages to.",
},
]} />

## Service bus settings

<PropertyReference properties={[
{
name: "Use pure message sending",
description: <>Enable to send the payload directly in the Service Bus message. When disabled, Connxio stores the payload in Blob Storage and sends a reference to it. See <Link to="#pure-message-sending">Pure message sending</Link> and <Link to="#uploading-to-azure-blob-storage">Uploading to Azure Blob Storage</Link> for details.</>,
},
{
name: "Keep message properties",
description: <>Enable when the outgoing content is a serialized <code>ConnxioServiceBusMessage</code> containing the body and Service Bus properties to send. See <Link to="#keep-message-properties">Keep message properties</Link> for details.</>,
},
{
name: "Message contract",
description: <>The structure of the Blob Storage reference sent when Use pure message sending is disabled. Use <strong>SasUri Only</strong> for a plain-text URI, or a JSON structure containing the URI, file name, and interchange ID. See <Link to="#uploading-to-azure-blob-storage">Uploading to Azure Blob Storage</Link> for the JSON structure.</>,
},
{
name: "Message label",
description: "The label to add to the Service Bus message.",
example: "OrderCreated",
},
{
name: "New interchange ID",
description: "Enable to remove the interchange ID from the action-specific metadata so that a new ID is generated when the message re-enters Connxio.",
},
]} />

## Duplicate detection

<ActionDuplicateDetection />

## Message handling

Configure the action to match the message format expected by the receiver.

### Uploading to Azure Blob Storage

With **Use pure message sending** disabled, Connxio stores the payload in Blob Storage and sends its URI through Service Bus. This lets you send references to payloads that are too large to include directly in a Service Bus message.

Choose the **Message contract** to control the reference format:

- **SasUri Only** sends the URI as plain text. The interchange ID is included in the Service Bus message's `InterchangeId` user property.
- The **JSON structure** includes the URI, file name, and interchange ID in the message body:

```json
{
  "SasUri": "the URI to the file",
  "FileName": "the file name",
  "InterchangeId": "the interchange ID for the message"
}
```

### Pure message sending

Enable **Use pure message sending** to include the payload directly in the Service Bus message. Blob Storage is not needed for this format. The payload must fit within the receiving Service Bus entity's message size limit.

### Keep message properties

Enable **Keep message properties** to send content represented by a `ConnxioServiceBusMessage`. This class is available in the [Connxio.Transformation](https://www.nuget.org/packages/Connxio.Transformation/) NuGet package.

```csharp
public class ConnxioServiceBusMessage
{
    public string BodyContent { get; set; }
    public string MessageId { get; set; }
    public string PartitionKey { get; set; }
    public string TransactionPartitionKey { get; set; }
    public string SessionId { get; set; }
    public string ReplyToSessionId { get; set; }
    public TimeSpan TimeToLive { get; set; }
    public string CorrelationId { get; set; }
    public string Subject { get; set; }
    public string To { get; set; }
    public string ContentType { get; set; }
    public string ReplyTo { get; set; }
    public DateTime ScheduledEnqueueTime { get; set; }
    public Dictionary<string, string> ApplicationProperties { get; set; }
    public string LockToken { get; set; }
    public int DeliveryCount { get; set; }
    public DateTime LockedUntil { get; set; }
    public int SequenceNumber { get; set; }
    public string DeadLetterSource { get; set; }
    public int EnqueuedSequenceNumber { get; set; }
    public DateTime EnqueuedTime { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string DeadLetterReason { get; set; }
    public string DeadLetterErrorDescription { get; set; }
    public int State { get; set; }
}
```

If a [Service Bus trigger](../triggers/service-bus.md#keep-message-properties) keeps message properties, its content already contains this structure. A code component can deserialize it to update the body or properties:

```csharp
ConnxioServiceBusMessage message = JsonConvert.DeserializeObject<ConnxioServiceBusMessage>(transformationContext.Content);
```

After making changes, serialize the object back into `transformationContext.Content`. The Service Bus action uses the supplied body and outgoing message properties when sending.

You can also create and serialize a `ConnxioServiceBusMessage` from other content without using a Service Bus trigger.

## Retry

See [Retry](../integrations/retry.md) for Connxio's retry configuration and message failure handling.
