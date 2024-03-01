---
sidebar_position: 4
---

# Azure Storage Blob
The Azure blob storage handler is intended to ease the process of uploading to blob, and has a synergistic relationship with the Service Bus Handler.

## Dependency Injection
When using the Blob-functionality, you need to inject it in your program.cs file. You do this by using the AddInteractionBlobStorage()-method. The method takes one required parameter of object-type BlobClientOptions. The options must contain the Connection String, and optionally your Container Name, and a CreateContainerIfNotExists-boolean. The method also takes one optional parameter for a BlobMessageConfig. This config may also be passed when using the handler method, as well as the Container Name (the container MUST exist).

```csharp
var options = new BlobClientOptions()
{
    CreateContainerIfNotExists = true,
    DefaultConnectionString = builder.Configuration["BlobStorageConnectionString"],
    ContainerName = "test"
};
// alternatively using a section in appsettings
options = builder.Configuration.GetSection(nameof(BlobClientOptions)).Get<BlobClientOptions>();
BlobMessageConfig blobConfig = new()
{
    MessageInboundEncoding = "utf-8",
    MessageInboundFormat = "json",
    Wrap = true,
    WrapperType = WrapperType.Json,
    InterchangeId = Guid.NewGuid().ToString(),
    IsLoadTest = false,
    IsTest = false
};
builder.Services.AddInteractionBlobStorage(options, blobConfig);
```

### Usage
To use the handler, you need to serialize your object and send it. We use the BinaryData class for serialization throughout Connxio.

See code below:
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
var input = new BinaryData(testModel);
(var metaData, var sasUri) = await _blobHandler.Handle(input, interchangeId: interchangeId);
```


### Wrapping
You may pass a MessageConfig object with the Wrap-property set to true and WrapperType set to Json if you wish to automatically wrap your message in our Json Wrapper. However, you may also wrap your object yourself or wrap it using the WrapperHelper-class. Remember to check your settings in the portal when using wrapper. 
Currently only the json-wrapper is available.
If you want to wrap your objects automatically (maybe you are running a test) and you haven't included a config during DI, or you need to change the configuration of your message, pass a config in your method-call.
```csharp
BlobMessageConfig config = new()
{
    MessageInboundEncoding = "utf-8",
    MessageInboundFormat = "json",
    Wrap = true,
    WrapperType = WrapperType.Json,
    InterchangeId = Guid.NewGuid().ToString(),
    IsLoadTest = false,
    IsTest = true
};
(var metaData, var sasUri) = await _blobHandler.Handle(input, interchangeId: interchangeId, config:config);
```

### Handling
When uploading to blob, the returned values are the Metadata for the blob and a SasUri for accessing the blob or passing it to a service bus handler. This means that you may have granular control over the functionality and have multiple options for storage and message passing.
E.g. instead of creating an integration that retrieves from blob, you can upload many files to your storage, then pass the SasUris to a Service Bus handler. This can be practical if you wish to keep your files in your storage, as using the Azure Storage adapter will delete the files stored in the original Storage Account.

If you have already stored your data, you may retrieve a SasUri using the GetSasUri method.
```csharp
// ContainerName and TimeSpan may be left out. ContainerName must then be set in your BlobClientOptions. Timespan will be set to 1 hour.
var sasUri = await _blobHandler.GetSasUri(blobname, containerName, timespan);
```
