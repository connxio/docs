# Azure Storage Inbound Adapter

- [Azure Storage Inbound Adapter](#azure-storage-inbound-adapter)
  - [Limits](#limits)
  - [Configuring Azure Storage connections](#configuring-azure-storage-connections)
  - [Retry](#retry)

ConnXio (CX) lets customers receive messages from the CX pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Limits

Azure Storage provides a modern interface for file and message transfer which is robust, fast and cheap. By leveraging the Azure infrastructure Microsoft has turned storage into a powerhouse in and of itself which CX takes full advantage of. Essentially this means that there are very few limitations on the technology itself, this enables CX to handle an almost unlimited amount of messages, different types of files and metadata through the Azure Storage technology. The only real limitation is the CX-wide limit of 100mb per message.

## Configuring Azure Storage connections

To configure CX to start sending your messages select the Azure Storage option in "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)

A new window pops up, we will be using *blob* communication as an example. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20outbound%20config.png?sv=2020-08-04&st=2021-11-08T12%3A37%3A11Z&se=2040-11-09T12%3A37%3A00Z&sr=b&sp=r&sig=ky2t7Syg%2F8PsgroM4Kht1I1ZOuUIITzZ6uC7CmHb%2FUA%3D)

- **Adapter Name**: The logical name of the adapter. This is shown in the configuration view on close.
- **Storage type**: Select storage type to use.
- **Storage Connection string**: This can be found in the azure portal on your resource tab.
- **Container Name**: The name of the container. This container must exist before CX start picking messages. We will not create it for you.
- **Outbound Filename Pattern**: Described in [variable replacement](/Transformation/Variable%20Replacement.md).
- **Send Acknowledgement**: Is explained [here](/Adapters/Outbound/Acknowledgment.md).

**For Azure Files** the only difference is the *directory* field which specifies which directory CX should target for file pickup. If this is kept blank the root directory is used.

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/Retry.md). This may change in the future as we are looking into enabling backoff retry.
