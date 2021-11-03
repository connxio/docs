# Azure Storage Inbound Adapter

- [Azure Storage Inbound Adapter](#azure-storage-inbound-adapter)
  - [Limits](#limits)
  - [Configuring Azure Storage connections](#configuring-azure-storage-connections)
  - [Polling interval `needs picture`](#polling-interval-needs-picture)
  - [Retry](#retry)

ConnXio (CX) lets customers provide messages to the CX pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Limits

Azure Storage provides a modern interface for file and message transfer which is robust, fast and cheap. By leveraging the Azure infrastructure Microsoft has turned storage into a powerhouse in and of itself which CX takes full advantage of. Essentially this means that there are very few limitations on the technology itself, this enables CX to handle an almost unlimited amount of messages, different types of files and metadata through the Azure Storage technology. The only real limitation is the CX-wide limit of 100mb per message.

## Configuring Azure Storage connections

To configure CX to start picking your messages select the Azure Storage option in "Inbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up, we will be using *blob* communication as an example. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20blob%20configuration.png?sv=2020-04-08&st=2021-10-27T12%3A07%3A02Z&se=2040-10-28T13%3A07%3A00Z&sr=b&sp=r&sig=QQP%2FU0qUaeshk8VAgNC8E2SyTsHKnj%2B8hBLBWCzdkqs%3D)

- **Storage type**: Select storage type to use.
- **Storage Connection string**: This can be found in the azure portal on your resource tab.
- **Container Name**: The name of the container. This container must exist before CX start picking messages. We will not create it for you.
- **Outbound Filename Pattern**: Described in [variable replacement](/Transformation/Variable%20Replacement.md).
- **Batch Size**: The number of messages to in a single thread. The lower the number the more threads are spawned, ie. 1000 messages are stored on blob, batch size is set to 100, CX reads that there are 1000 files and spawns 10 parallel threads for pickup and processing.
- **File Pick Limit**: The amount of files to pick per run of the engine. If polling interval is set to 1 minute and this variable is set to 1 message, CX will pick 1 message per minute. This variable is primarily used to slow down message processing to not kill receiving services.
- **File Pick Sort Type**: Changed the way files are sorted when **File Pick Limit** is used. Has no effect without **File Pick Limit**

For files the only difference is the **directory** field which specifies which directory CX should target for file pickup. If this is kept blank the root directory is used.

## Polling interval `needs picture`

Polling interval dictates when files are picked from the Azure Storage account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds.

## Retry

Since CX reaches out and pick up files when using Azure Storage, retry is handled by the CX framework. If a fault happens when the [polling interval](#polling-interval-needs-picture) hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, CX will try to execute the configuration every minute util it succeeds.
