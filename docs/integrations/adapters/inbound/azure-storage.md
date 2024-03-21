# Azure Storage

Connxio lets customers provide messages to the Connxio pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Configuring the Azure Storage adapter

To configure Connxio to start picking your messages select the Azure Storage option in "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

<br />
The following properties are used to configure the adapter:

- **Triggering interval**: Dictates when files are picked from the Azure Storage account. You can choose between two types; Polling interval and Cron. Find out what's best suited for you [here](/integrations/triggering-interval).
- **Storage type**: Select storage type to use. Types include: Blob, File, Queue and Table.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **Container Name**: The name of the container. This container must exist before Connxio start picking messages. We will not create it for you.
- **Directory**: Specifies which directory Connxio should target for file pickup. If this is kept blank the root directory is used (Azure Storage *File Share* only).
- **Batch Size**: The number of messages to in a single thread. The lower the number the more threads are spawned, ie. 1000 messages are stored on blob, batch size is set to 100, Connxio reads that there are 1000 files and spawns 10 parallel threads for pickup and processing.
- **File Pick Limit**: The amount of files to pick per run of the engine. If polling interval is set to 1 minute and this variable is set to 1 message, Connxio will pick 1 message per minute. This variable is primarily used to slow down message processing to not kill receiving services.
- **File Pick Sort Type**: Changed the way files are sorted when **File Pick Limit** is used. Has no effect without **File Pick Limit**.
- **Ignore Inbound MetaData**: If enabled, the adapter will ignore all blob related metadata, such as interchangeId.
- **Regex Filter:** An inclusive regex filter that lets you pick only the messages matching the supplied regex. We use the standard C# regex syntax.

## Data Lake

Connxio supports data lake for Azure Storage Blob. We flatten the folder architecture and get all files on the file system. No changes are needed for your configuration when using data lake functionality.

## Retry

Since Connxio reaches out and picks up files when using Azure Storage, retry is handled by the Connxio framework. If a fault happens when the trigger interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval/cron set to trigger hourly or event daily, Connxio will try to execute the configuration every minute until it succeeds. This does not happen if the message is already picked up however since Connxio cannot be sure the message is possible to requeue on the external storage. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
