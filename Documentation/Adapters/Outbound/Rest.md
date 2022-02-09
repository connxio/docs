# Rest Outbound Adapter

- [Rest Outbound Adapter](#rest-outbound-adapter)
  - [Limitations](#limitations)
  - [Configuring Restful message delivery](#configuring-restful-message-delivery)
  - [Extending Logging](#extending-logging)
  - [Carousel](#carousel)
    - [What is Carousel used for?](#what-is-carousel-used-for)
  - [Fallback](#fallback)
  - [Retry](#retry)

ConnXio (CX) lets customers receive data from the CX pipeline through a RESTful endpoint. This page details how to set up a RESTful receive adapter and the limits of using Rest to receive information from CX. When we describe something as "using Rest" or being "a Rest endpoint" we are implicitly stating that it's [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer).

## Limitations

Using Rest as a means of sending and receiving data is probably the most widely used standard in modern software development. Rest has many benefits and some downsides, we will not be going over everything here, but we will mention some of the most egregious downsides in comparison to other protocols. First and foremost, Rest forces applications to directly communicate with each other in opposition to other technologies such as Azure Service bus which provides decoupling as described on their [website](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview):

> **Decoupled applications**: Improve reliability and scalability of applications and services. Producer and consumer don't have to be online or readily available at the same time. The load is leveled such that traffic spikes don't overtax a service.

There are several technologies and protocols that provide decoupling, but Rest is not one of them since it relies on the Http protocol. So why are we so interested in decoupling? Well, since Rest doesn't decouple we have to handle faults synchronously instead of asynchronously, this means that when receiving messages from CX on Rest you need to be able to handle multiple retries and potentially high traffic. As such your endpoints should conform to a the highest meaningful standard of reliability and robustness. There are hundreds of articles about this and we recommend thoroughly reading up on the subject, and be warned that a *poorly programmed* Rest endpoint is inferior to using outdated or less secure protocols.

## Configuring Restful message delivery

To configure CX to start sending data to a Rest endpoint select the "REST" option in the "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/REst%20outbound%20config.PNG?sv=2020-08-04&st=2021-11-09T12%3A34%3A11Z&se=2040-11-10T12%3A34%3A00Z&sr=b&sp=r&sig=JWfZLWIlSrvrf8kCL8JTjqfdXFYo5MXTNw4mO%2B36OzU%3D)

- **Adapter Name**: The logical name of the adapter. This is shown in the configuration view on close.
- **Method**: The Http verb (or method as its properly called) to use when contacting the restful endpoint.
- **Endpoint Url**: The url of the endpoint.
- **Security Configuration**: The [security configuration](/Documentation/Security/Security%20Configurations.md) to use for authenticating the request.
- **Headers & Authorization Header Type**: Add headers here as necessary to either authenticate the request or add other needed parameters.
- **Send Acknowledgement**: Is explained [here](/Documentation/Adapters/Outbound/Acknowledgment.md).
- **Use Internal**: Uses the internal Restful adapter to resend the message back to CX. Is explained in detail under the  [carousel entry](#carousel).

## Extending Logging

If you want to use the InterchangeId used by CX for further logging we reccomend either including it in the message by using [transformations](/Documentation/Transformation/Code%20Components.md) or adding the InterchangeId as a query parameter with [Variable Replacement](/Documentation/Transformation/Variable%20Replacement.md). 

> E.g.: `http://www.myapi.com?InterchangeId={interchange}`

## Carousel

![img](https://cmhpictsa.blob.core.windows.net/pictures/Rest_Outbound_Carousel.png?sv=2020-10-02&st=2022-02-03T07%3A35%3A31Z&se=2040-02-04T07%3A35%3A00Z&sr=b&sp=r&sig=YYolmjsR7QheeE0szBietXXW3j%2B3tZ5x5IJ8EoUU4KA%3D)

Carousel is what we've called the functionality that lets you run a message through the CX pipeline more than once. This functionality is easily enabled but hard to configure. To enable the Carousel functionality you simply check the "Enable Carousel" checkbox and the following menu pops up:

- **Carousel Integration CorrelationId**: Specifies which integration to use when the message renters the CX pipeline. This is usually a separate integration to the one you are standing in.
- **Preserve Interchange Id**: If this is left unchecked the new integration will run on a new InterchangeId, if checked the same InterchangeId as the one used for the current integration will be used for the Carousel as well.

### What is Carousel used for?

Carousel is used when you need to to simulate [high level orchestration](/Documentation/Core%20Concepts.md) in CX. Say you need to perform tasks that can't be done without massive amounts of input, or you need to pre process messages before you can collect enrichment data. We will not be going into specifics here because Carousel is not recommended for most scenarios and should be used as a last resort for specific integrations. There is nothing wrong with utilizing Carousel, but that said, it adds a level of complexity to integrations that leads to more user and system errors because of the enormous amount of data transfer and processing.

## Fallback

![img](https://cmhpictsa.blob.core.windows.net/pictures/Rest_Outbound_Fallback.png?sv=2020-10-02&st=2022-02-03T07%3A37%3A07Z&se=2040-02-04T07%3A37%3A00Z&sr=b&sp=r&sig=1XXg8zjmjhFEypu6%2FFKaTefB%2BGpQWd0UPZKbnBY2kKs%3D)

Fallback lets you react to errors by handling errors with external services or logging. By enabling this functionality you specify an endpoint that can be used to react to events, terminate the process or retry it through a backup endpoint. The message will be completed and logged as successfully if the endpoint return a success 2xx status code. If a non success status code is returned the message will be retried as described in the [retry](#retry) section.

An example of how this functionality can be useful is to configure a fallback endpoint thats in another region or on another platform that can process requests when the main service is down. Another example could be an endpoint that puts messages back into a queue or backup pipeline that holds the message for future processing. The examples are more or less endless and fallback should be used for most critical RESTful endpoint.

## Retry

*Rest outbound uses [linear retry](/Documentation/Retry.md), we are looking into switching to backoff retry, but this is not implemented yet.*

When handling RESTful communication a set of status codes are defined. We handle the ones in the list below. Be aware that all status codes not handles here defaults to no retry unless [fallback](#fallback) is set. All retry is handled as linear retry with endpoint retry or with endpoint retry only, read more about retry on the [Retry page](/Documentation/Retry.md).

| Status Code | Description | Retry Action |
|---|---|---|
| 400 | Bad Request | Is not retried. Not retried because payload does not change on each retry. |
| 404 | Not Found | Is not retried. Something was not found while processing data, stop processing since this will not change. |
| 408 | Request Timeout | Is retried with endpoint retry only |
| 409 | Conflict | Is not retried. There are conflicts in the current state, this is not expected to change on retry. |
| 429 | Too Many Requests | Is retried with endpoint retry only |
| 500 | Internal Server Error | Is retried with both linear and endpoint retry. We have chosen to include 500 in retry as this is the default code for unhandled exceptions, and since this is the most common code received on connection issues inside external endpoints. |
| 502 | Bad Gateway | Is retried with both linear and endpoint retry |
| 503 | Service Unavailable | Is retried with both linear and endpoint retry |
| 504 | Gateway Timeout | Is retried with endpoint retry only |

We also have special handling on some network issues. You might see references in error logs to the exception type as described below. This list does not describe all actions taken to ensure message delivery stability but describes the errors usually seen by customers:

| Network Issue | Description | Retry Action | Customer Action |
|---|---|---|---|
| AuthenticationException | Describes issues with SSL certificates and other formal security issues | **Is not retried** since fault correction requires formal changes to authentication. | Please check you ssl certificates or other endpoint security and verify that everything is valid. Turning off message intake might be a good idea to stop error spam. |
| HttpRequestException | Describes issues with underlying protocols and network infrastructure. | Is retried linear since the issue is usually transient. AuthenticationException is a subset of this issue and handled separately. | If retry fails please review logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam. |
| TaskCanceledException | Describes issues with external endpoint taking too long to respond and CX closing the connection. | **Uses linear retry only**. Retrying canceled requests can be dangerous if the receiving endpoint is not idempotent. Please contact us if you have problems with these kinds of issues and have a non idempotent endpoint. | If retry fails please review error logs from your logging provider and make changes as necessary. Be aware that the message could be delivered multiple times when the task is canceled and check your receiving database for duplicates. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| SocketException | Describes issues the established connection, usually happens when connections close unexpectedly because of timeouts on the endpoint side. | **Uses linear retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| SocketException | Describes issues the established connection, usually happens when connections close unexpectedly because of timeouts on the endpoint side. | **Uses linear retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| IOException | Describes issues related to http communication that does not fit a narrower category. | **Uses linear retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
