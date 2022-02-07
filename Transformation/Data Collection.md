# Data Collection

- [Data Collection](#data-collection)
  - [Limits and External demands](#limits-and-external-demands)
    - [Data size](#data-size)
    - [Traffic](#traffic)
    - [Availability](#availability)
  - [How to add data collection](#how-to-add-data-collection)
  - [Retry](#retry)

ConnXio (CX) supports various forms of [orchestration](/Core%20Concepts.md) most prominent among them is enrichment and this is fueled by *data collection*. Data collection refers to the act of getting data over HTTP as a transformations tep. This enables customers to collect data from all resources that support HTTP and use them within transformations, [variable replacements](/Transformation/Variable%20Replacement.md) and url generation. This page describes how to use and configure data collection.

## Limits and External demands

There are a few things to consider when using data collection, some pertain to the constraints on the process in CX internally but there are even more demands put on the external endpoints and resources that provide data. The following should always be considered and reviewed:

### Data size

Be careful about how much data your endpoints or resources return. We spawn unending amounts of transformation sessions, but we have some hard limits on the amount of time a processes involving transformations are allowed to live. Currently this is 10 minutes, which is an eternity in a programming sense, if you have slow endpoints returning very large resources this will cause significant delays on processing and will in most cases make the whole process fail, either because of the time limit or resources provided by the session itself. As such we recommend keeping all data collection **below 1 MB** in size and under 100 KB for best performance.

>Using proxy services that deliver trimmed data could be a good way to increase performance and decrease load.

### Traffic

Data collection is performed *every time* an integration pipeline fires. This can generate a large amount of traffic. Be sure to test you endpoints and resources for the expected amount of traffic. Since CX processes transformations in parallel thousands upon thousands of requests can be fired at the same time at peak load. CX uses a staggering algorithm to stop endpoints from crashing under heavy load, but this is no guarantee that the integration will perform as expected.

>Ensure that your endpoint or resource can handle the load

### Availability

We provide [variables](#how-to-add-data-collection) for making data collection more robust, but by default if the http call fails the pipeline will be suspended. Please ensure that you have high uptime on your services.

## How to add data collection

Add the "Data Collection" shape from the "Transformations" menu:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Data%20collection%20menu.png?sv=2020-04-08&st=2021-10-25T12%3A19%3A49Z&se=2040-10-26T12%3A19%3A00Z&sr=b&sp=r&sig=F1XwWeQevA0D7DSJ%2B%2FTdiPsFfRJcroLiXaAj%2BIxBH5M%3D)

Add the necessary fields to your data collection. See below for an example:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Data%20collection%20main%20config%20screen.png?sv=2020-04-08&st=2021-10-25T12%3A50%3A59Z&se=2040-10-26T12%3A50%3A00Z&sr=b&sp=r&sig=p9OxPueX6cSQoz3Rb01iV37wg23iGIRetvt6Tdbaa5I%3D)

- **Method**: The verb to use for HTTP communication.
- **Rest Url**: The endpoint to get the data from. This could be an API, data store or similar REST service.
- **Security Configuration**: Select your security configuration from the list. See [here](/Security/Security%20Configurations.md) for more information.
- **Variable name**: The name used for the variable through CX. USe this name if you want to target the variable in a [code component](/Transformation/Code%20Components.md) or [variable replacement](/Transformation/Variable%20Replacement.md).
- **Use Content As Request Body**: The current version of the content at the time of the data collection is sent to the collection endpoint as the body of the request. Default value is empty body.
- **Use Response As Content**: The current content is replaced by the body returned by the data collection endpoint, this happens regardless of what is returned.
- **Headers**: Add any custom header you might need. This can include custom Authorization if needed.
- **Current Message Content Type**: The current content type of the message. Use this only if the content type of the message at this stage is different from the message format defined for the configuration. Used for [variable replacement](/Transformation/Variable%20Replacement.md) only.
- **Continue on 404**: Turning this on means the data collection will continue if it cant find the resource its looking for. Be careful since this might make other transformations like code components fail.
- **Stop on empty**: Stops if data is empty and [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) is positive.

## Retry

Data collection uses [linear retry](/Retry.md), we are looking into switching to backoff retry, but this is not implemented yet.

When handling RESTful communication a common set of status codes are defined by the architecture itself. We handle the ones in the list below. Be aware that all status codes not handled here defaults to no retry. All retry is handled as linear retry with endpoint retry or with endpoint retry only, read more about retry on the [Retry page](/Retry.md).

| Status Code | Description | Retry Action |
|---|---|---|
| 400 | Bad Request | Is not retried. Not retried because payload does not change on each retry. |
| 404 | Not Found | Is not retried. Can be configured by the ["Continue On 404"](#how-to-add-data-collection) property |
| 408 | Request Timeout | Is retried with both linear and endpoint retry |
| 409 | Conflict | Is not retried and is logged as Terminated. There are conflicts in the current state, this is not expected to change on retry. |
| 429 | Too Many Requests | Is retried with both linear and endpoint retry |
| 500 | Internal Server Error | Is retried with both linear and endpoint retry. We have chosen to include 500 in retry as this is the default code for unhandled exceptions, and since this is the most common code received on connection issues inside external endpoints. |
| 502 | Bad Gateway | Is retried with both linear and endpoint retry |
| 503 | Service Unavailable | Is retried with both linear and endpoint retry |
| 504 | Gateway Timeout | Is retried with both linear and endpoint retry |

We also have special handling on some network issues. You might see references in error logs to the exception type as described below. This list does not describe all actions taken to ensure message delivery stability but describes the errors usually seen by customers:

| Network Issue | Description | Retry Action | Customer Action |
|---|---|---|---|
| AuthenticationException | Describes issues with SSL certificates and other formal security issues | **Is not retried** since fault correction requires formal changes to authentication. | Please check you ssl certificates or other endpoint security and verify that everything is valid. Turning off message intake might be a good idea to stop error spam. |
| HttpRequestException | Describes issues with underlying protocols and network infrastructure. | Is retried linear since the issue is usually transient. AuthenticationException is a subset of this issue and handled separately. | If retry fails please review logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam. |
| TaskCanceledException | Describes issues with external endpoint taking too long to respond and CX closing the connection. | **Uses linear retry only**. Retrying canceled requests can be dangerous if the receiving endpoint is not idempotent. Please contact us if you have problems with these kinds of issues and have a non idempotent endpoint. | If retry fails please review error logs from your logging provider and make changes as necessary. Be aware that the message could be delivered multiple times when the task is canceled and check your receiving database for duplicates. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| SocketException | Describes issues the established connection, usually happens when connections close unexpectedly because of timeouts on the endpoint side. | **Uses linear retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| SocketException | Describes issues the established connection, usually happens when connections close unexpectedly because of timeouts on the endpoint side. | **Uses linear retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
| IOException | Describes issues related to http communication that does not fit a narrower category. | **Uses linear retry only**.  | If retry fails please review error logs from your logging provider and make changes as necessary. Turning off message intake might be a good idea *if possible* to stop error spam if retry has not handled the error. |
