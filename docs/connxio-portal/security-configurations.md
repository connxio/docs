---
sidebar_position: 3
---

# Security Configurations

Security configurations in Connxio are reusable blocks of information that contain credentials and other necessary details for securely connecting to various systems. These configurations help streamline the setup process and ensure the secure transmission of data between Connxio and external systems. Connxio stores all sensitive information securely in a secure key storage, ensuring the confidentiality of passwords and credentials.

## Purpose of Security Configurations

Security configurations serve the following purposes in Connxio:

- **Secure Connections**: Security configurations store sensitive information, such as credentials or API keys, required to establish secure connections with external systems.
- **Reusability**: By creating reusable security configurations, users can easily apply the same set of credentials across multiple integrations, saving time and effort in configuration management.
- **Centralized Management**: Storing security information in one place allows for centralized management and ensures consistency in connection details.
- **Enhanced Security**: By keeping passwords and sensitive information separate from integration configurations, Connxio minimizes the risk of exposing confidential data.

## Creating a Security Configuration

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/menu-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/menu-dark.webp#dark-only'),
    }}
  />
</div>

Navigate to "Security Configurations" in the right hand menu and click "Add new configuration".

Your are then greeted by a Security Type menu where you will choose what kind of configuration you want to create. The possible options are:

- **HTTP**: Used for HTTP/REST adapters, data collection and webhook logging
- **Archeo**: Credentials for Archeo logging
- **SFTP**: Credentials for SFTP adapters
- **FTP**: Credentials for FTP adapters
- **Connection String**: Used for Azure Storage, Service Bus and Event Grid adapters
- **Email**: Credentials for Email.

When a security type has been chosen, you can decide whether the security configuration should be global or not. If the global toggle is on, the security configuration will be the same across all subscriptions under the same company:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/global-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/global-dark.webp#dark-only'),
    }}
  />
</div>

If global is set to off, you'll set different values for each subscription:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/nonglobal-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/nonglobal-dark.webp#dark-only'),
    }}
  />
</div>

### HTTP

When selecting HTTP, you'll first encounter these fields:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/http-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/http-dark.webp#dark-only'),
    }}
  />
</div>

- **Name**: The name that pops up when you select the configuration on an integration.
- **Headers**: Add headers here as necessary to either authenticate the request or add other needed parameters.
- **Authorization Header Type**: Select the protocol used by your endpoint. Choose between *None*, *OAuth2(Bearer)* and *Basic*.

#### Choosing your authentication scheme

We supply these authentication schemes in Connxio:

##### OAuth 2.0

Oauth is an established standard for authentication between systems. We won't be going into detail on how to manage and use Oauth 2.0 here as this is an advanced security topic. To configure the Oauth parameters you enter information as described below:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/http-oauth-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/http-oauth-dark.webp#dark-only'),
    }}
  />
</div>

Please refer to the [Oauth 2.0 standard](https://oauth.net/2/) for more information about the fields.

##### Basic

This is regular basic auth. Add username and password without encoding, we will encode before sending the request.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/http-basic-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/http-basic-dark.webp#dark-only'),
    }}
  />
</div>

### Archeo

Archeo holds one field, besides the config's name property:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/archeo-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/archeo-dark.webp#dark-only'),
    }}
  />
</div>

- **Name**: The name that pops up when you select the configuration on an integration.
- **Archeo API Key**: The Archeo API Key provided from Archeo, used when logging to Archeo.

### SFTP

The SFTP configuration contains all the relevant properties for connection to the SFTP server. The path to which folder to connect to is set in the configuration of the adapter.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/sftp-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/sftp-dark.webp#dark-only'),
    }}
  />
</div>

- **Name**: The name that pops up when you select the configuration on an integration.
- **Connection URL**: The url to the SFTP server. The url support port number of suffixed with a colon, ie: sftp-server.net:1337
- **Username**: The username Connxio uses to authenticate to server.
- **Password**: The password Connxio uses to authenticate to server.
- **Certificate**: Specifies a [SSH private certificate](https://winscp.net/eng/docs/public_key#private) in putty format that is used for authentication towards the sftp server.
- **Certificate Passphrase**: Used only with *Certificate* to authenticate ssh private key.
- **SSH HostKey Fingerprint**: The fingerprint of the server certificate. Read more in the [WinScp documentation](https://winscp.net/eng/docs/faq_hostkey).

#### Certificates

The certificate field for SFTP is used to select a [SSH private key](https://winscp.net/eng/docs/public_key#private). This is only relevant if your server supports this authentication method. We still support username and password.

The SSH key, must be in putty format as detailed here: [Instructions](https://winscp.net/eng/docs/guide_public_key)

### FTP

The FTP configuration contains all the relevant properties for connection to the SFTP server. The path to which folder to connect to is set in the configuration of the adapter.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/ftp-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/ftp-dark.webp#dark-only'),
    }}
  />
</div>

- **Name**: The name that pops up when you select the configuration on an integration.
- **Connection URL**: The url to the FTP server.  The url support port number of suffixed with a colon, ie: ftp-server.net:1337.
- **Username**: The username Connxio uses to authenticate to server.
- **Password**: The password Connxio uses to authenticate to server.

### Connection String

The Connection String Security Config is used wherever a Connection String is to be used. This could be a Azure Storage adapter, ServiceBus adapter or a Event Grid adapter.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/global-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/global-dark.webp#dark-only'),
    }}
  />
</div>

- **Name**: The name that pops up when you select the configuration on an integration.
- **Connection String**: The connection string for the relevant resource.

### Event Hub

The Connection String Security Config is used for Azure Event Hub.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/event-hub.jpg'),
      dark: useBaseUrl('/img/docs/securityconfig/event-hub-dark.jpg#dark-only'),
    }}
  />
</div>

- **Event hub name**: The name of the Event Hub.
- **Event hub connection string**: The connection string for the Event Hub.
- **Consumer group**: The Consumer Group to listen to.
- **Checkpoint storage connection string**: The connection string for the Event Hub checkpoint storage. This is the storage that controls all your checkpoints and is required for stable transfer.
- **Checkpoint storage container**: The container for the Event Hub checkpoint storage.

### Email

When selecting email, these are the fields to be filled in:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="security config"
    sources={{
      light: useBaseUrl('/img/docs/securityconfig/email-light.webp'),
      dark: useBaseUrl('/img/docs/securityconfig/email-dark.webp#dark-only'),
    }}
  />
</div>

- **Email Address**: The email address.
- **Username**: The email username.
- **Password**: The email account password.
- **Host**: The server that hosts the email account.
- **Host Type**: The type of protocol used on the server.
- **Port**: The port for connecting to the server. IMAP typically uses port 993 over SSL.
- **Use SSL**: Most hosts require SSL. Turn this on to make Connxio contact the host with SSL enabled.

### Dataverse

When selecting dataverse, these are the fields to be filled in:

- **Name**: The name that pops up when you select the configuration on an integration.
- **URL**: The URL of a Dataverse instance
- **Client Id**: The Client Id used to connect to a Dataverse instance.
- **Client secret**: The secret used to connect to a Dataverse instance.

#### Dataverse batch limits

These options are used when enabling batching on a dataverse adapter.

- **Max Batch Size**: Upper limit of messages processed per interval.
- **Batch interval in seconds**: Seconds to wait before processing next batch of messages.
- **Max concurrent processors**: Upper limit of processor scaling. Scales up based on message count
