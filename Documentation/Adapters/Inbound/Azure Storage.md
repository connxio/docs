# Azure Storage Outbound Adapter

- [Azure Storage Outbound Adapter](#azure-storage-outbound-adapter)
  - [Limits](#limits)
  - [Configuring Azure Storage connections](#configuring-azure-storage-connections)
  - [Retry](#retry)

ConnXio (CX) lets customers provide messages to the CX pipeline by configuring connections to Azure Storage accounts. We currently support messages as [blobs](https://azure.microsoft.com/en-us/services/storage/blobs/) or [files](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal). This page details how to configure Azure storage connections and what functionality is available by delivering files through this medium.

## Limits

Azure Storage provides a modern interface for file and message transfer which is robust, fast and cheap. By leveraging the Azure infrastructure Microsoft has turned storage into a powerhouse in and of itself which CX takes full advantage of. Essentially this means that there are very few limitations on the technology itself, this enables CX to handle an almost unlimited amount of messages, different types of files and metadata through the Azure Storage technology. The only real limitation is the CX-wide limit of 100mb per message.

## Configuring Azure Storage connections

To configure CX to start picking your messages select the Azure Storage option in "Inbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up, we will be using *blob* communication as an example. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20inbound%20config.png?sv=2020-08-04&st=2022-01-11T09%3A41%3A50Z&se=2040-01-12T09%3A41%3A00Z&sr=b&sp=r&sig=z9%2BSZHX%2FJBl4eTScIlSkg3mxnlPEVwXIKIHehVv0hYs%3D)

- **Polling Interval**: Dictates when files are picked from the Azure Storage account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds.
- **Storage type**: Select storage type to use.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/Documentation/Security/Security%20Configurations.md) that contains the relevant connection properties.
- **Container Name**: The name of the container. This container must exist before CX start picking messages. We will not create it for you.
- **Directory**: Specifies which directory CX should target for file pickup. If this is kept blank the root directory is used (Azure Storage *File Share* only).
- **Batch Size**: The number of messages to in a single thread. The lower the number the more threads are spawned, ie. 1000 messages are stored on blob, batch size is set to 100, CX reads that there are 1000 files and spawns 10 parallel threads for pickup and processing.
- **File Pick Limit**: The amount of files to pick per run of the engine. If polling interval is set to 1 minute and this variable is set to 1 message, CX will pick 1 message per minute. This variable is primarily used to slow down message processing to not kill receiving services.
- **File Pick Sort Type**: Changed the way files are sorted when **File Pick Limit** is used. Has no effect without **File Pick Limit**.
- **Ignore Inbound MetaData**: If enabled, the adapter will ignore all blob related metadata, such as interchangeId.

## Retry

Since CX reaches out and picks up files when using Azure Storage, retry is handled by the CX framework. If a fault happens when the [polling interval](#polling-interval) hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, CX will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however since CX cant be sure the message is possible to requeue on the external storage. The message will then be sent to catastrophic retry as described in the [Retry Page](/Documentation/Retry.md).
