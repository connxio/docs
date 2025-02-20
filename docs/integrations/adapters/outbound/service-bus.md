# Azure Service Bus

The Service Bus outbound adapter in Connxio integrates with Azure Service Bus, enabling users to send messages to Service Bus topics or queues. It leverages Azure's reliable and scalable messaging capabilities for efficient message exchange.


## Configuring the Service Bus adapter

To configure Connxio to start sending data to your Service Bus select the "Service Bus" option in the "Outbound Connections" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new adapter, a popup with the adapter's input fields will appear.
Service Bus has 4 sections; Adapter name, Acknowledgement settings, Core settings and Advanced settings.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-sections-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:

### Adaptername & Ack

- **Adapter Name**: The logical name of the adapter. This is shown in outbound adapter list in the subintegration view.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).


### Core Settings
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="data pickup interval"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sb-core-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sb-core-dark.webp#dark-only'),
    }}
  />
</div>

- **Service Bus Type**: Sets if queue or topic is used.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties. Note that a servicebus connection string cannot contain 'EntityPath', as this information is set in the 'Topic Name' or 'Queue Name' field.
- **Queue/Topic Name**: The name of the queue or topic.

### Advanced settings

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="data pickup interval"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sb-settings-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sb-setting-dark.webp#dark-only'),
    }}
  />
</div>

- **Message label**: The label to be added to the service bus message.
- **Use Pure Message Sending**: Enables the [Pure Message Sending Pattern](#pure-message-sending). If kept unchecked one of the [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob) patterns is used.
- **Keep message Properties**: When enabled, CX expects a `ConnxioServiceBusMessage` when uploading to bus.
- **Duplicate Detection**: Terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'
- **New Interchange Id**: Removes interchange id from adapter specific metadata to force new id on re-entry.

## Message Handling Patterns

When using the Service Bus outbound adapter in Connxio, you have the option to choose between two message handling patterns: uploading the message to an Azure Blob Storage or pure message sending.

### Uploading to Azure Blob Storage

In this pattern, Connxio uploads the message payload to an Azure Blob Storage container. Connxio offers two different options for including the blob URI within the Service Bus message. This approach is useful when dealing with large message payloads that exceed the size limitations of direct message sending.

1. **URI only:**
   In this option, the URI to the file in the Azure Blob Storage is included as plain text within the Service Bus message. This is a straightforward approach that allows easy access to the file by directly using the URI provided. The message's interchangeId will be included in the Service Bus message's `UserProperties` object with the key `InterchangeId`.

2. **JSON Structure:**
   Alternatively, you can choose to include the blob URI, file name, and interchange ID in a JSON structure within the Service Bus message. The structure looks like this:
```json
{
    "SasUri": "the URI to the file",
    "FileName": "the file name",
    "InterchangeId": "the interchange ID for the message"
}
```

This JSON structure provides a more organized representation of the necessary information related to the file in the Azure Blob Storage.

### Pure Message Sending

Alternatively, you can opt for pure message sending, where the message payload is included directly within the Service Bus message itself. This pattern is suitable for smaller message payloads that do not require external storage. By embedding the message directly, you eliminate the need for additional storage and simplify the overall message handling process.

### Keep message properties

The _Keep message Properties_ pattern is a more advanced pattern that enables modification of how the message is sent and received from the Service Bus (SB). When this option is selected Connxio reads the entire SB message and transforms it into a `ConnxioServiceBusMessage` which has the following properties:

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

This class is supplied to you i the [Connxio.Transformation](https://www.nuget.org/packages/Connxio.Transformation/) nuget package and corresponds directly to the SB [ServiceBusReceivedMessage](https://learn.microsoft.com/en-us/dotnet/api/azure.messaging.servicebus.servicebusreceivedmessage?view=azure-dotnet) class managed by Microsoft. 

All attributes changed in the `ConnxioServiceBusMessage` are propagated to the outbound SB. When _Keep message Properties_ is enabled inbound the `ConnxioServiceBusMessage` is placed inside your file content and `TransformationContext.Content`. To change any of the properties you need to create a code map and deserialize the message like so:

```csharp
ConnxioServiceBusMessage obj = JsonConvert.DeserializeObject<ConnxioServiceBusMessage>(transformationContext.Content);
```

After the abject is serialized you can change the desired properties and then serialize the `ConnxioServiceBusMessage` back into `transformationContext.Content`.

When this property is used for outbound adapters you can create the `ConnxioServiceBusMessage` class directly from whatever content you desire. Connxio will honor the properties set and send them to the Sb without the need for and SB inbound adapter.

### Conclusion

When selecting a message handling pattern, consider the size of your message payloads and the desired level of storage flexibility. Both options offer their own advantages and can be chosen based on your specific integration requirements.

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling backoff retry.
