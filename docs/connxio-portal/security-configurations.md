---
sidebar_position: 2
---

# Security Configurations

A security configuration is basically just a convenient way to store adapter and logging credentials. This gives customers the ability to securely store credentials and reuse them on multiple integrations. This page describes how to create a *security configuration*.

## Creating a Security Configuration

Navigate to "Security Configurations" in the right hand menu and click "Add new configuration". Your are then greeted by a select menu where you will choose what kind of configuration you want to create. The possible options are:

- **Webhook**: Used for Http/Rest adapters, data collection and webhook logging
- **Archeo**: Credentials for Archeo logging
- **SFTP**: Credentials for SFTP adapters
- **FTP**: Credentials for FTP adapters
- **Connection String**: Used for Azure Storage, Service Bus and Event Grid adapters

### Webhook

When selecting Webhook, you'll first encounter three fields:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20Webhook%20new.png?sv=2020-08-04&st=2022-01-10T14%3A32%3A13Z&se=2040-01-01T00%3A01%3A00Z&sr=b&sp=r&sig=v5VaXN7LSq6WVqJqkBmbUqjcEKM9XRdgkKK4WoQOm2o%3D)

- **Name**: The name that pops up when you select the configuration on an integration.
- **Apim Subscription Key**: Convenience field for adding Ocp-Apim-Subscription-Key.
- **Authorization Header Type**: Select the protocol used by your endpoint

Add values as needed for your HTTP resource. If you need to add headers you can do this in the integration configurations itself.

#### Choosing your authentication scheme

We supply thee authentication schemes in Connxio (CX):

##### OAuth 2.0

Oauth is an established standard for authentication between systems. We won't be going into detail on how to manage and use Oauth 2.0 here as this is an advanced security topic. To configure the Oauth parameters you enter information as described below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Configurations%20Oauth.PNG?sv=2020-04-08&st=2021-11-03T13%3A42%3A44Z&se=2040-11-04T13%3A42%3A00Z&sr=b&sp=r&sig=Cln%2F5X9WHVc6nJ169pDqQMVpLyQWtxLcMZ7LsyFmMv4%3D)

Please refer to the [Oauth 2.0 standard](https://oauth.net/2/) for more information about the fields.

##### Basic

This is regular basic auth. Add username and password without encoding, we will encode before sending the request.

##### Header or custom

To configure header or custom security please add the header in the "header" options on each usage of the security configuration. We will be adding header security as an option at a later date.

### Archeo

In addition to to the name, the Archeo security config only holds one field:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20Archeo%20new.png?sv=2020-08-04&st=2022-01-11T06%3A00%3A26Z&se=2040-01-12T06%3A00%3A00Z&sr=b&sp=r&sig=X4DV4KWjDr9tiFDvU%2FAk0ufKZBbYXuVEtteIA1jHDPA%3D)

- **Name**: The name that pops up when you select the configuration on an integration.
- **Archeo API Key**: The Archeo API Key provided from Archeo, used when logging to Archeo.

### Sftp

The SFTP configuration contains all the relevant properties for connection to the SFTP server. The path to witch folder to connect to is set on the adapter.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20SFTP%20new.png?sv=2020-08-04&st=2022-01-11T06%3A04%3A36Z&se=2040-01-12T06%3A04%3A00Z&sr=b&sp=r&sig=E8O5GDIFeCd4QgS0aH2BLDSXpM5c1lbDIsFm2AQIjqE%3D)

- **Name**: The name that pops up when you select the configuration on an integration.
- **Url**: The url to the SFTP server. The url support port number of suffixed with a colon, ie: sftp-server.net:1337
- **Username**: The username CX uses to authenticate to server.
- **Password**: The password CX uses to authenticate to server.
- **SSH HostKey Fingerprint**: The fingerprint of the server certificate. Read more in the [WinScp documentation](https://winscp.net/eng/docs/faq_hostkey).

### Ftp

The FTP configuration contains all the relevant properties for connection to the SFTP server. The path to witch folder to connect to is set on the adapter.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20FTP%20new.png?sv=2020-08-04&st=2022-01-11T06%3A08%3A04Z&se=2040-01-12T06%3A08%3A00Z&sr=b&sp=r&sig=DJaxv0KMulGnCJV%2FHYncM2%2FDWP4czaaL5pIjf7MTtsQ%3D)

- **Name**: The name that pops up when you select the configuration on an integration.
- **Url**: The url to the FTP server.  The url support port number of suffixed with a colon, ie: ftp-server.net:1337.
- **Username**: The username CX uses to authenticate to server.
- **Password**: The password CX uses to authenticate to server.

### Connection String

This Connection String Security Config is used wherever a Connection String is to be used. This could be a Azure Storage adapter, ServiceBus adapter or a Event Grid adapter.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Security%20Config%20ConnectionString%20new.png?sv=2020-08-04&st=2022-01-11T06%3A13%3A12Z&se=2040-01-12T06%3A13%3A00Z&sr=b&sp=r&sig=L9jXdUxCrf01GPSdzEvWg28cUXm5tgRp4AVX9z2hJcU%3D)

- **Name**: The name that pops up when you select the configuration on an integration.
- **Connection String**: The connection string for the relevant resource.
