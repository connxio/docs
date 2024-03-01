---
sidebar_position: 3
---

# Service Bus
The Service Bus Handler is intended to make the process of sending messages through a Service Bus easier, whilst also automating some of the work when it comes to uploading the message to blob for Connxio to pick up.

## Dependency Injection
Use the AddInteractionServiceBus()-method to inject the Service Bus handler for use. If you wish to use the UploadBlobSendSBMessage()-method, you need to inject the blob handler as well. If you include queueOrTopic name in the ServiceBusClientOptions-object, you do not need to pass this value when using handler-methods. This goes for the BlobStorage DI as well.

Example:

```csharp
var options = new ServiceBusClientOptions()
{
    ConnectionString = builder.Configuration["ServiceBusConnectionString"]!,
    QueueOrTopicName = "testing"
};
// alternatively using a section in appsettings
options = builder.Configuration.GetSection(nameof(ServiceBusClientOptions)).Get<ServiceBusClientOptions>();
ServiceBusMessageConfig sbConfig = new()
{
    MessageInboundEncoding = "utf-8",
    MessageInboundFormat = "json",
    PureMessageSending = false,
    Wrap = true,
    WrapperType = WrapperType.Json,
    InterchangeId = Guid.NewGuid().ToString(),
    IsLoadTest = false,
    IsTest = false
};

builder.Services.AddInteractionServiceBus(options, sbConfig);
```

 
### Handle()-method
You may interact with the NuGet in multiple ways to pass service bus messages. The standard version is using the Handle-method which takes an InboundServiceBusMessage-object which requires a SaSUri for the blob. CX uses the uri to pick up the data along the way to process it. The BlobHandler has the GetSasUri() method for retrieving the uri. It also returns the uri when you use the handler to store an object. If you wish to wrap your object, either pass a config or you need to do it manually here.

Example:
```csharp
ServiceBusMessageConfig config = new()
{
    MessageInboundEncoding = "utf-8",
    MessageInboundFormat = "json",
    PureMessageSending = false,
    Wrap = true,
    WrapperType = WrapperType.Json,
    InterchangeId = interchangeId,
    IsLoadTest = false,
    IsTest = false
};
var testModel = new TestModel() { Id = 1, Name = "name" };
var input = new BinaryData(testModel);
//item is a tuple(BlobMetadata, string(SaSUri))
var item = await _blobHandler.Handle(input, config: config);
var msg = new InboundServiceBusMessage()
{
    FileName = fileName,
    InterchangeId = item.Item1.Metadata["InterchangeId"],
    SasUri = item.Item2
};
await _serviceBusHandler.Handle(msg, config:config);
```

### UploadBlobSendSBMessage()-method
This method uploads a blob to your storage account and sends a message to your Service Bus where it is picked up by CX. The input is a BinaryData-object, and you may specify filename, the queue or topic to send it to, as well as the container on your blob storage that you want to store to.
Example:
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
ServiceBusMessageConfig config = new()
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

var input = new BinaryData(testModel);
await _serviceBusHandler.UploadBlobSendSBMessage(input, config: config);
```
In the example above, the message will be automatically wrapped.
You may also do pure message sending whilst uploading to Blob. This can be useful if you wish to do multiple actions, using the same file, through different integrations, or if you are storing backups etc. This option is set in the MessageConfig-object.



### HandlePureMessage
Sends a plain representation of the object-body as a BinaryData-object. When using this option, your message is sendt as is through Connxio without needing to store it to a Blob. You may also pass a config and/or wrap your messages when using Pure Message Passing.
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
var input = new BinaryData(testModel);
await _serviceBusHandler.HandlePureMessage(input);
```
