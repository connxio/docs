---
sidebar_position: 5
---

import PropertyReference from '@site/src/components/PropertyReference';

# FTP

Store the connection details and credentials for an FTP server. Set the folder path on the trigger or action.

## Configure the connection

Create a security configuration with **FTP** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Connection URL",
    description: "The FTP server address. Append a colon and port number to use a specific port, for example ftp-server.net:1337.",
  },
  {
    name: "Username",
    description: "The username used to authenticate to the server.",
  },
  {
    name: "Password",
    description: "The password used to authenticate to the server.",
  },
  {
    name: "FTPS security type",
    description: "Choose Explicit or Implicit for FTPS communication. Choose None to disable FTPS.",
  },
]} />

See the [WinSCP FTPS documentation](https://winscp.net/eng/docs/ftps) for details about explicit and implicit FTPS.
