---
sidebar_position: 6
---

import PropertyReference from '@site/src/components/PropertyReference';

# Logging

Send integration events to Archeo or a webhook to monitor message processing and investigate failures. Each logging configuration controls its destination, log level, message content, metadata, and custom descriptions.

## Configure logging {#how-to-start-logging}

1. Open the integration's **Logging** section and select **Add Logging**.
2. Choose **Archeo** or **Webhook** and configure the destination below.
3. Choose a **Log level** and whether to log message content and metadata.
4. Configure external content storage and logging overrides if needed.
5. Turn on **Enabled** and select **Save**.

Events are sent to each enabled logging configuration according to its own settings.

### Archeo

Choose **Archeo** to send events to Archeo using an [Archeo security configuration](./security-configurations/archeo.md).

<PropertyReference properties={[
  {
    name: 'Security configuration',
    description: 'Select the security configuration for the Archeo destination. Use + to create a configuration.',
  },
]} />

### Webhook

Choose **Webhook** to send events to an HTTP endpoint. This can be another logging provider or an endpoint that accepts the Archeo contract.

<PropertyReference idPrefix="webhook" properties={[
  {
    name: 'Method',
    description: 'The HTTP method used to send log events to the endpoint.',
    example: 'POST',
  },
  {
    name: 'URL',
    description: 'Required. The endpoint that receives the log events.',
    example: 'https://example.com/logs',
  },
  {
    name: 'Authorization',
    description: 'Select a security configuration to authenticate requests when required by the endpoint. Use + to create one.',
  },
  {
    name: 'Headers',
    description: 'Additional HTTP headers to include with requests to the logging endpoint.',
  },
  {
    name: 'Contract',
    description: 'Choose Archeo or Internal to select the JSON structure of each log event.',
  },
]} />

See [HTTP security configurations](./security-configurations/http.md) for authentication and [Contracts](#contracts) for event formats.

### Common settings

These settings control what each logging configuration sends.

<PropertyReference properties={[
  {
    name: 'Log level',
    description: 'Controls which processing events are logged. Choose Error, Minimum, Standard, or Verbose.',
  },
  {
    name: 'Log message content',
    description: 'Include message content in logs. Enable this to make the external content option available.',
  },
  {
    name: 'Use external content',
    description: 'Send message content to an external storage endpoint that returns a URI, instead of including the content directly in the log.',
  },
  {
    name: 'Log metadata',
    description: 'Include the message context and metadata in log events.',
  },
  {
    name: 'Enabled',
    description: 'Enable this logging configuration. When disabled, it sends no logs.',
  },
]} />

See [Log levels](#log-levels), [Metadata](#metadata), and [External content](#external-content) for details.

### Logging overrides

Expand **Logging overrides** to customize message types, descriptions, and the transaction tag.

<PropertyReference properties={[
  {
    name: 'Inbound message type',
    description: 'Override the message type for the first success event logged.',
  },
  {
    name: 'Outbound message type',
    description: 'Override the message type for the last success event logged.',
  },
  {
    name: 'Custom inbound description',
    description: 'Override the description for the first success event logged.',
  },
  {
    name: 'Custom outbound description',
    description: 'Override the description for the last success event logged.',
  },
  {
    name: 'Transaction tag',
    description: 'A custom tag included as transactionTag in the Archeo contract or customTag in the Internal contract.',
  },
]} />

## External content

Enable **Log message content**, then **Use external content** to store content through an external endpoint. Connxio sends the message content to that endpoint, which returns the URI where it can be accessed.

<PropertyReference idPrefix="external-content" properties={[
  {
    name: 'Method',
    description: 'The HTTP method used to send message content to the external endpoint.',
    example: 'POST',
  },
  {
    name: 'URL',
    description: 'Required. The external endpoint that receives the message content and returns its storage URI.',
    example: 'https://example.com/log-content',
  },
  {
    name: 'Authorization',
    description: 'Select the security configuration used to authenticate requests to the external endpoint. Use + to create one.',
  },
  {
    name: 'Headers',
    description: 'Additional HTTP headers sent with each request to the external endpoint.',
  },
  {
    name: 'Send content on external failure',
    description: 'When enabled, send the file content to Archeo if the external service fails. When disabled, no content is sent on an external service failure.',
  },
]} />

### Expected API behavior

The external endpoint receives file content in the HTTP request body and must return a JSON object containing its URI:

```json
{
  "uri": "https://example.com/stored-content/message.json"
}
```

## What does Connxio log?

Connxio sends logs from the internal engine to the configured provider whenever a message is processed through an integration. You choose what to log per integration, based on your needs. See [Configure logging](#how-to-start-logging).

### Log levels {#log-levels}

Connxio uses _log-levels_ to control how much information is logged about a message's journey. Each level **includes the logs and statuses from less verbose levels**.

1. Error - Nothing is logged except critical errors.
2. Minimum - The first inbound step and the last outbound step are logged.
3. Standard - All transformations are logged.
4. Verbose - All possible information is logged.

#### Error

The _Error_ level logs only critical errors. We recommend configuring a logging provider and using this level even when you do not want regular logging, so you can still detect and fix failures.

**Statuses logged:**

- **Error**

#### Minimum

The _Minimum_ level logs the first and last time Connxio sees a message, such as when it is received by the API or picked up from SFTP or Azure Storage, and when it is delivered to SFTP or a Service Bus topic. If you use [ACK functionality](./acknowledgment.md), the ACK message is also logged.

**Statuses logged:**

- **Warnings** for retries and critical processes or transformations. Excludes warnings related to customer choice.
- **Success**
- **Terminated**

#### Standard

The _Standard_ level adds transformation steps, including data collection, code mapping, integration account mapping, file encoding, and format conversion. Use this for non-trivial integrations with moderate traffic. See [To log or not to log?](#to-log-or-not-to-log).

**Statuses logged:** _No change from minimum level_

#### Verbose

The _Verbose_ level logs every event of interest through Connxio, including internal engine transmissions, retry warnings, transient failures, and external communication. Use it for debugging or mission-critical integrations.

**Statuses logged:** _Logs all statuses_

## Statuses

Connxio uses these default statuses:

| Status     | Description                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Success    | The event completed successfully, such as a message received by an adapter or transformed by a code component.                                                                   |
| Warning    | A non-critical failure occurred, and the process continued or retried as described on the [retry page](./retry.md).                                                              |
| Error      | A failure stopped the pipeline. This can be caused by external services, transformations, adapter targets, or internal Connxio faults. Use the description to analyze the error. |
| Terminated | The user terminated the pipeline through [code components](./code-components.md#termination) or [scripts](../actions/script.md).                                                 |

When using Archeo, add these statuses to the Archeo configuration.

## Contracts

Connxio provides two logging contracts: Archeo and Internal. A contract is the JSON model for the event body. You can use the Archeo contract even when you do not use Archeo as the logging provider.

### Archeo contract

The following field guide describes the Archeo contract. The `processed` field contains the timestamp when the log was generated:

```json
{
  "transactionId": "interchangeId",
  "transactionType": "transactionType",
  "messageType": "custom type or the engine inside Connxio where the event originated ie. InboundInteractionEngine",
  "transactionTag": "custom transaction tag or empty",
  "processed": "2026-09-28T12:00:00Z",
  "sender": "sender",
  "receiver": "receiver",
  "description": "the custom description for outbound or inbound when applicable, the system message from Connxio when not",
  "fileName": "calculated by the internal Connxio system based upon the configured format",
  "status": "the status as described in the statuses section",
  "bodyContent": "the message content that has passed through the Connxio pipeline and undergone transformations",
  "metadata": "described under the metadata section"
}
```

### Internal contract

The Internal contract uses Connxio's own property names. The following field guide describes its contents; `eventFired` is the timestamp when the log was generated:

```json
{
  "interchangeId": "interchangeId for the current instance of the pipeline",
  "secondaryContent": "explained under the secondary content header",
  "fileName": "calculated by the internal Connxio system based upon the configured format",
  "logContentEncoding": "the encoding of the log content in text ie. utf-8",
  "status": "the status as explained in the status section",
  "message": "the description of the event or error represented by this event",
  "receiverId": "receiver",
  "senderId": "sender",
  "eventFired": "2026-09-28T12:00:00Z",
  "customTag": "custom transaction tag or empty",
  "environment": "The Connxio environment the pipeline was run on",
  "eventOrigin": "the engine inside Connxio where the event originated ie. InboundInteractionEngine",
  "transactionType": "the transaction type",
  "order": "not used at the moment, but will denote the order of the action performed",
  "direction": "inbound until it hits the transformation engine outbound after",
  "logLevel": "the log level for the current log event",
  "metadata": "described under the metadata section",
  "useCustomDirectionalValues": false
}
```

## Metadata

When data enters through an adapter, Connxio creates a pipeline instance with message context. This context is described on [the Metadata page](./metadata.md). You can control whether metadata is logged.

### Secondary content

Secondary content stores failure or exception details when message content must also be preserved. For example, if Connxio logs message content and the message fails during processing, the exception message is logged as secondary content instead of replacing the original message.

#### Archeo behavior

See [Configure logging](#how-to-start-logging) for the properties used below.

1. If _content logging_ is enabled and _metadata logging_ is off, Connxio concatenates the exception message and file content:

```text
Information:
Null reference exception was handled while transforming message. Exception:
Stacktrace...

-----------------------

FileContent:
{
  "node":"content"
}

```

2. If _content logging_ and _metadata logging_ are enabled, Connxio adds the error message to the metadata object. The file content remains in the Archeo content section:

```json
{
  "ConfigCorrelationId": "guid",
  "DataCollection": "{}",
  "ErrorMessage": "MessageHub.Models.Exceptions.NonTransientException: Failure example at Connxio.TransformationEngine.Functions.Transformation.Mapping.Code.CodeTransformer.MapWithCode(CodeMappingProperties codeMappingProperties, Byte[] fileContent, String interchangeId, MetaData metaData) in D:\\a\\1\\s\\Connxio.TransformationEngine\\Functions\\Transformation\\Mapping\\Code\\CodeTransformer.cs:line 186\r\n   at Connxio.TransformationEngine.Functions.Transformation.Mapping.Code.CodeTransformer.Transform(Byte[] fileContent, Int32 index, IntegrationConfig integrationConfig, SubIntegration subIntegration, TransformationAction transformationAction, ConfigurationBasedSbMessage sbMsg, ILogEventHandler logEventHandler, Int32 deliveryCount, Int32 maxRetryCount) in D:\\a\\1\\s\\Connxio.TransformationEngine\\Functions\\Transformation\\Mapping\\Code\\CodeTransformer.cs:line 44",
  "InboundAdapter": "SFTP",
  "InboundFileName": "filename.txt",
  "InterchangeId": "guid",
  "ManualResendCount": "0",
  "Started": "11/11/2021 2:42:38 PM",
  "TransactionType": "Account",
  "TransformationBlobName": "guid.txt",
  "UserDefinedProperties": "{}"
}
```

3. If _content logging_ and _metadata logging_ are disabled, Connxio logs the exception message as file content.

## Choose what to log {#to-log-or-not-to-log}

Choose logging settings based on what you need to monitor and troubleshoot. Consider the integration's traffic, the importance of confirming delivery, and the amount of data your logging provider will store.

### Choose a log level

- **Error** records critical failures when you do not need a record of successful processing.
- **Minimum** adds receipt and delivery events when you need to track whether messages reached their destination.
- **Standard** includes transformation steps when you need to follow how a message changes through the integration.
- **Verbose** provides more detail for investigating problems. Review the setting after the investigation to avoid retaining unnecessary events.

See [Log levels](#log-levels) for the events and statuses included at each level.

### Decide whether to include content

Start with the event details and [metadata](./metadata.md). Enable **Log message content** when you need the payload to investigate failures or understand a transformation's result. Consider the size and sensitivity of the content before including it in logs.

If content needs to be stored separately, configure [external content](#external-content). Review **Send content on external failure** so the fallback behavior matches where you intend to store that content.

### Review log volume

One message can produce several log events, especially when it passes through multiple transformations or is split into several messages. Each enabled logging configuration receives events according to its own settings.

Check actual log volume and storage usage after deployment. Adjust the log level and content settings to keep the information you use, and review them again when traffic or the integration changes.

## Logging outside Connxio

In many cases, integration work happens before or after Connxio processing. Add your own logging around those steps to get a complete picture of the flow. Use the `InterchangeId` to connect your internal logs with Connxio's generated log events.
