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
- **Headers**: Add any custom header you might need. This can include custom Authorization if needed.
- **Continue on 404**: Turning this on means the data collection will continue if it cant find the resource its looking for. Be careful since this might make other transformations like code components fail.
- **Stop on empty**: Stops if data is empty and [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) is positive.

## Retry

Data collection uses [linear retry](/Retry.md), we are looking into switching to backoff retry, but this is not implemented yet.
