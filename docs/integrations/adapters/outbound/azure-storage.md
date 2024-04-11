# Azure Storage

Connxio lets customers receive messages from the Connxio pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Configuring the Azure Storage adapter

To configure Connxio to start sending your messages select the Azure Storage option in "Outbound Connections" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="data pickup interval"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new adapter, a popup with the adapter's input fields will appear.
Azure storage has 4 sections; Adapter name, Acknowledgement settings, Core settings and Advanced settings.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sections-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:

### Adaptername & Ack

- **Adapter Name**: The logical name of the adapter. This is shown in outbound adapter list in the subintegration view.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).


### Core settings
Core settings differ based on storage type.
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="data pickup interval"
    sources={{
      light: useBaseUrl('/img/docs/outbound/azs-core-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/azs-core-dark.webp#dark-only'),
    }}
  />
</div>

- **Storage type**: Select storage type to use. Types include: Blob, File, Queue and Table.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **Container Name**: The name of the container. This container must exist before Connxio start picking messages. We will not create it for you.
- **Directory**: The *directory* field specifies which directory Connxio should target for file pickup. If this is kept blank the root directory is used. (Azure Files)
- **Service bus message body contract**: Specifies the outgoing message body contract. (Queue)
- **Pure message sending**: The adapter expects the actual message to be sent on the servicebus instead of the SasUri. (Queue)


### Advanced settings
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="data pickup interval"
    sources={{
      light: useBaseUrl('/img/docs/outbound/azs-advanced-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/azs-advanced-dark.webp#dark-only'),
    }}
  />
</div>

- **Outbound Filename Pattern**: Uses variable replacement to generate file names, this is described in detail on the [variable replacement](/connxio-portal/variables/variable-replacement) page.
- **Duplicate Detection**: Terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'
- **New Interchange ID**: Removes interchangeid from adapter specific metadata to force new id on re-entry. (Blob)



## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling backoff retry.
