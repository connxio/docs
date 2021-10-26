# Security Configurations

- [Security Configurations](#security-configurations)
  - [Creating a Security Configuration](#creating-a-security-configuration)

A security configuration is basically just a smart way to store credentials for HTTP communication. This gives customers the ability to securely store credentials and reuse them on multiple integrations. This page describes how to create a *security configuration*.

## Creating a Security Configuration

Navigate to "Security Configurations" in the right hand menu and click "Add new configuration". Your are then greeted by three fields:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20new.png?sv=2020-04-08&st=2021-10-25T12%3A16%3A05Z&se=2040-10-26T12%3A16%3A00Z&sr=b&sp=r&sig=u3dl0rsz%2FlHElWJddppOtcFbuwpvqIzhuxvynKgJkCc%3D)

- Name: The name that pops up when you select the configuration on an integration.
- Apim Subscription Key: Convenience field for adding Ocp-Apim-Subscription-Key.
- Authorization Header Type: Select the protocol use dby your endpoint

Add values as needed for your HTTP resource. If you need to add headers you can do this in the integration configurations itself.
