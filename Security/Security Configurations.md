# Security Configurations

- [Security Configurations](#security-configurations)
  - [Creating a Security Configuration](#creating-a-security-configuration)
    - [Choosing your authentication scheme](#choosing-your-authentication-scheme)
      - [OAuth 2.0](#oauth-20)
      - [Basic](#basic)
      - [Header or custom](#header-or-custom)

A security configuration is basically just a smart way to store credentials for HTTP communication. This gives customers the ability to securely store credentials and reuse them on multiple integrations. This page describes how to create a *security configuration*.

## Creating a Security Configuration

Navigate to "Security Configurations" in the right hand menu and click "Add new configuration". Your are then greeted by three fields:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20new.png?sv=2020-04-08&st=2021-10-25T12%3A16%3A05Z&se=2040-10-26T12%3A16%3A00Z&sr=b&sp=r&sig=u3dl0rsz%2FlHElWJddppOtcFbuwpvqIzhuxvynKgJkCc%3D)

- **Name**: The name that pops up when you select the configuration on an integration.
- **Apim Subscription Key**: Convenience field for adding Ocp-Apim-Subscription-Key.
- **Authorization Header Type**: Select the protocol used by your endpoint

Add values as needed for your HTTP resource. If you need to add headers you can do this in the integration configurations itself.

### Choosing your authentication scheme

We supply thee authentication schemes in ConnXio (CX):

#### OAuth 2.0

Oauth is an established standard for authentication between systems. We won't be going into detail on how to manage and use Oauth 2.0 here as this is an advanced security topic. To configure the Oauth parameters you enter information as described below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Configurations%20Oauth.PNG?sv=2020-04-08&st=2021-11-03T13%3A42%3A44Z&se=2040-11-04T13%3A42%3A00Z&sr=b&sp=r&sig=Cln%2F5X9WHVc6nJ169pDqQMVpLyQWtxLcMZ7LsyFmMv4%3D)

Please refer to the [Oauth 2.0 standard](https://oauth.net/2/) for more information about the fields.

#### Basic

This is regular basic auth. Add username and password without encoding, we will encode before sending the request.

#### Header or custom

To configure header or custom security please add the header in the "header" options on each usage of the security configuration. We will be adding header security as an option at a later date.
