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
On creating a new adapter, a popup with the adapter's input fields will appear.
Azure storage has 4 sections; Data Pickup Interval, Core Settings, Advanced Settings and Wrapper.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/inbound/azure-storage-light.webp'),
      dark: useBaseUrl('/img/docs/inbound/azure-storage-dark.webp#dark-only'),
    }}
  />
</div>


Read more about the properties in each section below:
- **Data Pickup Interval**:
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/trigger-interval-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/trigger-interval-dark.webp#dark-only'),
      }}
    />
  </div>
  
  - **Triggering interval**: Dictates when files are picked from the Azure Storage account. You can choose between two types; Polling interval and Cron. Find out what's best suited for you [here](/integrations/triggering-interval).

- **Core Settings**: 
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/azs-core-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/azs-core-dark.webp#dark-only'),
      }}
    />
  </div>

  - **Storage type**: Select storage type to use. Types include: Blob, File, Queue and Table.
  - **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
  - **Container Name**: The name of the container. This container must exist before Connxio start picking messages. We will not create it for you.
  - **Directory**: Specifies which directory Connxio should target for file pickup. If this is kept blank the root directory is used (Azure Storage *File Share* only).

- **Advanced settings**:
  
  Advanced settings differ based on storage type.
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/azs-advanced-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/azs-advanced-dark.webp#dark-only'),
      }}
    />
  </div>

  - **File Pick Limit**: The amount of files to pick per run of the engine. If polling interval is set to 1 minute and this variable is set to 1 message, Connxio will pick 1 message per minute. This variable is primarily used to slow down message processing to not kill receiving services. (All storage types)
  - **File Pick Sort Type**: Changed the way files are sorted when **File Pick Limit** is used. Has no effect without **File Pick Limit**. (Blob, File, Table)
  - **Regex Filter**: An inclusive regex filter that lets you pick only the messages matching the supplied regex. We use the standard C# regex syntax. (Blob)
  - **Data Lake**: Enables data lake functionality for blob. (Blob)
  - **Pure Message Sending**: Adapter expects the actual message to be sent on the queue instead of the SasUri. (Queue)
  - **Query Table**: Enable to receive rows based on queries. If disabled all rows will be fetched.

- **Wrapper**:
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/wrapper-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/wrapper-dark.webp#dark-only'),
      }}
    />
  </div>

  - **WrapperType**: Choose between Json, XML or None.
  - **Might be Wrapped**: A wrapper is essentially just a shell around the actual message content that contains information not within the concern of the message itself. Read more about wrappers [here](/interaction/wrappers).

## Data Lake

Connxio supports data lake for Azure Storage Blob. We flatten the folder architecture and get all files on the file system. No changes are needed for your configuration when using data lake functionality.

## Retry

Since Connxio reaches out and picks up files when using Azure Storage, retry is handled by the Connxio framework. If a fault happens when the trigger interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval/cron set to trigger hourly or event daily, Connxio will try to execute the configuration every minute until it succeeds. This does not happen if the message is already picked up however since Connxio cannot be sure the message is possible to requeue on the external storage. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
