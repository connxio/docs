# FTP and SFTP

Connxio (CX) lets customers receive messages from the Connxio pipeline via SFTP (there are very few differences between FTP and SFTP while configuring Connxio, when we write SFTP we mean both FTP and SFTP unless otherwise specified). This page details limitations of the SFTP protocol and how to configure and connect to a SFTP server.

<details>
    <summary>Limitations</summary>
    <p>
There are several limitations inherent to the (S)ftp protocols. First and foremost (S)ftp servers are notoriously bad at handling connections, this mens that Connxio has to handle constant connection interruptions. Another limitation is traffic. (S)ftp has problems with handling a lot of connections at the same time and will, in many circumstances, shut down completely when overwhelmed. All this culminates in a very unstable server connection which we try to cope with in every way possible. We have used an enormous amount of resources to make our (S)ftp adapter as stable as possible since we know our customers have legacy systems that demands the continued usage of the protocols. We always recommend that you use other, more stable protocols if possible, but if you need to pick up (S)ftp files at some point we are very proud of our adapter, and it *does* represent the best possible solution for picking files from SFTP. Also note that (S)ftp is slow and not designed for en-masse transfer of files. Contact our integration experts for solutions to mitigate file transfer issues on large batches or severs with high traffic.
<br />
<br />
To address these limitations in the best way possible we have added the [batching adapter](#batching-adapter) which works on a performance-focused principle.
    </p>
</details>

## Batch and non-batching adapter

### Batching adapter

Because of the nature of (S)ftp described in the **limitations** section, the CX team decided to provide two types of (S)ftp communication. The first — and newest type — is the batching adapter which works on the same principles as the [batching transformation](/integrations/transformation/batching), which triggers on a set interval designated either by CRON or interval. The reason we implemented this new batching option is to address the performance concerns of the (S)ftp protocol by utilizing the least amount of connections while simultaneously enabling parallelization. Thus the batching type is orders of magnitude faster than its predecessor, while also using much fewer resources. Currently we only recommend enabling the batching type, but we will be enabling it by default in the near future.

The batching type (S)ftp adapter works by adding messages to a queue controlled by the CX engine which is then polled at the frequency of the set interval. If there are any messages in the queue the outbound part of CX will handle these messages in batches of up to 1000 files at the time and send them to the (S)ftp area configured for the integration. As such you will only be receiving a limited number of connections toward your server per batch. The actual of amount of connections is predicated on the parallelization utilized by the CX engine but should not exceed a single-digit number.

### Non-batching adapter

The non-batching adapter for (S)ftp is the legacy version of the adapter and should only be used in special circumstances. We have introduced extremely strict limits on the number of files you are able to send though this adapter type which may halt you integrations if they expect a certain performance from the CX system. The only real use-cases for the adapter is either the case where you are in need of continuous transfer where each file uses its own (S)ftp connection, this however, is an anti-pattern and shouldn't be used outside edge cases, or the case where you are utilizing the [synchronous CX pipeline](/integrations/synchronous). In the latter case you are forced to use non-batching as the the batching type is strictly asynchronous. Be aware however, that we have greatly limited the transfer rate on the outbound (S)ftp adapter while using synchronicity and the current limit is set at one request to our api every 10 seconds. There are currently no limits on the usual adapter transfer, but this might change in the near future.

:::caution Note
Transfer rate on the outbound (S)ftp adapter while using synchronicity is limited to one request every 10 seconds.
:::

## Configuring the FTP and SFTP adapters

To configure Connxio to start delivering your SFTP messages select the SFTP option in "Outbound Connections" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new adapter, a popup with the adapter's input fields will appear.
SFTP has 4 sections; Adapter name, Acknowledgement settings, Core settings and Advanced settings.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-sections-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:

### Operation

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sftp-operation-light.jpg'),
      dark: useBaseUrl('/img/docs/outbound/sftp-operation-dark.jpg#dark-only'),
    }}
  />
</div>

The SFTP adapter supports to types of operations when using the non-batching adapter; *upset* and *append*.

**Upsert** is the default operation and either creates a new file on the server or replaces an already existing one if the filenames collide.

**Append** creates a new file if one with the configured file-name doesn't exist or appends to the file if it does. Append adds the current payload to he end of the file without any breaks or extra characters, please ensure you add those as necessary - either by code component or by other means.

:::caution Warning
Append might not be allowed or configured for your SFTP server. If the server doesn't support append the file will be *overwritten* instead. The only way to know if append is supported is to contact the server administrator or run tests as needed.
:::

### Adaptername & Ack

- **Adapter Name**: The logical name of the adapter. This is shown in outbound adapter list in the subintegration view.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).

### Core Settings
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="sftp core"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sftp-core-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sftp-core-dark.webp#dark-only'),
    }}
  />
</div>

- **SFTP Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **SFTP Directory**: The directory to pickup files in. Must include a leading forward slash.

### Batch processing

This adapter support Batch Processing. Contrary to non-batch processing the batch processing pipeline batches messages before sending them to the receiver. This can be helpful in several scenarios. The actual usefulness and implementation varies from adapter to adapter.

For the (S)ftp adapter, Batch Processing is the act of batching messages before sending to minimize the amount of calls to the receiving server. Messages are handled as a single batch and inserted in one operation on one connection. This enables CX to transfer thousands, or even tens of thousands, of messages every minute instead of hundreds to (S)ftp servers.

By using the supplied values on the rest adapter in the **Batch Processing** section you can change the batching behavior.

#### How it works

Batching for the Sftp adapter works like this:

1. Message is processed through the CX pipeline as normal and arrives in a queue that corresponds to the adapter used.
2. The outbound engine scans the queue every time the *Cron Expression* hits and gets the amount of messages specified in the *Batch size* parameter, or less iof there aren't enough on the queue.
3. The messages are processed and sent as a single batch.
4. If a message fails it is not marked as failing and added to the failure handling system util the batch has finished. Be aware that exceptionally large and long lasting batches may time out.

#### Configuring Batch Processing

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="sftp advanced"
    sources={{
      light: useBaseUrl('/img/docs/outbound/rest-batch-processing-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/rest-batch-processing-dark.webp#dark-only'),
    }}
  />
</div>

- **Cron Expression**: Specifies the frequency at which the batching operation is triggered. Read more about the triggering interval [here](/integrations/triggering-interval).
- **Batch Size**: The size of a batch to get from the queue every interval.
- **Disable Failure Retry**: Toggles the retry. The batching will run on its normal schedule even on errors.
- **Retry on non-transient failures**: Retry on all errors, even those that are labeled as non-retryable.
- **Failure Retry Interval Seconds**: Sets the interval in seconds for retries after batching error. This overrides the Cron and Polling interval on an error. Minimum value is 60 seconds.

### Advanced settings

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="sftp advanced"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sftp-advanced-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sftp-advanced-dark.webp#dark-only'),
    }}
  />
</div>

- **Outbound Filename Pattern**: Uses Connxio Macro Language to generate file names, this is described in detail on the [Connxio Macro Language](/integrations/cxmal/connxio-macro-language) page.
- **Duplicate Detection**: Attempts to terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'

## Retry

Retry on all outbound adapters is currently handled by the backoff retry described on the [Retry page](/integrations/retry).
