---
title: "FTP/SFTP"
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# FTP and SFTP

The FTP and SFTP actions send message content as files to a server. The settings below apply to both FTP and SFTP unless otherwise specified.

## Configure the action

Add an FTP or SFTP action to your integration and configure the destination directory and file name. Enable batch processing to queue files and deliver them on a schedule with fewer server connections.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
  {
    name: "Security configuration",
    description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your FTP or SFTP server. Use <strong>+</strong> to create a configuration.</>,
  },
  {
    name: "Directory",
    description: "Required. The destination directory on the server. Include a leading forward slash.",
    example: "/my/directory",
  },
]} />

## SFTP settings

The same file settings are available under **FTP settings** for an FTP action.

<PropertyReference properties={[
  {
    name: "File name",
    description: <>The name of the file to write. Use <Link to="/cxmal/connxio-macro-language/">CxMaL</Link> macros to build a dynamic file name from message content or metadata.</>,
    example: "{filename}",
  },
]} />

## Batch processing

<PropertyReference properties={[
  {
    name: "Batch processing",
    description: "Enable to queue files and deliver them in batches on a schedule. This reduces the number of connections to the receiving server. When disabled, files are sent individually using a separate connection for each file.",
  },
]} />

Batch processing sends each message as a separate file. To combine messages into one file, use a [Batching action](./batching.md) before delivery.

### Batch interval

With **Batch processing** enabled, use a cron expression to choose when Connxio delivers queued files. For example, `*/5 * * * *` runs every five minutes.

See [Triggering Interval](../integrations/triggering-interval.md) for cron syntax and more examples.

### Batch settings

The following settings apply when **Batch processing** is enabled.

<PropertyReference properties={[
  {
    name: "Batch size",
    description: "The maximum number of files to retrieve from the queue for each batch. A batch contains fewer files if fewer are waiting. Batches support up to 1,000 files.",
    example: "100",
  },
  {
    name: "Disable failure retry",
    description: "Enable to disable the separate failure retry schedule. Batch processing continues on its normal schedule even after errors.",
  },
  {
    name: "Retry on non-transient failures",
    description: "Enable to retry all errors, including failures normally classified as non-retryable.",
  },
  {
    name: "Failure retry interval (seconds)",
    description: "The interval between retries after a batch error, in seconds. This replaces the normal batch schedule during failure retries. The minimum value is 60 seconds.",
    example: "60",
  },
]} />

Connxio retrieves queued files at the configured interval and delivers them as a batch. Failed files are added to failure handling after the batch finishes. Very large or long-running batches can time out; choose a batch size suited to the server's capacity.

## Duplicate detection

<ActionDuplicateDetection />

## Non-batch operations

For non-batch configurations that expose an operation setting, the supported operations are:

<PropertyReference properties={[
  {
    name: "Upsert",
    description: "The default operation. Creates a file or replaces an existing file with the same name.",
  },
  {
    name: "Append",
    description: "Creates a file if it does not exist, or adds the current payload to the end of an existing file. No line breaks or other separators are added automatically; include them in the content if needed.",
  },
]} />

:::caution Append support
If the server does not support append, the file can be overwritten instead. Confirm support with the server administrator or test the behavior before using append.
:::

## Retry

FTP and SFTP delivery uses backoff retry. When batch processing is enabled, its failure retry settings control the batch retry schedule. See [Retry](../integrations/retry.md) for retry configuration and message failure handling.

## Limitations

FTP and SFTP servers can interrupt connections or reject new connections when traffic exceeds their capacity. Use batch processing to reduce connection overhead, and configure the batch size and interval to suit the server.

Batch processing is asynchronous. For the [synchronous API pipeline](../triggers/api.mdx#synchronous-communication), disable batch processing. Synchronous FTP/SFTP delivery is limited to one API request every 10 seconds.
