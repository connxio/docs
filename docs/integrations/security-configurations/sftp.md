---
sidebar_position: 4
---

import PropertyReference from '@site/src/components/PropertyReference';

# SFTP

Store the connection details and credentials for an SFTP server. Set the folder path on the trigger or action.

## Configure the connection

Create a security configuration with **SFTP** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Connection URL",
    description: "The SFTP server address. Append a colon and port number to use a specific port, for example sftp-server.net:1337.",
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
    name: "Certificate",
    description: "The SSH private key in PuTTY format used for key authentication.",
  },
  {
    name: "Certificate Passphrase",
    description: "The passphrase for the private key selected in Certificate.",
  },
  {
    name: "SSH HostKey Fingerprint",
    description: "The fingerprint of the server host key.",
  },
]} />

## Key authentication

Use **Certificate** when the server supports SSH key authentication. The private key must be in PuTTY format. Username and password authentication is also supported. See the WinSCP guides for [private keys](https://winscp.net/eng/docs/public_key#private), [setting up key authentication](https://winscp.net/eng/docs/guide_public_key), and [host key fingerprints](https://winscp.net/eng/docs/faq_hostkey).
