---
sidebar_position: 3
---

# Service Bus
The Service Bus Handler is intended to make the process of sending messages through a Service Bus easier, whilst also automating some of the work when it comes to uploading the message to blob for Connxio to pick up.

## Dependency Injection
Use the AddInteractionServiceBus()-method to inject the Service Bus handler for use. If you wish to use the UploadBlobSendSBMessage()-method, you need to inject the blob handler as well. If you include queueOrTopic name in the ServiceBusClientOptions-object, you do not need to pass this value when using handler-methods. This goes for the BlobStorage DI as well. You may inject both without options, and use the factories directly.
```csharp
builder.Services.AddInteractionServiceBus(new ServiceBusClientOptions()
{
    ConnectionString = builder.Configuration["ServiceBusConnectionString"]!,
    QueueOrTopicName = "testing"
});
```

##### Compression
When using our BlobHandler, compression is done automatically. It is important to note that the compression algorithm used for objects through CX is GZip. The body of the blob-data needs to be compressed correctly and the InboundMessageFormat needs to be **gz** (both in the portal and in your code). When using the wrapped option, the body in the wrapper needs to be compressed in this same way as well. There is a Helper-class for getting the correct compression if you wish to use your own implementation instead. 
This does not affect PureMessageSending
 
##### Handle()-method
You may interact with the NuGet in multiple ways to pass service bus messages. The standard version is using the Handle-method which takes an InboundServiceBusMessage-object which requires a SaSUri for the blob. CX uses the uri to pick up the data along the way to process it. The BlobHandler has the GetSasUri() method for retrieving the uri. It also returns the uri when you use the handler to store an object. If you wish to wrap your object, you need to do it manually here.

Example:
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
var input = JsonSerializer.Serialize(testModel);
(var metaData, var sasUri) = await _blobHandler.Handle(input);
var msg = new InboundServiceBusMessage()
{
    FileName = $"{interchangeId}.json",
    InterchangeId = interchangeId,
    SasUri = sasUri
};

await _serviceBusHandler.Handle(msg);
```

##### UploadBlobSendSBMessage()-method
This method uploads a blob to your storage account and sends a message to your Service Bus where it is picked up by CX. The input is a string representation of your object, and you may specify filename, the queue or topic to send it to, as well as the container on your blob storage that you want to store to. Compression is handled for you.
Example:
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
MessageConfig config = new()
{
    MessageInboundEncoding = MessageInboundEncoding.UTF8,
    MessageInboundFormat = MessageInboundFormat.JSON,
    PureMessageSending = false,
    Wrap = true,
    WrapperType = WrapperType.Json,
    InterchangeId = interchangeId,
    IsLoadTest = true,
    IsTest = true
};

var input = JsonSerializer.Serialize(testModel);
await _serviceBusHandler.UploadBlobSendSBMessage(input, config: config);
```
In the example above, the message will be automatically wrapped.
You may also do pure message sending whilst uploading to Blob. This can be useful if you wish to do multiple actions, using the same file, through different integrations, or if you are storing backups etc. This option is set in the MessageConfig-object.



##### HandlePureMessage
Sends a plain representation of the object-body as a string. When using this option, no compression is needed on the objects. 
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
var input = JsonSerializer.Serialize(testModel);
await _serviceBusHandler.HandlePureMessage(input);
```
