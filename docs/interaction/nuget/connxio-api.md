---
sidebar_position: 2
---

# Connxio API

## Synchronous HTTP
This way of communicating with CX allows for working directly towards the synchronous functionality which will also return the response from the endpoint(s), as well as any errors and exceptions that have been encountered along the way. The batching endpoint is only available asynchronously.

## Asynchronous HTTP
Works in the same way as the synchronous http handler, but without a return object. You may also use this handler for batching.

## Dependency Injection
The synchronous and asynchronous versions have separate injections, but use the same Options-object. The options are important to include when using this functionality. You must specify the data type you wish to use for the HTTP Handlers. We recommend separating handlers based on the data you wish to send, and using strongly typed objects. 
::::info [Info]
You may instantiate a handler with e.g. string-type if you need to send various types through the same integration. 
:::danger [Transformations]
Transformations may fail or behave incorrectly.
:::
::::
Example DI of both Synchronous and Asynchronous Http Handlers:
```csharp
var options = builder.Configuration.GetSection(nameof(HttpClientOptions)).Get<HttpClientOptions>();


builder.Services.AddInteractionSynchronousHTTP<ConnxioJsonWrapper>(options);
builder.Services.AddInteractionHTTP<ConnxioJsonWrapper>(options.SetRetries(5));
```



:::info [Api Keys]
Ask your CX representative for API credentials. The API Management endpoint is api.connxio.com.
:::