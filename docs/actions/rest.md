import PropertyReference from '@site/src/components/PropertyReference';
import ActionSequentialDelivery from '@site/src/components/ActionSequentialDelivery';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# HTTP

The HTTP action calls an endpoint from the Connxio pipeline. Use it to send message content to an API, collect response data for later actions, or replace the current content with the response.

## Configure the action

Add an HTTP action to your integration and configure the settings below.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Request settings

<PropertyReference properties={[
{
name: "Method",
description: "The HTTP method to use when calling the endpoint.",
example: "POST",
},
{
name: "URL",
description: "Required. The endpoint to call.",
example: "https://example.com/api/messages",
},
{
name: "Authorization",
description: <>Select the <Link to="/integrations/security-configurations/">security configuration</Link> used to authenticate the request, if required by the endpoint. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Headers",
description: "Additional request headers required by the endpoint, such as authentication or content type headers.",
},
{
name: "Body",
description: "The content to send in the request body. Enable Use content as request body to send the current pipeline content instead.",
},
{
name: "Variable name",
description: <>Optional. The response will be stored under this name if set. Reference it using <Link to="/cxmal/macros/datacollection/">the data collection macro</Link> or a script/code component.</>,
example: "Customer",
},
]} />

Use [CxMaL](../cxmal/connxio-macro-language.md) in the URL, body, or header values to include message content and metadata dynamically.

## REST settings

<PropertyReference properties={[
{
name: "Custom timeout (seconds)",
description: "How long to wait for the endpoint to respond before the request times out, in seconds.",
example: "60",
},
{
name: "Handle response as binary",
description: "Enable to handle the response body as binary data rather than text.",
},
{
name: "Use content as request body",
description: "Enable to send the current pipeline message content as the request body.",
},
{
name: "Use response as content",
description: "Enable to replace the current pipeline message content with the response body. Subsequent actions receive this content.",
},
{
name: "Use date delta",
description: <>Enables a date value that advances between runs. Use it in the URL, body, or a header to request data from a starting date. See <Link to="#date-delta">Date delta</Link> for details.</>,
},
{
name: "Sequential delivery",
description: <>Enable to deliver one message at a time within a correlation group. See <Link to="#sequential-delivery">Sequential delivery</Link> for grouping and retry settings.</>,
},
]} />

## Date delta

With **Use date delta** enabled, use the date macro's `UseDateTimeDelta` option in the request URL, body, or a header value. It provides a starting date for the request and advances to the current date and time on the next run.

See the [date macro](../cxmal/macros/date.md) for syntax and formatting options.

## Sequential delivery {#sequential-delivery}

<ActionSequentialDelivery />

## Duplicate detection

<ActionDuplicateDetection />

## Advanced error handling

Add rules in the **Advanced error handling** tab to control how specific unsuccessful HTTP responses are handled. Responses without a matching rule follow the default [retry behavior](#retry).

<PropertyReference properties={[
{
name: "Status codes",
description: "The HTTP status codes that match the rule. Separate codes with commas and use a hyphen for an inclusive range.",
example: "401-409, 503",
},
{
name: "Action",
description: "Choose Terminate on error, Redirect to secondary endpoint, or Continue on error.",
},
{
name: "Status",
description: "A custom log status for the rule. Leave empty to use the default Error status.",
},
{
name: "Retry",
description: "Enable to run the default retry pattern before applying the rule's action. When disabled, the rule's action runs immediately.",
},
]} />

- **Terminate on error** stops processing the message.
- **Redirect to secondary endpoint** sends the request to a configured fallback endpoint. See [Fallback](#fallback).
- **Continue on error** allows processing to continue despite the matching error response.

### Fallback

Configure a secondary endpoint for rules that use **Redirect to secondary endpoint**. For example, use a backup service or an endpoint that places the message in a recovery queue. A successful `2xx` response completes delivery successfully; unsuccessful responses are subject to the configured error and retry handling.

## Logging

Connxio adds an `InterchangeId` header to outgoing requests so the receiving system can include it in its logs.

If the endpoint needs the ID elsewhere, include it in the content using a [code component](../integrations/code-components.md) or add it to the URL with [CxMaL](../cxmal/connxio-macro-language.md), for example:

```text
https://example.com/api/messages?InterchangeId={interchange}
```

## Retry

The default retry behavior depends on the HTTP response or network error. Advanced error-handling rules and sequential-delivery retry settings can change this behavior. See [Retry](../integrations/retry.md) for endpoint and backoff retry details.

### HTTP status codes

| Status code | Description           | Default retry behavior                                     |
| ----------- | --------------------- | ---------------------------------------------------------- |
| 400         | Bad Request           | Not retried. The payload does not change between attempts. |
| 404         | Not Found             | Not retried.                                               |
| 408         | Request Timeout       | Endpoint retry only.                                       |
| 409         | Conflict              | Not retried.                                               |
| 429         | Too Many Requests     | Endpoint retry only.                                       |
| 500         | Internal Server Error | Backoff and endpoint retry.                                |
| 502         | Bad Gateway           | Backoff and endpoint retry.                                |
| 503         | Service Unavailable   | Backoff and endpoint retry.                                |
| 504         | Gateway Timeout       | Endpoint retry only.                                       |

Other unsuccessful status codes are not retried by default unless fallback handling is configured.

### Network errors

| Error                   | Default retry behavior                                              | What to check                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| AuthenticationException | Not retried.                                                        | Verify the endpoint's certificates and security configuration.                                                                 |
| HttpRequestException    | Backoff retry, except for authentication errors handled separately. | Check the endpoint's network connectivity and error logs.                                                                      |
| TaskCanceledException   | Backoff retry only.                                                 | Check response times. The endpoint may have processed the request before the timeout, so retries can cause duplicate delivery. |
| SocketException         | Backoff retry only.                                                 | Check for connections closing unexpectedly or endpoint timeouts.                                                               |
| IOException             | Backoff retry only.                                                 | Review logs for HTTP communication errors.                                                                                     |

## Limitations

The receiving endpoint must be available and responsive for delivery to succeed. Check its authentication, timeout, and rate-limit requirements when configuring the action.

## Receive content as bytes

If the receiving API expects binary request content, use the `application/octet-stream` content type and read the request body as bytes. This concerns the outgoing request; **Handle response as binary** controls how Connxio handles the response from the endpoint.

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
