---
sidebar_position: 50
---

# Data Collection

Connxio supports various forms of [orchestration](/getting-started/core-concepts) most prominent among them is enrichment and this is fueled by _data collection_. Data collection refers to the act of getting data over HTTP as a transformations tep. This enables customers to collect data from all resources that support HTTP and use them within transformations, [Connxio Macro Language](/integrations/cxmal/connxio-macro-language) and url generation. This page describes how to use and configure data collection.

## Limitations and External demands

There are a few things to consider when using data collection, some pertain to the constraints on the process in Connxio internally but there are even more demands put on the external endpoints and resources that provide data. The following should always be considered and reviewed:

### Data size

Be careful about how much data your endpoints or resources return. We spawn unending amounts of transformation sessions, but we have some hard limits on the amount of time a processes involving transformations are allowed to live. Currently this is 10 minutes, which is an eternity in a programming sense, if you have slow endpoints returning very large resources this will cause significant delays on processing and will in most cases make the whole process fail, either because of the time limit or resources provided by the session itself. As such we recommend keeping all data collection **below 1 MB** in size and under 100 KB for best performance.

> Using proxy services that deliver trimmed data could be a good way to increase performance and decrease load.

### Traffic

Data collection is performed _every time_ an integration pipeline fires. This can generate a large amount of traffic. Be sure to test you endpoints and resources for the expected amount of traffic. Since Connxio processes transformations in parallel thousands upon thousands of requests can be fired at the same time at peak load. Connxio uses a staggering algorithm to stop endpoints from crashing under heavy load, but this is no guarantee that the integration will perform as expected.

> Ensure that your endpoint or resource can handle the load

## Extending Logging

Connxio will add an `InterchangeId` header to the intake request to facilitate for continued transactional logging on the sender side if applicable.

### Availability

We provide [variables](#how-to-add-data-collection) for making data collection more robust, but by default if the http call fails the pipeline will be suspended. Please ensure that you have high uptime on your services.

## How to add data collection

Add the "Data Collection" shape from the "Transformations" menu:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/transformations-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/transformations-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new transformation, a popup with the transformation's input fields will appear.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/datacol-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/datacol-dark.webp#dark-only'),
    }}
  />
</div>

- **Variable name**: The name used for the variable through Connxio. USe this name if you want to target the variable in a [code component](/integrations/transformation/code-components) or [Connxio Macro Language](/integrations/cxmal/connxio-macro-language).
- **Method**: The verb to use for HTTP communication.
- **REST Url**: The endpoint to get the data from. This could be an API, data store or similar REST service.
- **Security Configuration**: Select your security configuration from the list. See [here](/connxio-portal/security-configurations) for more information.
- **Headers**: Add any custom header you might need. This can include custom Authorization if needed.

    <div style={{maxWidth: '400px'}}>
        <ThemedImage
            alt="outbound connections"
            sources={{
            light: useBaseUrl('/img/docs/transformations/datacol-headers-light.webp'),
            dark: useBaseUrl('/img/docs/transformations/datacol-headers-dark.webp#dark-only'),
            }}
        />
    </div>

- **Body**: The content body of the request.

    <div style={{maxWidth: '400px'}}>
        <ThemedImage
            alt="outbound connections"
            sources={{
            light: useBaseUrl('/img/docs/transformations/datacol-body-light.webp'),
            dark: useBaseUrl('/img/docs/transformations/datacol-body-dark.webp#dark-only'),
            }}
        />
    </div>

- **Advanced Error Handling**: Read about advanced error handling [below](#advanced-error-handling).

### Advanced

Data Collection also has advanced settings where the properties can be seen when expanded.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/datacol-advanced-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/datacol-advanced-dark.webp#dark-only'),
    }}
  />
</div>

- **DateDelta**: Makes requests to the API, using a date variable - `{date.UseDateTimeDelta}` which will work as a starting/from `date`. The next run will determine the difference in time where the from-date will be set to datetime now.
  This variable can be used in the URI, body or header-value.
  Example of variable used in URI: `http://example.com/api/getStuff?FromDate={date.UseDateTimeDelta(1980-01-01T08:00:00.00).SetCstZone(Central Europe Standard Time) | date: dd.MM.yyyy HH.mm.ss | error: fallback 2023-02-02T08:00:00.00}&ToDate={date.SetCstZone(Central Europe Standard Time)}`
- **Use Content As Request Body**: The current version of the content at the time of the data collection is sent to the collection endpoint as the body of the request. Default value is empty body.
- **Use Response As Content**: The current content is replaced by the body returned by the data collection endpoint, this happens regardless of what is returned.
- **Current Message Content Type**: The current content type of the message. Use this only if the content type of the message at this stage is different from the message format defined for the configuration. Used for [Connxio Macro Language](/integrations/cxmal/connxio-macro-language) only.

## Retry

Data collection is currently using the backoff retry described on the [Retry](/integrations/retry) page.

## Advanced error handling

By default, all failed requests will be retried according to the [retry](#retry) pattern. If the request is still not successful, the transaction will be logged as an error and terminated. Advanced error handling allows you to create rules for handling specific unsuccessful status codes beyond the standard pattern.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/datacol-error-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/datacol-error-dark.webp#dark-only'),
    }}
  />
</div>

| Input&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status codes                                                                                          | int , -                                                                                                                                                                                        | A comma-separated list of status codes on which the rule should act. A range of status codes can be defined by using '-', for instance, 401-408 will represent all status codes from and including 401 to and including 408. |
| Action                                                                                                | Terminate,<br /> Continue                                                                                                                                                                      | "Terminate" stops the transaction, while "Continue" continues the transaction, logging it as error unless something else is defined in the "Custom status" field                                                             |
| Custom status                                                                                         | string                                                                                                                                                                                         | By default all transactions will be logged as "Error". This property overrides the default status.                                                                                                                           |
| Retry                                                                                                 | true,<br />false                                                                                                                                                                               | If disabled, no retry attempts will be made and the Rule Action will trigger immediately. If enabled, the default [retry](#retry) pattern will run before the Rule Action triggers.                                          |
