# Azure Storage

Connxio lets customers receive messages from the Connxio pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Configuring the Azure Storage adapter

To configure Connxio to start sending your messages select the Azure Storage option in "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)

A new window pops up, we will be using *blob* communication as an example. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20outbound%20config.png?sv=2020-08-04&st=2022-05-02T11%3A58%3A37Z&se=2040-05-03T11%3A58%3A00Z&sr=b&sp=r&sig=%2BtYKjaHUTO2l6eaV4h%2BnMnhTTZrplJu2A5JyqM9NjHM%3D)

- **Adapter Name**: The logical name of the adapter. This is shown in the configuration view on close.
- **Storage type**: Select storage type to use. Types include: Blob, File, Queue and Table.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **Container Name**: The name of the container. This container must exist before Connxio start picking messages. We will not create it for you.
- **Outbound Filename Pattern**: Uses variable replacement to generate file names, this is described in detail on the [variable replacement](/connxio-portal/variables/variable-replacement) page.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).
- **Duplicate Detection**: Terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'

**For Azure Files** the only difference is the *directory* field which specifies which directory Connxio should target for file pickup. If this is kept blank the root directory is used.

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling backoff retry.
