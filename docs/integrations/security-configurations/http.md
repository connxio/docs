---
sidebar_position: 2
---

import PropertyReference from '@site/src/components/PropertyReference';

# HTTP

Authenticate HTTP/REST requests, data collection, and webhook logging.

## Configure the connection

Create a security configuration with **HTTP** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Headers",
    description: "Headers to include with the request, such as an API key or other parameters required by the endpoint.",
  },
  {
    name: "Authorization Header Type",
    description: "Choose None, OAuth2 (Bearer), or Basic to match the endpoint authentication scheme.",
  },
]} />

## OAuth 2.0

Select **OAuth2 (Bearer)** as the authorization header type and enter the values required by your authentication provider.

<PropertyReference properties={[
  {
    name: "Authentication URL",
    description: "Required. The URL used to request an access token.",
  },
  {
    name: "Client ID",
    description: "Required. The client ID registered with the authentication provider.",
  },
  {
    name: "Client Secret",
    description: "Required. The client secret registered with the authentication provider.",
  },
  {
    name: "Grant Type",
    description: "Required. The grant type used to request a token, for example client_credentials.",
  },
  {
    name: "Scope / Resource",
    description: "Choose whether the token request uses a scope or a resource, as required by the authentication provider.",
  },
  {
    name: "OAuth Scope",
    description: "The scope to request when Scope is selected.",
  },
  {
    name: "Resource",
    description: "The resource to request when Resource is selected.",
  },
  {
    name: "Custom authentication properties",
    description: "Additional properties required by the authentication provider for the token request.",
  },
  {
    name: "Custom token header",
    description: "Enable to customize the header used to send the access token. Set Key to the header name and Value to the header value, using {token} as the placeholder for the access token.",
    samples: [
      {label: "Key", value: "Authorization"},
      {label: "Value", value: "Bearer {token}"},
    ],
  },
]} />

See the [OAuth 2.0 standard](https://oauth.net/2/) for background on OAuth.

## Basic authentication

Select **Basic** as the authorization header type. Enter the credentials without encoding them; Connxio encodes them before sending the request.

<PropertyReference properties={[
  {
    name: "Username",
    description: "The username used to authenticate the request.",
  },
  {
    name: "Password",
    description: "The password used to authenticate the request.",
  },
]} />
