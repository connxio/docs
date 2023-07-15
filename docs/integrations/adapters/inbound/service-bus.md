# Azure Service Bus

The Azure Service Bus inbound adapter in Connxio enables seamless integration with Azure Service Bus, a cloud-based messaging service. With this adapter, users can receive and process messages from Service Bus topics or queues within their Connxio integrations.


## Configuring the Service Bus adapter

To configure Connxio to start fetching data from Service Bus select the "Service Bus" option in the "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

<br />
The following properties are used to configure the adapter:

- **Polling Interval**: Dictates when files are picked from the Azure Storage account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties. Note that a servicebus connection string cannot contain 'EntityPath', as this information is set in the 'Topic Name' or 'Queue Name' field.
- **Topic Name**: The name of the topic.
- **Subscription Name**: The name of the subscription to pick files from.
- **Use Pure Message Sending**: Enables the [Pure Message Sending Pattern](#pure-message-sending). If kept unchecked the [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob) pattern is used.


## Message Handling Patterns

When using the Service Bus outbound adapter in Connxio, you have the option to choose between two message handling patterns: uploading the message to an Azure Blob Storage or pure message sending.

### Uploading to Azure Blob Storage

In this pattern, you can upload the message payload to an Azure Blob Storage container. Connxio offers two different options for including the blob URI within the Service Bus message. This approach is useful when dealing with large message payloads that exceed the size limitations of direct message sending.

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

<br />

When selecting a message handling pattern, consider the size of your message payloads and the desired level of storage flexibility. Both options offer their own advantages and can be chosen based on your specific integration requirements.

#### InterchangeId

You can supply your own InterchangeId for transactional logging purposes by adding a user property to the message with the key `InterchangeId` and the string value for the InterchangeId itself. I.e.:

```csharp
Message sbMessage = new Message(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(msgCont)));
sbMessage.UserProperties.Add("InterchangeId", "3c8701dc-858b-4f98-915a-5b3432eb37ec");
```

Be sure to read the [Core Concepts](/getting-started/core-concepts) for more information about supplying your own InterchangeId.

## Retry

Since Connxio reaches out and picks up files when using the Service Bus inbound adapter, retry is handled by the Connxio framework. If a fault happens when the [polling interval](#polling-interval) hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, Connxio will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however since Connxio cant be sure the message is possible to requeue on the external Service Bus. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
