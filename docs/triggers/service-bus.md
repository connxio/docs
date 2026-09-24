import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Azure Service Bus

The Azure Service Bus trigger receives messages from a queue or topic subscription and sends them into the Connxio pipeline. It receives messages continuously and does not use a trigger interval.

## Configure the trigger

Add a Service Bus trigger to your integration and configure the settings below.

## General settings


<TriggerGeneralSettings />

## Connection settings

<PropertyReference properties={[
  {
    name: "Security configuration",
    description: <>Required. Select the <Link to="/connxio-portal/security-configurations/">security configuration</Link> containing the connection properties for your Service Bus namespace. Use <strong>+</strong> to create a configuration. The connection string must not contain <code>EntityPath</code>; specify the topic or queue name below.</>,
  },
  {
    name: "Service Bus type",
    description: "Choose Topic or Queue to select the source of incoming messages.",
  },
  {
    name: "Topic name",
    description: "Required when Topic is selected. The topic containing the subscription to receive messages from.",
  },
  {
    name: "Queue name",
    description: "Required when Queue is selected. The queue to receive messages from.",
  },
  {
    name: "Subscription name",
    description: "Required when Topic is selected. The subscription to receive messages from.",
  },
]} />

## Service bus settings

<PropertyReference properties={[
  {
    name: "Use pure message sending",
    description: <>Enable when the Service Bus message contains the payload directly. When disabled, the message contains a reference to content in Blob Storage. See <Link to="#pure-message-sending">Pure message sending</Link> and <Link to="#uploading-to-azure-blob-storage">Uploading to Azure Blob Storage</Link> for details.</>,
  },
  {
    name: "Keep message properties",
    description: <>Includes the Service Bus message body and properties in the incoming content as a <code>ConnxioServiceBusMessage</code>. See <Link to="#keep-message-properties">Keep message properties</Link> for details. The Use pure message sending control is unavailable while this setting is enabled.</>,
  },
  {
    name: "Wrapper",
    description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
  },
]} />

## Message handling

Configure the trigger to match the message format used by the sender.

### Uploading to Azure Blob Storage

With **Use pure message sending** disabled, the sender stores the payload in Blob Storage and sends its URI through Service Bus. The message can contain the URI as plain text or a JSON object:

```json
{
  "SasUri": "the URI to the file",
  "FileName": "the file name",
  "InterchangeId": "the interchange ID for the message"
}
```

This lets you process payloads that are too large to send directly through Service Bus. For plain-text URIs, supply the interchange ID in the message's `InterchangeId` user property.

### Pure message sending

Enable **Use pure message sending** when the Service Bus message contains the payload itself. Blob Storage is not needed for this format.

### Keep message properties

Enable **Keep message properties** to include the message body and Service Bus properties in the incoming content as a `ConnxioServiceBusMessage`. This class is available in the [Connxio.Transformation](https://www.nuget.org/packages/Connxio.Transformation/) NuGet package.

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

A code component action can deserialize the content, update its properties, and serialize it back into `transformationContext.Content`. A Service Bus action configured to keep message properties passes those values to the outgoing message.

### InterchangeId

To supply your own ID for transactional logging, set the message's `InterchangeId` user property to the ID as a string. When sending a JSON blob reference, you can include it in the JSON object shown above.


```csharp
Message sbMessage = new Message(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(msgCont)));
sbMessage.UserProperties.Add("InterchangeId", "3c8701dc-858b-4f98-915a-5b3432eb37ec");
```

## Retry

Connxio retries connection failures until connectivity is restored. The default retry interval is 60 seconds. You can override it in the inbound retry configuration. See [Retry](../integrations/retry.md) for details.
