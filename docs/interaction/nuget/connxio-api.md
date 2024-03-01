---
sidebar_position: 2
---

# Connxio API

The HttpHandlers are intended to ease programmatic interaction with the Connxio API. The package contains a single interface (IHttpHandler) for Http-communication that has two implementations. In this section, we will go through the basics of using the HttpHandlers.

:::info [Authorization]
Ask your CX representative for API OAuth credentials. The API Management endpoint is api.connxio.com.
:::

## Synchronous HTTP
This way of communicating with CX allows for working directly towards the synchronous functionality which will also return the response from the endpoint(s), as well as any errors and exceptions that have been encountered along the way. Batching is NOT possible when using the Synchronous handler.

## Asynchronous HTTP
Works in the same way as the synchronous http handler, but returns *null*. You may also use this handler for Batching. If the request fails when contacting the Connxio API, an exception is thrown after retrying when applicable.

## MessageConfig
The message config is used to ease the process of wrapping objects(needed for tests), passing encoding and formats, setting an interchange id, and telling Connxio whether or not you are running tests. When *IsTest* is set to true, all logging is turned off. You may wrap your objects manually, or wrap them using the static *WrapperHelper*-class.

## Dependency Injection
The synchronous and asynchronous versions share injections. The options are important to include when using this functionality. The options may be instantiated in multiple ways, however, the simplest is to create a section in your appsettings and fetching it. The handlers are added as Singletons. If needed, inject the ConnxioHttpFactory(services.AddCXHttpFactory()) and handlers directly yourself.

Example DI of Http Handlers:
```csharp
var options = builder.Configuration.GetSection(nameof(HttpClientOptions)).Get<HttpClientOptions>();
var config = new MessageConfig()
{
    InterchangeId = Guid.NewGuid().ToString(),
    IsLoadTest = false,
    IsTest = false,
    Wrap = true,
    WrapperType = WrapperType.Json
};

builder.Services.AddInteractionHTTP(options.SetRetries(5), config);
```

## Usage

To use the handlers, you must instantiate them using the *IHttpHandlerFactory*. 

Example:
```csharp
private readonly IHttpHandler _syncHandler;
private readonly IHttpHandler _asyncHandler;

public TestsController(IHttpHandlerFactory httpHandlerFactory)
{
    _syncHandler = httpHandlerFactory.GetInstance(true);
    _asyncHandler = httpHandlerFactory.GetInstance(false);
}
```

When using the GetInstance()-method, the boolean tells the factory whether to return a synchronous(true) or asynchronous(false) handler.
If you did not pass a config when injecting the HttpHandlers, or you need a different configuration for your request, you may pass a config when using the Handle()-method. A config is not needed for proper function. The *ConfigCorrelationId* is the Id of your integration in Connxio. 

Example requests:

```csharp
var config = new MessageConfig()
{
    InterchangeId = Guid.NewGuid().ToString(),
    IsLoadTest = false,
    IsTest = false,
    Wrap = true,
    WrapperType = WrapperType.Json
};
var result = await _syncHandler.Handle(new BinaryData(testList), configCorrelationId, config);
```

If you are sending messages from different services, you may also instantiate a different HttpClient for each service. You can work directly with the client or set the new client as the active one on your handler. Only one client is active on the handler at any given time.

```csharp
private readonly IHttpHandler _handler;
private readonly HttpRestClient<DefaultHttpClientConfiguration<string>> _client;

public Tests2Controller(IHttpHandlerFactory httpHandlerFactory)
{
    _handler = httpHandlerFactory.GetInstance(false);
    _client = _handler.InitializeNewClient("tests2-client", httpClientOptions);
}

[HttpPost]
public async Task<IActionResult> Post()
{
    ...
    _handler.SetNewClient(_client);
    _handler.Handle(input, configCorrelationId);
    ...
}
```

## Retry
This package handles retry on the client side and will attempt resending when applicable. Set your own retry policies if the default does not cover your needs.

Retry occurs on the following Http Status Codes:
- 404 - NotFound
- 408 - RequestTimeout
- 429 - TooManyRequests
- 500 - InternalServerError
- 502 - BadGateway
- 503 - ServiceUnavailable
- 504 - GatewayTimeout

