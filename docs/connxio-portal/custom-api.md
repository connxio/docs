---
sidebar_position: 7
title: Custom APIs
pagination_next: null
---

# Custom APIs

Custom APIs are a way of customizing the experience of using Connxio. Using the Custom API solution allows for setting up personalized endpoints which can be freely swapped between integrations based on need and can be used to standardize endpoints instead of using the ConfigCorrelationId for each integration. The custom APIs enable sending messages to the same endpoint using different Http Methods to decide which Connxio Configuration should be run, allowing for deep customization when combined with our [Rules Engine](/integrations/rules) and the [Connxio Macro Language](/integrations/cxmal/connxio-macro-language).



## Getting Started

Setting up a custom API for your integration is super simple! When your Integrations are set up with API as their inbound connections, they will become available in the APIs section in the portal.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="portal menu apis section selected"
    sources={{
      light: useBaseUrl('/img/docs/dynamicapis/portal-menu-light.webp'),
      dark: useBaseUrl('/img/docs/dynamicapis/portal-menu-dark.webp#dark-only'),
    }}
  />
</div>

After entering the APIs section of the portal, you will be met with a menu to create an API. 

- **Title**: The name of your API.
- **Summary**: A description of your API. Detail the operations of your API.
- **Subscription**: The subsription the API should be fetching relevant integrations from.
- **Routes**: Add the endpoint you wish to communicate with. Set the Http Method, route-string (e.g. */testing*) and set the integration it points to.

<div style={{maxWidth: '800px'}}>
  <ThemedImage
    alt="api configuration menu example"
    sources={{
      light: useBaseUrl('/img/docs/dynamicapis/api-config-menu-light.webp'),
      dark: useBaseUrl('/img/docs/dynamicapis/api-config-menu-dark.webp#dark-only'),
    }}
  />
</div>

To communicate with the API, set the correct HttpMethod and send a message to **custom.connxio.com/\{my-api-path\}** and set the **Connxio-Api-Key** header value to the value of the related API key.

When there are many APIs, it is possible to search for a specific API using the filter search in the selection menu.

:::info [HttpMethods]
Http Methods will not be passed along to Connxio and only work to differentiate endpoints within the Custom API.
:::



## Api Key

When an API is created, a related API key will be generated. The API key is important, as it points to your API. You may create many APIs that look the same, where only the API key will be the difference. This allows for setting up multiple flows on the same endpoint, whose flows can be mediated with a single variable. That way, you may set up test flows, alternate flows or multiple flows, pointing to the same endpoint, where all you need to do is choose which key should be passed in the Connxio-Api-Key header.

The keys can be enabled and disabled at will, and it is possible to set the API key to also work as a webhook-key instead. You may also regenerate the API-key whenever you wish, and delete the api.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="api key drop down menu"
    sources={{
      light: useBaseUrl('/img/docs/dynamicapis/api-key-menu-light.webp'),
      dark: useBaseUrl('/img/docs/dynamicapis/api-key-menu-dark.webp#dark-only'),
    }}
  />
</div>



## OpenAPI Specification

When you create an API in Connxio, you will also get a related OpenAPI specification overview. This menu is intended to give a familiar feel of the API, and provides the option to download an API-specification as a JSON file. This file is the same as any OpenAPI json file and can be used to e.g. set up an API Management instance. 

<div style={{maxWidth: '800px'}}>
  <ThemedImage
    alt="openAPI view of the api in the swagger style"
    sources={{
      light: useBaseUrl('/img/docs/dynamicapis/openapi-spec-light.webp'),
      dark: useBaseUrl('/img/docs/dynamicapis/openapi-spec-dark.webp#dark-only'),
    }}
  />
</div>

