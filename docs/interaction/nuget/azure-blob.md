---
sidebar_position: 4
---

# Azure Storage Blob
The Azure blob storage handler is intended to ease the process of uploading to blob, and has a synergistic relationship with the Service Bus Handler.

## Dependency Injection
When using the Blob-functionality, you need to inject it in your program.cs file. You do this by using the AddInteractionBlobStorage()-method. The method takes one optional parameter of object-type BlobClientOptions. The options should contain your Container Name, Connection String and a CreateContainerIfNotExists-boolean.

```csharp
builder.Services.AddInteractionBlobStorage(new BlobClientOptions()
{
    CreateContainerIfNotExists = false,
    DefaultConnectionString = builder.Configuration["BlobStorageConnectionString"],
    ContainerName = "synctest"
});
```

## Usage
To use the handler, you need to serialize your object and send it. See code below:
```csharp
var testModel = new TestModel() { Id = 1, Name = "name" };
var input = JsonSerializer.Serialize(testModel);
(var metaData, var sasUri) = await _blobHandler.Handle(input, interchangeId: interchangeId);
```


##### Wrapping
You may pass a MessageConfig object with the Wrap-property set to true and WrapperType set to Json if you wish to automatically wrap your message in our Json Wrapper. However, you may also wrap your object yourself and pass no Config object. Remember to check your settings in the portal when using wrapper. 
Currently only the json-wrapper is available.
If you want to wrap your objects automatically, don't forget to pass the config in your method-call.
```csharp
(var metaData, var sasUri) = await _blobHandler.Handle(input, interchangeId: interchangeId, config:config);
```

##### Handling
When uploading to blob, the returned values are the Metadata for the blob and a SasUri for accessing the blob or passing it to a service bus handler. This means that you may have granular control over the functionality and have multiple options for storage and message passing.
E.g. instead of creating an integration that retrieves from blob, you can upload many files to your storage, then pass the SasUris to a Service Bus handler. This can be practical if you wish to keep your files in your storage, as using the Azure Storage adapter will delete the files stored in the original Storage Account.

If you have already stored your data, you may retrieve a SasUri using the GetSasUri method.
```csharp
// ContainerName and TimeSpan may be left out. ContainerName must then be set in your BlobClientOptions.
var sasUri = await _blobHandler.GetSasUri(blobname, containerName, timespan);
```
