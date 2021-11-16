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
  - [How to start logging](#how-to-start-logging)
    - [Webhook](#webhook)
    - [Archeo (Needs work)](#archeo-needs-work)
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

The *Minimum* log-level logs when the message is first seen by CX, this could be when the message is received by the API or picked from the chosen protocol like SFTP or Azure Storage. It also enables logs for the last time CX sees the message, this could be when the message is safely delivered to an SFTP folder or Service Bus topic. If you use the [Acknowledgement functionality](/Adapters/Outbound/Acknowledgment.md), the acknowledgement message is also logged on this level.

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
| Warning | A failure has happened while executing the CX pipeline, but is non critical and the process is either continued or retried as described on the [retry page](/Retry.md). |
| Error | A failure has happened while executing the CX pipeline and the process has stopped. This can be cause by external services like enrichment endpoints, transformations or adapter targets, but can also be caused by internal faults in CX. Refer to the description to analyze and react to the error.|
| Terminated | The pipeline was terminated by the user. Either via [code components](/Transformation/Code%20Components.md) of via [data collection](/Transformation/Data%20Collection.md).|

## Contracts

CX provides users with a set of contracts to use when logging. A contract refers to the json model that defines the received event body. Currently we provide two contracts; Archeo and Internal.

### Archeo Contract

The Archeo contract looks like this, the value of the field describes what CX property is put in each field:

```json
{
  "transactionId": "interchangeId",
  "transactionType": "transactionType",
  "messageType": "custom type or the engine in CX where the event originated ie. InboundInteractionEngine",
  "transactionTag": "custom transaction tag or empty",
  "processed": "0001-01-01T00:00:00", //The timestamp of the log being generated
  "sender": "sender",
  "receiver": "receiver",
  "description": "the custom description for outbound or inbound when applicable, the system message from CX when not",
  "fileName": "the filename supplied with the file on CX pipeline entry",
  "status": "the status as described in the statuses section",
  "bodyContent": "the message content that has passed through the CX pipeline and undergone transformations",
  "metadata": "described under the metadata section"
}
```

## Internal contract

`needs descriptions of fields`
The internal contract is the internal format used by CX itself. This format has the conventional CX names for all properties and includes the maximum amount of information available at the time of event creation:

```json
{
  "interchangeId": null,
  "eventContent": null,
  "eventContentUri": null,
  "secondaryContent": null,
  "fileName": null,
  "logContentEncoding": null,
  "status": null,
  "message": null,
  "receiverId": null,
  "senderId": null,
  "eventFired": "0001-01-01T00:00:00",
  "customTag": null,
  "environment": null,
  "eventOrigin": null,
  "transactionType": null,
  "order": null,
  "direction": null,
  "logLevel": null,
  "metadata": {
    "userDefinedProperties": null,
    "outboundEndpoint": null,
    "outboundAdapter": null,
    "inboundEndpoint": null,
    "inboundAdapter": null,
    "outboundBlobName": null,
    "transformationBlobName": null,
    "configCorrelationId": null,
    "manualResendCount": 0,
    "dataCollection": null,
    "started": "0001-01-01T00:00:00",
    "outboundFileName": null,
    "inboundFileName": null,
    "interchangeId": null,
    "transactionType": null
  },
  "useCustomDirectionalValues": false
}
```

## Metadata

`needs work`

- Describe secondary content
- Describe error going to metadata when file content is logged and metadata is on
- Describe error concatenation when metadata is off and file is on
  
## How to start logging

All logging providers are treated equally in relation to CX, and we do have a goal of adding provider specific convenience configuration for the largest providers in the future, currently however we only have a convenience configuration section for Archeo, but you can configure both Archeo and all other RESTful providers by selecting the Webhook configuration option.

All logging options require a [Security Configuration](/Security/Security%20Configurations.md). Set this up by following the steps described on the Security Configuration page and select the definition as described below.

### Webhook

`Needs work`
Use this option for all logging providers except Archeo. Logging is configured under the "Logging" section situated inside the "Integration Configuration Window":

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20menu.png?sv=2020-08-04&st=2021-11-16T12%3A21%3A06Z&se=2040-11-17T12%3A21%3A00Z&sr=b&sp=r&sig=dXMd8Mn%2FuZPVXVEQDHHd3T9CckwWyN45qH%2B%2FPQqxdTo%3D)

Expand this section and click the "Add Logging" button to add a new webhook. Events will be duplicated across all configured webhooks, but will respect the individual configuration for each logging instance like "Log Level" or "Custom Description". Configure the webhook with the required parameters like so:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20configuration%20webhook.png?sv=2020-08-04&st=2021-11-16T12%3A28%3A39Z&se=2040-11-17T12%3A28%3A00Z&sr=b&sp=r&sig=lbkqEtWro1lQ8EFTauAk%2FD3gXiOCHQDkCq6tcjDcfqk%3D)

- **Method**: The Http verb (or method as its properly called) to use when contacting the restful endpoint.
- **Endpoint Url**: The url of the endpoint.
- **Security Configuration**: The [security configuration](/Security/Security%20Configurations.md) to use for authenticating the request.
- **Log Level**: Explained in the [Log Levels section](#log-levels).
- Contract:

### Archeo (Needs work)

Use this convenience option if you want to send logs generated by CX to Archeo. This requires an [active Archeo subscription](https://www.archeo.no/pricing) that supports the amount of logs sent from CX.

## To log or not to log?

Deciding when to log is paramount for being able to monitor integrations successfully. In this section we take a look at some questions you should be asking yourself when configuring logging in CX. First of all: logging is expensive. Many systems including the ones created by us have significant costs associated with logging, and generally one of the most effective ways of cost reduction within software development is the optimization of logging. As such we strongly recommend that all customers go through each production ready integration and ask themselves three questions:

### Is the traffic low enough and the contents important enough that we should log on success?

Depending on the log provider the cost of thousands or even millions of messages could be low but chances are they aren't. If you integration processes more than ten thousand messages per day (this includes splitting) you should probably not log on a log-level other than *None* without a very good reason, and while being aware of the cost.

### Is the message content important enough to include?

As seen above you can exclude the actual message content from all logs. In a lot of cases the [metadata](/Metadata.md) that is the log event itself is enough to monitor integration flows. Think carefully before you log the actual content.

### What level of logging is suited for this integration?

This really depends on the criticality of the integration itself, the potential for failure, the consequences of failure and a lot of other parameters. The answer here is never simple but could be critical to keeping logging costs down. We recommend that you go through each and every integration with a critical eye towards logging amount after deploying to production but also after the integration has been running for a while. In this way you can evaluate and re-configure logging as needed.

## Logging outside CX

In many cases there is integration being done either before of after a message is passed of to CX for processing. We recommend tying these actions into the CX flow with you own logging, in this way you get a complete picture of the actual actions involved in you integration. This is very easy with Archeo, and should be possible with most third party providers as well. When setting this up you need to use your InterchangeId to pair your internal logs with CX's generated log events. See more about InterchangeId [here](/Core%20Concepts.md).
