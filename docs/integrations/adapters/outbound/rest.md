# REST

The REST outbound adapter in Connxio facilitates integration with external systems through RESTful APIs. It provides users with the ability to send data, messages, and payloads to REST endpoints. With this adapter, users can establish connections with various systems and services that support REST APIs.


<details>
<summary>Limitations</summary>
<p>
When choosing between the REST adapter and an asynchronous adapter in Connxio, users should be aware of the following considerations. The REST adapter offers immediate error responses, allowing for quick feedback and troubleshooting. However, it relies on the availability of the receiving system for uptime. In contrast, the asynchronous adapter provides increased uptime and fault tolerance, ensuring message delivery even during system outages. Users should evaluate their integration requirements, responsiveness needs, and the receiving system's availability when selecting the appropriate adapter in Connxio.
</p>
</details>

## Configuring the REST adapter

To configure Connxio to start sending data to a REST endpoint select the "REST" option in the "Outbound Connections" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new adapter, a popup with the adapter's input fields will appear.
Email has 4 sections; Adapter name, Acknowledgement settings, Core settings and Advanced settings.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-sections-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:

### Adaptername & Ack

- **Adapter Name**: The logical name of the adapter. This is shown in outbound adapter list in the subintegration view.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).

### Core settings
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/rest-core-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/rest-core-dark.webp#dark-only'),
    }}
  />
</div>

- **Method**: The HTTP verb to use when contacting the restful endpoint.
- **Endpoint Url**: The URL of the endpoint.
- **Security Configuration/Authorization**: The [security configuration](/connxio-portal/security-configurations) to use for authenticating the request.
- **Headers**: Add headers here as necessary to either authenticate the request or add other needed parameters.
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/rest-core-headers-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/rest-core-headers-dark.webp#dark-only'),
    }}
  />
</div>

- **Advanced Error Handling**: Advanced error handling allows you to create rules for handling specific unsuccessful status codes beyond the standard pattern. Read more about it [below](#Advanced-error-handling)


### Advanced settings
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="email advanced"
    sources={{
      light: useBaseUrl('/img/docs/outbound/email-advanced-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/email-advanced-dark.webp#dark-only'),
    }}
  />
</div>

- **Duplicate Detection**: Terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'

## Extending Logging

Connxio will add an `InterchangeId` header to the outgoing request to facilitate for continued transactional logging on the receiver side.

If you need to receive the InterchangeId by other means we recommend either including it in the message by using [transformations](/integrations/transformation/code-components) or adding the InterchangeId as a query parameter with [Variable Replacement](/connxio-portal/variables/variable-replacement).

> E.g.: `http://www.myapi.com?InterchangeId={interchange}`


## Advanced error handling

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/rest-core-error-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/rest-core-error-dark.webp#dark-only'),
    }}
  />
</div>

By default, all failed REST requests will be retried according to the [retry](#retry) pattern. If the request is still not successful, the transaction will be logged as an error and terminated. Advanced error handling allows you to create rules for handling specific unsuccessful status codes beyond the standard pattern.

| Input&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
|---|---| --- |
| Status codes | int , - | A comma-separated list of status codes on which the rule should act. A range of status codes can be defined by using '-', for instance, 401-408 will represent all status codes from and including 401 to and including 408. |
| Action | Terminate,<br /> Redirect to secondary | "Terminate" stops the transaction, while "Redirect to secondary" redirects the request to the [Fallback](#Fallback) adapter and makes one attempt to make the request. If this request fails, the transaction will be terminated and logged as "Error" unless something else is defined in the "Custom status" field |
| Custom status | string | By default all transactions will be logged as "Error". This property overrides the default status. |
| Retry | true,<br />false | If disabled, no retry attempts will be made and the Rule Action will trigger immediately. If enabled, the default [retry](#retry) pattern will run before the Rule Action triggers. |

### Fallback

![img](https://cmhpictsa.blob.core.windows.net/pictures/Rest%20Outbound%20Advanced%20error%20handling.png?sv=2021-04-10&st=2022-12-08T11%3A42%3A49Z&se=2040-12-09T11%3A42%3A00Z&sr=b&sp=r&sig=UXcrFw0pGpcdZjQDiWPIH%2FUSQVnuLll0x5QeBeFaW4Y%3D)

Fallback lets you react to errors by handling errors with external services or logging. By enabling this functionality you specify an endpoint that can be used to react to events, terminate the process or retry it through a backup endpoint. The message will be completed and logged as successfully if the endpoint return a success 2xx status code. If a non success status code is returned the message will be retried as described in the [retry](#retry) section.

An example of how this functionality can be useful is to configure a fallback endpoint thats in another region or on another platform that can process requests when the main service is down. Another example could be an endpoint that puts messages back into a queue or backup pipeline that holds the message for future processing. The examples are more or less endless and fallback could be used for most critical RESTful endpoint.

### Retry

When handling RESTful communication a set of status codes are defined. We handle the ones in the list below. Be aware that all status codes not handles here defaults to no retry unless [fallback](#fallback) is set. All retry is handled as backoff retry with endpoint retry or with endpoint retry only, read more about retry on the [Retry page](/integrations/retry).

| Status Code | Description | Retry Action |
|---|---|---|
| 400 | Bad Request | Is not retried. Not retried because payload does not change on each retry. |
| 404 | Not Found | Is not retried. Something was not found while processing data, stop processing since this will not change. |
| 408 | Request Timeout | Is retried with endpoint retry only |
| 409 | Conflict | Is not retried. There are conflicts in the current state, this is not expected to change on retry. |
| 429 | Too Many Requests | Is retried with endpoint retry only |
| 500 | Internal Server Error | Is retried with both backoff and endpoint retry. We have chosen to include 500 in retry as this is the default code for unhandled exceptions, and since this is the most common code received on connection issues inside external endpoints. |
| 502 | Bad Gateway | Is retried with both backoff and endpoint retry |
| 503 | Service Unavailable | Is retried with both backoff and endpoint retry |
| 504 | Gateway Timeout | Is retried with endpoint retry only |

We also have special handling on some network issues. You might see references in error logs to the exception type as described below. This list does not describe all actions taken to ensure message delivery stability but describes the errors usually seen by customers:

| Network Issue | Description | Retry Action | Customer Action |
|---|---|---|---|
| AuthenticationException | Describes issues with SSL certificates and other formal security issues | **Is not retried** since fault correction requires formal changes to authentication. | Please check you ssl certificates or other endpoint security and verify that everything is valid. Turning off message intake might be a good idea to stop error spam. |
| HttpRequestException | Describes issues with underlying protocols and network infrastructure. | Is retried with backoff since the issue is usually transient. AuthenticationException is a subset of this issue and handled separately. | If retry fails please review logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam. |
| TaskCanceledException | Describes issues with external endpoint taking too long to respond and Connxio closing the connection. | **Uses backoff retry only**. Retrying canceled requests can be dangerous if the receiving endpoint is not idempotent. Please contact us if you have problems with these kinds of issues and have a non idempotent endpoint. | If retry fails please review error logs from your logging provider and make changes as necessary. Be aware that the message could be delivered multiple times when the task is canceled and check your receiving database for duplicates. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| SocketException | Describes issues the established connection, usually happens when connections close unexpectedly because of timeouts on the endpoint side. | **Uses backoff retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| SocketException | Describes issues the established connection, usually happens when connections close unexpectedly because of timeouts on the endpoint side. | **Uses backoff retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| IOException | Describes issues related to http communication that does not fit a narrower category. | **Uses backoff retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |

## Receive content as bytes

When using the "Handle File As Binary" option you have to receive the payload as an `application/octet-stream` as Connxio sends the content as bytes. The whole body of the request is your content as usual for Connxio payloads.

The easiest way to receive bytes as body in a C# API is to receive the body directly. Below is an example of this method:

```csharp
[HttpPost]
public async Task<IActionResult> Post()
{
    byte[] contentBytes;

    using (var memoryStream = new MemoryStream())
    {
        await Request.Body.CopyToAsync(memoryStream);
        contentBytes = memoryStream.ToArray();
    }

    // Do something
    return Ok("foo bar");
}
```

Note that this method requires you to not receive anything in the controller method.

The other option is to create your own InputFormatter, this tells the model-binder how to handle binary content and receives it as a `byte[]` directly. Below is an example of the InputFormatter in question:

```csharp
public class BinaryInputFormatter : InputFormatter
{
    const string binaryContentType = "application/octet-stream";
    const int bufferLength = 16384;

    public BinaryInputFormatter()
    {
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse(binaryContentType));
    }

    public async override Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context)
    {
        using (MemoryStream ms = new MemoryStream(bufferLength))
        {
            await context.HttpContext.Request.Body.CopyToAsync(ms);
            object result = ms.ToArray();
            return await InputFormatterResult.SuccessAsync(result);
        }
    }

    protected override bool CanReadType(Type type)
    {
        if (type == typeof(byte[]))
            return true;
        else
            return false;
    }
}
```

Add the formatter to your startup. For .net core this is done in the `AddMvc` method, this may vary for other .net frameworks.

When the InputFormatter is added you simply receive the content as `byte[]` in your controller.
