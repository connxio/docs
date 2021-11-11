# Service Bus Outbound Adapter

- [Service Bus Outbound Adapter](#service-bus-outbound-adapter)
  - [Limitations](#limitations)
  - [Message transfer pattern](#message-transfer-pattern)
    - [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob)
    - [Pure Message Sending](#pure-message-sending)
  - [Configuring Service Bus message delivery](#configuring-service-bus-message-delivery)
  - [Retry](#retry)

ConnXio (CX) lets customers receive data from the CX pipeline by enqueueing it onto [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview). This page details how to create an integration which sends messages to Azure Service Bus.

## Limitations

There are almost no limitations on Service Bus, it is in many ways the superior way to handle and transfer data in the cloud. We use Service Bus exclusively internally. Service Bus handles almost an unlimited amount of messages and can be scaled to fit your needs. There are some patterns you should be familiar with when using Service Bus, if you opt out of these patterns be aware that you might end up hitting limitations of your own making.

The Service Bus adapter is limited to using [Topics](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions) currently. If you need Queue functionality or other changes please contact your CX representative.

## Message transfer pattern

We support two patterns when sending data to external Service Bus from the CX pipeline:

### Metadata on Bus, data as blob

This pattern is by far the most secure, robust, fast and reliable way to use Service Bus, and entails CX pushing metadata messages to Service Bus that contain a reference to a file hosted in a way that lets you retrieve it by Rest. The easiest and most cost efficient way to do this is by using AzureStorage Blob which is why CX includes a [SasUri](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview) within the output message. The messages you receive on the configured Service Bus is simply the SasUri and nothing more and looks something like this:

`
https://cx.blob.core.windows.net/container/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltxxxlTLePVt5xxxx6uNkr7Pa9XcY8ovTFJxxx%3D
`

>The InterchangeId is provided in [UserProperties](https://docs.microsoft.com/en-us/rest/api/servicebus/message-headers-and-properties#message-properties) with the key `InterchangeId`.

When a message arrives on your Service Bus all you need to do to precess it is to pick up the content with the SasUri and the InterchangeId from UserProperties (if needed for further logging or other uses)

There are multiple advantages to using this metadata pattern instead of supplying the data inside the Service Bus. **Firstly** there are limits on how much data Service Bus allows on the bus which suggests that adding data directly is not recommended. **Secondly** a blob framework is much more robust and cost efficient at storing data than a Queue infrastructure. **Thirdly** you can scale down your service bus since large messages will not be hogging your message unit capacity. There are even more benefits to using metadata on bus but these are easily accessible on the internet and in Microsoft documentation.

### Pure Message Sending

This pattern involves sending the data itself through Service Bus. This is not recommended and should only be done is special cases where handling blobs are impossible or contributes to higher risk. A message sent with pure messaging is composed of data only, to be more specific you send the data *as the service bus message*. You will handle the Service Bus message itself as the content when it arrives in your handler.

## Configuring Service Bus message delivery

To configure CX to start sending data to your Service Bus select the "Service Bus" option in the "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Service%20Bus%20outbound%20config.png?sv=2020-08-04&st=2021-11-11T13%3A06%3A17Z&se=2040-11-12T13%3A06%3A00Z&sr=b&sp=r&sig=8scdxN%2FU%2FYzcZH%2BRzSgLw4DrTMHRU42MWKg4X%2FkkJU4%3D)

- **Adapter Name**: The logical name of the adapter. This is shown in the configuration view on close.
- **Topic Name**: The name of the topic.
- **Topic Connection String**: The Connection string for the topic.
- **Subscription Name**: The name of the subscription to pick files from.
- **Use Pure Message Sending**: Enables the [Pure Message Sending Pattern](#pure-message-sending). If kept unchecked the [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob) pattern is used.
- **Send Acknowledgement**: Is explained [here](/Adapters/Outbound/Acknowledgment.md).

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/Retry.md). This may change in the future as we are looking into enabling backoff retry.
