# Service Bus Inbound Adapter

- [Service Bus Inbound Adapter](#service-bus-inbound-adapter)
  - [Limitations](#limitations)
  - [Message transfer pattern](#message-transfer-pattern)
    - [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob)
    - [Pure Message Sending](#pure-message-sending)
      - [InterchangeId](#interchangeid)
  - [Configuring Service Bus message intake](#configuring-service-bus-message-intake)
  - [Polling interval](#polling-interval)
  - [Retry](#retry)

ConnXio (CX) lets customers provide data to the CX pipeline by enqueueing it onto [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview). This page details how to create an integration which pick up messages from Azure Service Bus.

## Limitations

There are almost no limitations on Service Bus, it is in many ways the superior way to handle and transfer data in the cloud. We use Service Bus exclusively internally. Service Bus handles almost an unlimited amount of messages and can be scaled to fit your needs. There are some patterns you should be familiar with when using Service Bus, if you opt out of these patterns be aware that you might end up hitting limitations of your own making.

The Service Bus adapter is limited to using [Topics](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions) currently. If you need Queue functionality or other changes blease contact your CX representative.

## Message transfer pattern

We support two patterns when providing data to CX via Service Bus:

### Metadata on Bus, data as blob

This pattern is by far the most secure, robust, fast and reliable way to use Service Bus, and entails simply supplying Service Bus with metadata messages that contain a reference to a file hosted in a way that lets you retrieve it by Rest. The easiest and most cost efficient way to do this is by using AzureStorage Blob and supplying CX with the [SasUri](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview). The messages you send to the configured Service Bus should be JSON and look like this:

```json
{
    "SasUri": "***********************************",
    "FileName": "file.json",
    "InterchangeId": "f681382-****-567c-81d8-****""
}
```

- **SasUri**: The uri that hosts the actual message data.
- **FileName**: Used for [variable replacement](/Documentation/Transformation/Variable%20Replacement.md).
- **InterchangeId**: Used as InterchangeId as detailed in [core concepts](/Documentation/Core%20Concepts.md).

When the CX inbound adapter fires the metadata message will be picked up from Service Bus and the data will be fetched from the Uri before the data is sent to the next part of the CX pipeline.

There are multiple advantages to using this metadata pattern instead of supplying the data inside the Service Bus. **Firstly** there are limits on how much data Service Bus allows on the bus which suggests that adding data directly is not recommended. **Secondly** a blob framework is much more robust and cost efficient at storing data than a Queue infrastructure. **Thirdly** you can scale down your service bus since large messages will not be hogging your message unit capacity. There are even more benefits to using metadata on bus but these are easily accessible on the internet and in Microsoft documentation.

### Pure Message Sending

This pattern involves sending data through Service Bus. This is not recommended and should only be done is special cases where handling blobs are impossible or contributes to higher risk. A message sent with pure messaging is composed of data only, to be more specific you send the data *as the service bus message*. Cx will then handle the Service Bus message itself as the content. With this pattern you loose the ability to supply your own InterchangeId and Filename.

#### InterchangeId

You can supply your own InterchangeId for transactional logging purposes by adding a user property to the message with the key `InterchangeId` and the string value for the InterchangeId itself. I.e.:

```csharp
Message sbMessage = new Message(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(msgCont)));
sbMessage.UserProperties.Add("InterchangeId", "3c8701dc-858b-4f98-915a-5b3432eb37ec");
```

Be sure to read the [Core Concepts](/Documentation/Core%20Concepts.md) for more information about supplying your own InterchangeId.

## Configuring Service Bus message intake

To configure CX to start fetching data from Service Bus select the "Service Bus" option in the "Inbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Service%20bus%20inbound%20config.png?sv=2020-08-04&st=2022-01-11T10%3A05%3A24Z&se=2040-01-12T10%3A05%3A00Z&sr=b&sp=r&sig=7Yh9XRzX%2FKF99aoiGDSFT43w9XkDUcRQwKPbufYpl60%3D)

- **Polling Interval**: Dictates when files are picked from the Azure Storage account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/Documentation/Security/Security%20Configurations.md) that contains the relevant connection properties.
- **Topic Name**: The name of the topic.
- **Subscription Name**: The name of the subscription to pick files from.
- **Use Pure Message Sending**: Enables the [Pure Message Sending Pattern](#pure-message-sending). If kept unchecked the [Metadata on Bus, data as blob](#metadata-on-bus-data-as-blob) pattern is used.

## Polling interval

`needs picture`
Polling interval dictates when the fetch operation triggers from CX. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds. Be aware that Service Bus keeps connections open for a while after the connection is established so messages may be picked for up to 5 minutes after the polling interval.

## Retry

Since CX reaches out and picks up files when using the Service Bus inbound adapter, retry is handled by the CX framework. If a fault happens when the [polling interval](#polling-interval) hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, CX will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however since CX cant be sure the message is possible to requeue on the external Service Bus. The message will then be sent to catastrophic retry as described in the [Retry Page](/Documentation/Retry.md).
