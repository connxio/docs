# Interaction NuGet

The interaction NuGet exists to allow users of Connxio(CX) to interact with the CX API both synchronously and asynchronously. It also provides factories for Blob and ServiceBus interaction, enabling programmatic use of many of Connxio's main features. You still need to set up your integrations in the CX portal, and add any transformation components you may require there.

## Synchronous HTTP

This way of communicating with CX allows for working directly towards the synchronous functionality which will also return the response from the endpoint(s), as well as any errors and exceptions that have been encountered along the way. The batching endpoint is only available asynchronously.

### Dependency Injection

The synchronous and asynchronous versions have separate injections, but use the same Options-object. The options are important to include when using this functionality. You must specify the data type you wish to use for the HTTP Handlers. We recommend separating handlers based on the data you wish to send, and using strongly typed objects. If you wish, you may instantiate a handler with e.g. string-type if you need to send various types through the same integration.
*Warning: Transformations may fail or behave incorrectly.

#### Asynchronous HTTP

Works in the same way as the synchronous http handler, but without a return object. You may also use this handler for batching.

Example DI of both Synchronous and Asynchronous Http Handlers:

```csharp
var options = builder.Configuration.GetSection(nameof(HttpClientOptions)).Get<HttpClientOptions>();


builder.Services.AddInteractionSynchronousHTTP<ConnxioJsonWrapper>(options);
builder.Services.AddInteractionHTTP<ConnxioJsonWrapper>(options.SetRetries(5));
```

#### Note

Ask your CX representative for API credentials. The API Management endpoint is api.connxio.com.

## Service Bus

### Dependency Injection

Use the `AddInteractionServiceBus()-method` to inject the Service Bus handler for use. If you wish to use the `UploadBlobSendSBMessage()-method`, you need to inject the blob handler as well. If you include queueOrTopic name in the ServiceBusClientOptions-object, you do not need to pass this value when using handler-methods. This goes for the BlobStorage DI as well. You may inject both without options, and use the factories directly.

```csharp
builder.Services.AddInteractionServiceBus(new ServiceBusClientOptions()
{
    ConnectionString = builder.Configuration["ServiceBusConnectionString"]!,
    QueueOrTopicName = "testing"
});
```

### Compression

We support compression through the *.gz* format for the SB inbound adapter. This package has a helper class to facilitate that as needed. Call `Compression.Compress(byte[] input)` as a static method to use this functionality.

### Upload using the ServiceBus SDK

You may interact with the NuGet in multiple ways to pass service bus messages. The standard version is using the `Handle`-method which takes an InboundServiceBusMessage-object which requires a SaSUri for the blob. CX uses the uri to pick up the data along the way to process it. The BlobHandler has the GetSasUri() method for retrieving the uri. It also returns the uri when you use the handler to store an object.

### Let us handle the SB message

The `UploadBlobSendSBMessage` method uploads a blob to your storage account and sends a message to your Service Bus where it is picked up by CX. The input is a string representation of your object, and you may specify filename, the queue or topic to send it to, as well as the container on your blob storage that you want to store to. Compression is handled for you.

The `HandlePureMessage` method lets you do what we in CX call "pure message sending", which is essentially using the SB message itself as content for the integration. whilst uploading to Blob. This can be useful if you wish to do multiple actions, using the same file, through different integrations, or if you are storing backups etc.

## Azure Storage - Blob

### Dependency Injection

When using the Blob-functionality, you need to inject it in your program.cs file. You do this by using the AddInteractionBlobStorage()-method. The method takes one optional parameter of object-type BlobClientOptions. The options should contain your Container Name, Connection String and a CreateContainerIfNotExists-boolean.

```csharp
builder.Services.AddInteractionBlobStorage(new BlobClientOptions()
{
    CreateContainerIfNotExists = false,
    DefaultConnectionString = builder.Configuration["BlobStorageConnectionString"],
    ContainerName = "synctest"
});
```

### Wrapping

You may pass a ServiceBusConfig object with the Wrap-property set to true and WrapperType set to Json if you wish to automatically wrap your message in our Json Wrapper. However, you may also wrap your object yourself and pass no Config object. Remember to check your settings in the portal when using wrapper.

:::caution Note
Currently JSON based wrapper is the only one available.

### Handling

When uploading to blob, the returned values are the `Metadata` for the blob and a `SasUri` for accessing the blob or passing it to a service bus handler. This means that you may have granular control over the functionality and have multiple options for storage and message passing.
E.g. instead of creating an integration that retrieves from blob, you can upload many files to your storage, then pass the SasUris to a Service Bus handler. This can be practical if you wish to keep your files in your storage, as using the Azure Storage adapter will delete the files stored in the original Storage Account.

If you have already stored your data, you may retrieve a SasUri using the GetSasUri method.

## Message Config

The `MessageConfig` object allows you to control some parts of the integration flow. If you choose to use this configuration it must reflects your integration in the CX portal.  When using the Wrapped functionality in CX, you may to set these values here and automatically wrap your message, or manually wrap it.
This object only configures the message behaviour up to the point of sending it to Connxio. If you have not configured your Integration accordingly, your message might fail.
E.g. setting the configuration with PureMessageSending to true, whilst sending normal messages in the CX Integration Configuration will fail, as there is no SasUri for the normal message pipeline to fetch the file.

#### Note

Much of the functionality within this package can be used outside of a Connxio context
