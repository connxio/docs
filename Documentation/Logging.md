# Logging

- [Logging](#logging)
  - [What does CX log?](#what-does-cx-log)
    - [Log-levels](#log-levels)
      - [None](#none)
      - [Minimum](#minimum)
      - [Standard](#standard)
      - [Verbose](#verbose)
  - [Statuses](#statuses)
  - [Contracts](#contracts)
    - [Archeo Contract](#archeo-contract)
  - [Internal contract](#internal-contract)
  - [Metadata](#metadata)
    - [Secondary content](#secondary-content)
      - [Archeo behavior](#archeo-behavior)
      - [Internal contract behavior](#internal-contract-behavior)
  - [How to start logging](#how-to-start-logging)
    - [Webhook](#webhook)
    - [Archeo](#archeo)
  - [External content](#external-content)
    - [Expected API behavior](#expected-api-behavior)
  - [To log or not to log?](#to-log-or-not-to-log)
    - [Is the traffic low enough and the contents important enough that we should log on success?](#is-the-traffic-low-enough-and-the-contents-important-enough-that-we-should-log-on-success)
    - [Is the message content important enough to include?](#is-the-message-content-important-enough-to-include)
    - [What level of logging is suited for this integration?](#what-level-of-logging-is-suited-for-this-integration)
  - [Logging outside CX](#logging-outside-cx)

ConnXio (CX) lets customers use a variety of different logging options, solutions and setups. Communicate Norge offers our transaction-based logging software [Archeo](https://www.archeo.no/) as a supplement to ConnXio, and since we develop both products, the compatibility and feature richness is enhanced with this combination. However, we also support sending logs via webhook, which allows for logging to the customers logging provider of choice. This page details how to set up logging and how logging is configured.

We also offer total *integration as a service* where we handle logging, support, surveillance and fault detection on behalf of our customers. Please contact our sales department at <support@communicate.no> for further information.

## What does CX log?

CX sends logs from the internal engine to the configured logging provider every time a message is processed through a CX integration defined by the CX integration configuration. What logs are sent by CX is configured for each integration in accordance with customer needs. These options are detailed [below](#how-to-start-logging).

### Log-levels

CX operates with the term *log-levels*. A log-level is a set of logs that together define a level of information about the integrations journey through CX. Each log-level **includes the logs and statuses from the less verbose layer**. The log-levels are as follows:

1. None - Nothing is logged except critical errors.
2. Minimum - The first inbound step and the last outbound step are logged.
3. Standard - All transformations are logged.
4. Verbose - All possible information is logged

#### None

The *None* log-level does not send any logs to the logging provider with a notable exception; if a logging provider is defined on the configuration and the *None* log-level is selected all critical errors are still logged. Since you could turn logging off just by not configuring a logging provider the *None* level lets you log only critical errors and nothing else. We would highly recommend always configuring a logging provider and setting this log level even if you don't want any regular logging for the integration, so that you can catch irregularities and patch them as needed.

**Statuses logged:**

- **Error**

#### Minimum

The *Minimum* log-level logs when the message is first seen by CX, this could be when the message is received by the API or picked from the chosen protocol like SFTP or Azure Storage. It also enables logs for the last time CX sees the message, this could be when the message is safely delivered to an SFTP folder or Service Bus topic. If you use the [Acknowledgement functionality](/Documentation/Adapters/Outbound/Acknowledgment.md), the acknowledgement message is also logged on this level.

**Statuses logged:**

- **Warnings** that pertain to retry and critical processes and transformations. Excludes warnings that re related to customer choice.
- **Success**
- **Terminated**

#### Standard

This level includes the less verbose levels but also adds all transformation steps. This includes but is not limited to data collection, code mapping, integration account mapping, file encoding, format conversion. This level is recommended for non-trivial integrations that don't generate a lot of traffic. Traffic concerns are addressed [here](#to-log-or-not-to-log).

**Statuses logged:** *No change from minimum level*

#### Verbose

The *Verbose* level logs every conceivable event of interest thorough CX. It could be seen as a debug level, and logs all transmission between internal CX engines, warning on retry or failed transient processes, initiation of external communication and more. This level is only recommended for debug purposes or for mission critical integrations.

**Statuses logged:** *Logs all statuses*

## Statuses

CX has a set of default statuses that correspond to the logging event context. We currently have the following statuses:

| Status | Description |
|---|---|
| Success | The event represents a success such as the message being received successfully in an adapter or transformed successfully in a code component |
| Warning | A failure has happened while executing the CX pipeline, but is non critical and the process is either continued or retried as described on the [retry page](/Documentation/Documentation/Retry.md). |
| Error | A failure has happened while executing the CX pipeline and the process has stopped. This can be cause by external services like enrichment endpoints, transformations or adapter targets, but can also be caused by internal faults in CX. Refer to the description to analyze and react to the error.|
| Terminated | The pipeline was terminated by the user. Either via [code components](/Documentation/Transformation/Code%20Components.md) of via [data collection](/Documentation/Transformation/Data%20Collection.md).|

> Attention! When using Archeo logging remember to add all these statuses to Archeo

## Contracts

CX provides users with a set of contracts to use when logging. A contract refers to the json model that defines the received event body. Currently we provide two contracts; Archeo and Internal. We would like to point out that it's entirely possible to use the Archeo contract even if you do not use the Archeo logging provider

### Archeo Contract

The Archeo contract looks like this, the value of the field describes what CX property is put in each field:

```json
{
  "transactionId": "interchangeId",
  "transactionType": "transactionType",
  "messageType": "custom type or the engine inside CX where the event originated ie. InboundInteractionEngine",
  "transactionTag": "custom transaction tag or empty",
  "processed": "0001-01-01T00:00:00", //The timestamp of the log being generated
  "sender": "sender",
  "receiver": "receiver",
  "description": "the custom description for outbound or inbound when applicable, the system message from CX when not",
  "fileName": "calculated by the internal CX system based upon the configured format",
  "status": "the status as described in the statuses section",
  "bodyContent": "the message content that has passed through the CX pipeline and undergone transformations",
  "metadata": "described under the metadata section"
}
```

## Internal contract

The internal contract is the internal format used by CX itself. This format has the conventional CX names for all properties and includes the maximum amount of information available at the time of event creation:

```json
{
  "interchangeId": "interchangeId for the current instance of the pipeline",
  "secondaryContent": "explained under the secondary content header",
  "fileName": "calculated by the internal CX system based upon the configured format",
  "logContentEncoding": "the encoding of the log content in text ie. utf-8",
  "status": "the status as explained in the status section",
  "message": "the description of the event or error represented by this event",
  "receiverId": "sender",
  "senderId": "Receiver",
  "eventFired": "0001-01-01T00:00:00", //The timestamp of the log being generated
  "customTag": "custom transaction tag or empty",
  "environment": "The cx environment the pipeline was run on",
  "eventOrigin": "the engine inside CX where the event originated ie. InboundInteractionEngine",
  "transactionType": "the transaction type",
  "order": "not used at the moment, but will denote the order of the action performed",
  "direction": "inbound until it hits the transformation engine outbound after",
  "logLevel": "the log level for the current log event",
  "metadata": "described under the metadata section",
  "useCustomDirectionalValues": false
}
```

## Metadata

When the pipeline instance is created within CX upon data entering through an adapter, a context is implicitly created with the message. This context is described on [the Metadata page](/Documentation/Metadata.md). Below we describe how you can influence logging by turning metadata on or off.

### Secondary content

Secondary content is data that is logged either as a replacement to the message content itself or beside it. Consider the following example; we send a message to the CX Api and CX accepts and starts processing said message. The message fails with an exception message but you, as a customer, have configured CX to log message content. Where do we put the exception message? We can't replace the message content because this may be critical for the debugging process, so we needed a secondary field, and we named it *secondary content*. We use secondary content exclusively for failures and exception messages. To be specific we have defined the following scenarios, dependant on the contract choice:

#### Archeo behavior

Refer to the [how to start logging](#how-to-start-logging) section for explanations for the properties mentioned in the scenarios below.

1. If message *content logging* is enabled but *metadata logging* is turned off we concatenate the exception message and the file-content into a single file. A concatenated file looks something like this:

```json
Information:
Null reference exception was handled while transforming message. Exception:
Stacktrace...

-----------------------

FileContent:
{
  "node":"content"
}

```

2. If message *content logging* is enabled and *metadata logging* is turned on we add the error message to the metadata object. You will find the file content in the content section of Archeo as usual and the error content will look like this in the metadata section:

```json
{
    "ConfigCorrelationId": "guid",
    "DataCollection": "{}",
    "ErrorMessage": "MessageHub.Models.Exceptions.NonTransientException: Failure example at ConnXio.TransformationEngine.Functions.Transformation.Mapping.Code.CodeTransformer.MapWithCode(CodeMappingProperties codeMappingProperties, Byte[] fileContent, String interchangeId, MetaData metaData) in D:\\a\\1\\s\\ConnXio.TransformationEngine\\Functions\\Transformation\\Mapping\\Code\\CodeTransformer.cs:line 186\r\n   at ConnXio.TransformationEngine.Functions.Transformation.Mapping.Code.CodeTransformer.Transform(Byte[] fileContent, Int32 index, IntegrationConfig integrationConfig, SubIntegration subIntegration, TransformationAction transformationAction, ConfigurationBasedSbMessage sbMsg, ILogEventHandler logEventHandler, Int32 deliveryCount, Int32 maxRetryCount) in D:\\a\\1\\s\\ConnXio.TransformationEngine\\Functions\\Transformation\\Mapping\\Code\\CodeTransformer.cs:line 44",
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

3. If message *content logging* is disabled and *metadata logging* is turned off the exception message is logged as the file content.

#### Internal contract behavior
  
## How to start logging

All logging providers are treated equally in relation to CX, and we do have a goal of adding provider specific convenience configuration for the largest providers in the future, currently however we only have a convenience configuration section for Archeo, but you can configure both Archeo and all other RESTful providers by selecting the Webhook configuration option.

All logging options require a [Security Configuration](/Documentation/Security/Security%20Configurations.md). Set this up by following the steps described on the Security Configuration page and select the definition as described below.

### Webhook

Use this option for all logging providers except Archeo. Logging is configured under the "Logging" section situated inside the "Integration Configuration Window":

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20menu.png?sv=2020-08-04&st=2021-11-16T12%3A21%3A06Z&se=2040-11-17T12%3A21%3A00Z&sr=b&sp=r&sig=dXMd8Mn%2FuZPVXVEQDHHd3T9CckwWyN45qH%2B%2FPQqxdTo%3D)

Expand this section and click the "Add Logging" button to add a new webhook. Events will be duplicated across all configured webhooks, but will respect the individual configuration for each logging instance like "Log Level" or "Custom Description". Configure the webhook with the required parameters like so:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20configuration%20webhook.png?sv=2020-08-04&st=2021-11-16T12%3A28%3A39Z&se=2040-11-17T12%3A28%3A00Z&sr=b&sp=r&sig=lbkqEtWro1lQ8EFTauAk%2FD3gXiOCHQDkCq6tcjDcfqk%3D)

- **Method**: The Http verb (or method as its properly called) to use when contacting the restful endpoint.
- **Endpoint Url**: The url of the endpoint.
- **Security Configuration**: The [security configuration](/Documentation/Security/Security%20Configurations.md) to use for authenticating the request.
- **Log Level**: Explained in the [Log Levels section](#log-levels).
- **Contract**: Is explained under the [Contracts section](#contracts).
- **Inbound message type**: Changes the message type for the first success message logged.
- **Outbound message type**: Changes the message type for the last success message logged.
- **Custom Inbound Description**: Changes the description for the first success message logged.
- **Custom Outbound Description**: Changes the description for the last success message logged.
- **Transaction Tag**: Adds content to the `customTag` property.
- **Log Metadata**: Enables logging of metadata when switched on. Read more under [Metadata](#metadata).
- **Log Message Content**: Enables logging of message content when switched on. Read more under [Secondary Content](#secondary-content).
- **Enabled**: Turns off this instance of the log event handler. No logs will be sent *at all* with this setting switched off.

### Archeo

Use this convenience option if you want to send logs generated by CX to Archeo. This requires an [active Archeo subscription](https://www.archeo.no/pricing) that is scaled to handle the amount of logs sent from CX (see [To log or not to log?](#to-log-or-not-to-log) for more information).

Logging is configured under the "Logging" section situated inside the "Integration Configuration Window":

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20menu.png?sv=2020-08-04&st=2021-11-16T12%3A21%3A06Z&se=2040-11-17T12%3A21%3A00Z&sr=b&sp=r&sig=dXMd8Mn%2FuZPVXVEQDHHd3T9CckwWyN45qH%2B%2FPQqxdTo%3D)

Expand this section and click the "Add Logging" button to add a new webhook. Events will be duplicated across all configured webhooks, but will respect the individual configuration for each logging instance like "Log Level" or "Custom Description". Configure the webhook with the required parameters like so:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20archeo%20configuration.png?sv=2020-08-04&st=2021-11-17T13%3A06%3A59Z&se=2040-11-18T13%3A06%3A00Z&sr=b&sp=r&sig=R6XMLyqkAbXDiyohCttjyrAx2Abxi6re9ayY3ARNH9E%3D)

- **Archeo Security Configuration**: The [security configuration](/Security/Security%20Configurations.md) to use for authenticating the request to Archeo.
- **Log Level**: Explained in the [Log Levels section](#log-levels).
- **Contract**: Is explained under the [Contracts section](#contracts).
- **Inbound message type**: Changes the message type for the first success message logged.
- **Outbound message type**: Changes the message type for the last success message logged.
- **Custom Inbound Description**: Changes the description for the first success message logged.
- **Custom Outbound Description**: Changes the description for the last success message logged.
- **Transaction Tag**: Adds content to the `customTag` property.
- **Log Metadata**: Enables logging of metadata when switched on. Read more under [Metadata](#metadata).
- **Log Message Content**: Enables logging of message content when switched on. Read more under [Secondary Content](#secondary-content).
- **Enabled**: Turns off this instance of the log event handler. No logs will be sent *at all* with this setting switched off.

The example above uses the minimum viable settings to set up Archeo logging. Feel free to fill in all fields for your logging config.

## External content

Archeo allows customers to host message content externally. CX has incorporated this process and has implemented a webhook interface which lets a customer receive the logged message content from CX and return a Uri to the content storage location. To start using this functionality, first enable the "Log Message Content" option, a new option to log content externally will then become visible as you see below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20external%20content.png?sv=2020-10-02&st=2022-03-23T11%3A00%3A16Z&se=2040-03-24T11%3A00%3A00Z&sr=b&sp=r&sig=CJRRtxmH%2FxXKfs%2BF2DK0kscGa4us1gUWgOEYKklGbHc%3D)

- **Method**: The Http verb (or method as its properly called) to use when contacting the restful endpoint.
- **Endpoint Url**: The url of the endpoint.
- **Security Configuration**: The [security configuration](/Documentation/Security/Security%20Configurations.md) to use for authenticating the request.
- **Add Header**: Adds a header to every request handled by this webhook.
- **Send content on External Failure**: If enabled the option will cause CX to send the file content to Archeo if the external service fails. If disabled no content will be sent on external service failure.

### Expected API behavior

CX sends the file content in the body of the configured HTTP request and expects a json object containing the uri as a response:

```csharp
{
  "uri":"https://mynewlygeneratedsasuri.com"
}
```

## To log or not to log?

Deciding when to log is paramount for being able to monitor integrations successfully. In this section we take a look at some questions you should be asking yourself when configuring logging in CX. First of all: logging is expensive. Many systems including the ones created by us have significant costs associated with logging, and generally one of the most effective ways of cost reduction within software development is the optimization of logging. As such we strongly recommend that all customers go through each production ready integration and ask themselves three questions:

### Is the traffic low enough and the contents important enough that we should log on success?

Depending on the log provider the cost of thousands or even millions of messages could be low but chances are they aren't. If you integration processes more than ten thousand messages per day (this includes splitting) you should probably not log on a log-level other than *None* without a very good reason, and while being aware of the cost.

### Is the message content important enough to include?

As seen above you can exclude the actual message content from all logs. In a lot of cases the [metadata](/Documentation/Metadata.md) that is the log event itself is enough to monitor integration flows. Think carefully before you log the actual content.

### What level of logging is suited for this integration?

This really depends on the criticality of the integration itself, the potential for failure, the consequences of failure and a lot of other parameters. The answer here is never simple but could be critical to keeping logging costs down. We recommend that you go through each and every integration with a critical eye towards logging amount after deploying to production but also after the integration has been running for a while. In this way you can evaluate and re-configure logging as needed.

## Logging outside CX

In many cases there is integration being done either before of after a message is passed of to CX for processing. We recommend tying these actions into the CX flow with you own logging, in this way you get a complete picture of the actual actions involved in you integration. This is very easy with Archeo, and should be possible with most third party providers as well. When setting this up you need to use your InterchangeId to pair your internal logs with CX's generated log events. See more about InterchangeId [here](/Documentation/Core%20Concepts.md).
