---
sidebar_position: 2
---

import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# HTTP

The HTTP trigger calls an endpoint on a schedule and sends the response content into the Connxio pipeline for subsequent actions.

## Configure the trigger

Add an HTTP trigger to your integration and configure the settings below.

## General settings

<TriggerGeneralSettings showTriggerInterval />

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
description: "The content to send in the request body.",
},
]} />

## HTTP settings

<PropertyReference properties={[
{
name: "Custom timeout (seconds)",
description: "How long to wait for the endpoint to respond before the request times out, in seconds.",
example: "60",
},
{
name: "Use date delta",
description: <>Enables a date value that advances between scheduled runs. Use it in the URL, body, or a header to request data from a starting date. See <Link to="#date-delta">Date delta</Link> for details.</>,
},
{
name: "Use paging",
description: <>Retrieves multiple pages from the endpoint using a next link or continuation token. See <Link to="#paging">Paging</Link> for details.</>,
},
]} />

## Date delta

With **Use date delta** enabled, use the date macro's `UseDateTimeDelta` option in the request URL, body, or a header value. It provides a starting date for the request and advances to the current date and time on the next run.

See the [date macro](../cxmal/macros/date.md) for syntax and formatting options.

## Paging

Enable **Use paging** to configure the following settings.

<PropertyReference properties={[
{
name: "Paging type",
description: "Choose Continuation token, Next link (replace url), or Next link (append url).",
},
{
name: "Path/prop name",
description: "Required when paging is enabled. The path or property name in the API response containing the continuation token or next link.",
},
]} />

- **Continuation token**: Replaces `[continuationToken]` in the URL, body, or a header value with the token from the configured response property. Requests continue until the token is empty or 50 pages have been requested.
- **Next link (replace url)**: Replaces the request URL with the next link from the configured response property.
- **Next link (append url)**: Appends the next link from the configured response property to the request URL.

For both next-link types, requests continue until the configured response property no longer contains a valid URI.

## Logging

Connxio adds an `InterchangeId` header to each request so the endpoint can include it in its logs.

## Retry

If a scheduled request fails before content is retrieved, Connxio retries every 60 seconds until it succeeds, even when the configured trigger interval is longer.

Failures after content is retrieved use the catastrophic retry handling described in [Retry](../integrations/retry.md).

## Limitations

The endpoint must be available and responsive for Connxio to retrieve data. Configure the authentication and request settings required by the API, and monitor its availability and performance.
