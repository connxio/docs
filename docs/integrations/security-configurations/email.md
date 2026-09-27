---
sidebar_position: 10
---

import PropertyReference from '@site/src/components/PropertyReference';

# Email

Store the server settings and credentials for an email connection.

## Configure the connection

Create a security configuration with **Email** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Email Address",
    description: "The email address.",
  },
  {
    name: "Username",
    description: "The username for the email account.",
  },
  {
    name: "Host",
    description: "The server hosting the email account.",
  },
  {
    name: "Host Type",
    description: "The protocol used for the connection. Select the protocol appropriate for the email trigger or action.",
  },
  {
    name: "Port",
    description: "The port used to connect to the server. IMAP typically uses port 993 over SSL.",
  },
  {
    name: "Use SSL",
    description: "Enable to connect to the host using SSL. Most hosts require SSL.",
  },
]} />

## Authentication

<PropertyReference properties={[
  {
    name: "Authorization type",
    description: "Choose Password to authenticate with the email account password, or Modern Auth to use application credentials.",
  },
  {
    name: "Password",
    description: "The password for the email account. Used when Authorization type is Password.",
  },
]} />

### Modern Auth

Select **Modern Auth** as the authorization type to configure the following fields.

<PropertyReference properties={[
  {
    name: "Client ID",
    description: "Required. The client ID of the application used to authenticate the email connection.",
  },
  {
    name: "Client secret",
    description: "Required. The client secret of the application used to authenticate the email connection.",
  },
  {
    name: "Tenant ID",
    description: "Required. The ID of the tenant containing the application.",
  },
]} />
