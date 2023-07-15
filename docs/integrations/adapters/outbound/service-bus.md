# Azure Service Bus

The Service Bus outbound adapter in Connxio integrates with Azure Service Bus, enabling users to send messages to Service Bus topics or queues. It leverages Azure's reliable and scalable messaging capabilities for efficient message exchange.


## Configuring the Service Bus adapter

To configure Connxio to start sending data to your Service Bus select the "Service Bus" option in the "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)

The following properties are used to configure the adapter:

- **Adapter Name**: The name of the adapter. Only used for UI purpouses.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).
- **Service Bus Type**: Sets if queue or topic is used.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties. Note that a servicebus connection string cannot contain 'EntityPath', as this information is set in the 'Topic Name' or 'Queue Name' field.
- **Queue/Topic Name**: The name of the queue or topic.
- **Message label**: The label to be added to the service bus message.
- **Use Pure Message Sending**: Enables the [Pure Message Sending Pattern](#pure-message-sending). If kept unchecked one of the [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob) patterns is used.
- **Duplicate Detection**: Terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'
- **Keep Message Properties**: ?

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

<br />

When selecting a message handling pattern, consider the size of your message payloads and the desired level of storage flexibility. Both options offer their own advantages and can be chosen based on your specific integration requirements.


## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling backoff retry.
