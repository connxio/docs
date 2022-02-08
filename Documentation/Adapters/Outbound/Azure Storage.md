# Azure Storage Outbound Adapter

- [Azure Storage Outbound Adapter](#azure-storage-outbound-adapter)
  - [Limits](#limits)
  - [Configuring Azure Storage delivery](#configuring-azure-storage-delivery)
  - [Retry](#retry)

ConnXio (CX) lets customers receive messages from the CX pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Limits

Azure Storage provides a modern interface for file and message transfer which is robust, fast and cheap. By leveraging the Azure infrastructure Microsoft has turned storage into a powerhouse in and of itself which CX takes full advantage of. Essentially this means that there are very few limitations on the technology itself, this enables CX to handle an almost unlimited amount of messages, different types of files and metadata through the Azure Storage technology. The only real limitation is the CX-wide limit of 100mb per message.

## Configuring Azure Storage delivery

To configure CX to start sending your messages select the Azure Storage option in "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)

A new window pops up, we will be using *blob* communication as an example. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20outbound%20config.png?sv=2020-08-04&st=2022-01-11T10%3A02%3A00Z&se=2040-01-12T10%3A02%3A00Z&sr=b&sp=r&sig=n1M2hC1A8hmmwepy%2Fcd%2FdQ78%2FTCQ5lIH3MXoKaSXcnY%3D)

- **Adapter Name**: The logical name of the adapter. This is shown in the configuration view on close.
- **Storage type**: Select storage type to use.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/Documentation/Security/Security%20Configurations.md) that contains the relevant connection properties.
- **Container Name**: The name of the container. This container must exist before CX start picking messages. We will not create it for you.
- **Outbound Filename Pattern**: Uses variable replacement to generate file names, this is described in detail on the [variable replacement](/Documentation/Transformation/Variable%20Replacement.md) page.
- **Send Acknowledgement**: Is explained [here](/Documentation/Adapters/Outbound/Acknowledgment.md).

**For Azure Files** the only difference is the *directory* field which specifies which directory CX should target for file pickup. If this is kept blank the root directory is used.

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/Documentation/Retry.md). This may change in the future as we are looking into enabling backoff retry.
