---
sidebar_position: 2.1
title: Custom APIs
---

import PropertyReference from '@site/src/components/PropertyReference';

# Custom APIs

Custom APIs expose named HTTP routes for your integrations. Callers send messages to a route instead of identifying an integration by its `ConfigCorrelationId`. Each route maps an HTTP method and path to an integration.

Use different methods on the same path to route requests to different integrations, or change the integration behind a route while keeping the caller's endpoint the same.

## Create a custom API {#getting-started}

1. Configure the integrations you want to call with an [API trigger](../triggers/api.mdx).
2. Open the **APIs** section in the portal and create an API.
3. Enter its **Title** and **Summary**, then select the **Subscription** containing the integrations.
4. Add routes, choosing an HTTP method, path, and target integration for each one.

Use the filter in the API selection menu to find an existing API.

### API settings

<PropertyReference properties={[
  {
    name: 'Title',
    description: 'The name used to identify the custom API.',
    example: 'Orders API',
  },
  {
    name: 'Summary',
    description: 'A description of the API and the operations it provides.',
    example: 'Receive new orders and order updates.',
  },
  {
    name: 'Subscription',
    description: 'The subscription from which target integrations are selected. Integrations must have an API trigger to be available.',
  },
  {
    name: 'Routes',
    description: 'The mappings between HTTP methods, request paths, and integrations. Configure each route as described below.',
  },
]} />

### Route settings

<PropertyReference properties={[
  {
    name: 'HTTP method',
    description: 'The request method that selects this route together with its path.',
    example: 'POST',
  },
  {
    name: 'Route',
    description: 'The path the caller uses after https://custom.connxio.com.',
    example: '/orders',
  },
  {
    name: 'Integration',
    description: 'The integration that processes messages received through this route.',
  },
]} />

For example, `POST /orders` can start an integration that creates an order, while `PUT /orders` starts an integration that updates one.

:::info HTTP methods
The HTTP method selects a route within the custom API. It is not passed along to the integration.
:::

## API key {#api-key}

Creating a custom API generates an associated API key. Send that key in the `Connxio-Api-Key` header to identify which custom API should handle the request.

Different custom APIs can use the same paths and methods. Their keys distinguish them, allowing separate test and production flows to use the same endpoint with different keys.

The [API keys page](./apikeys.mdx) lists these keys with a **Custom API** badge and the `Messaging.Dynamic` scope. Open the related API to manage its key settings.

- Enable or disable the key to control access.
- Enable webhook access when the caller needs to authenticate without an OAuth token.
- Regenerate the key when it needs to be replaced, and update applications that use it.

You can also delete the custom API when it is no longer needed.

## Call a custom API

Send the request to `https://custom.connxio.com` followed by the configured route. Use the route's HTTP method and the key associated with that custom API.

For a route configured as `POST /orders`, the endpoint is:

```text
https://custom.connxio.com/orders
```

Use the authentication headers shown below. For general API authentication details, see the [API reference](/reference/connxio-api).

## Example requests

These examples assume a `POST /orders` route. Replace the key and token placeholders with your application's credentials.

### API key with a bearer token {#api-key-in-header-with-bearer-token}

```bash
curl --request POST 'https://custom.connxio.com/orders' \
  --header 'Connxio-Api-Key: YOUR_API_KEY' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"orderId":"ORDER-123"}'
```

### API key with webhook authentication {#api-key-in-header-with-webhook-header-connxio-api-webhook-true}

Enable webhook access for the custom API key before using this request. The `Connxio-Api-Webhook: true` header allows webhook authentication without an OAuth token.

```bash
curl --request POST 'https://custom.connxio.com/orders' \
  --header 'Connxio-Api-Key: YOUR_API_KEY' \
  --header 'Connxio-Api-Webhook: true' \
  --header 'Content-Type: application/json' \
  --data '{"orderId":"ORDER-123"}'
```

## OpenAPI specification

Each custom API has an OpenAPI overview describing its routes. Use it to review the API and download its specification as a JSON file.

The downloaded specification can be used with tools that support OpenAPI, such as an API management service.
