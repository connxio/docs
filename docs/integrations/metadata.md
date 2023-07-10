---
title: Metadata
sidebar_position: 6
---

# Metadata in Connxio

In Connxio, metadata is an essential component attached to each message, providing additional contextual information about the message itself. The metadata object consists of various fields that help track and analyze the message as it flows through the integration pipeline. These metadata fields in Connxio offer valuable information and insights into the message flow, helping with troubleshooting, analysis, and monitoring of integrations. They enhance visibility and enable efficient handling of messages within the Connxio platform.

Below is a description of each field within the JSON structure of the metadata object:

| Field                  | Description                                                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------                                                   |
| configCorrelationId    | ID of the integration associated with the message, aiding in tracking and tracing related messages and processes.                                                      |
| transactionType        | The name of the integration associated with the message, providing additional context and categorization.                                                              |
| interchangeId          | Unique identifier for the interchange, facilitating tracking and identification of related messages within the flow.                                                   |
| started                | Timestamp when the pipeline in Connxio was started.                                                                                                                    |
| inboundFileName        | Name of the inbound file associated with the message, if applicable.                                                                                                   |
| inboundEndpoint        | Inbound endpoint associated with the message, representing the source or origin of the data.                                                                           |
| inboundAdapter         | Name of the inbound adapter associated with the message, such as SFTP, REST, or others.                                                                                |
| outboundFileName       | Name of the outbound file associated with the message, if applicable.                                                                                                  |
| outboundEndpoint       | Outbound endpoint associated with the message, indicating the target system or destination.                                                                            |
| outboundAdapter        | Name of the outbound adapter associated with the message, such as SFTP, REST, or others.                                                                               |
| outboundBlobName       | Name of the blob inside Connxio (CX) when handled in the outbound engine for debugging purposes. <br /> The format of the blob name is "interchangeId_&lt;subintegrationId&gt;.&lt;messageFormat&gt;"|
| transformationBlobName | Name of the blob inside Connxio (CX) during transformation processes. <br /> The format of the blob name is "interchangeId_&lt;subintegrationId&gt;.&lt;messageFormat&gt;"          |
| manualResendCount      | Number of times the message has been manually resent using the resend framework by the customer.                                                                       |
| dataCollection         | Data collected by the data collection feature, shortened if too long.                                                                                                  |
| userDefinedProperties  | Properties defined within code components for customization and flexibility.                                                                                           |


## Example metadata object
<br />
Here's an example JSON string representing a sample metadata object in Connxio:
<br />
<br />

```json
{
  "configCorrelationId": "a3be56f3-1a17-4d2e-a9e9-ddcbc1717892",
  "transactionType": "the transaction Type",
  "interchangeId": "977e63bf-0dac-4c31-aca5-4d59d8f5b43a",
  "started": "2023-07-10T15:36:43",
  "inboundFileName": "file.json",
  "inboundEndpoint": "Topic: example-topic - Subscription: example-subscription",
  "inboundAdapter": "ServiceBus",
  "outboundFileName": "file.xml",
  "outboundEndpoint": "example.com",
  "outboundAdapter": "REST",
  "outboundBlobName": "977e63bf-0dac-4c31-aca5-4d59d8f5b43a-6bfff3fd-3513-47e0-8a85-a0e1ddb75604.xml",
  "transformationBlobName": "977e63bf-0dac-4c31-aca5-4d59d8f5b43a-6bfff3fd-3513-47e0-8a85-a0e1ddb75604.json",
  "manualResendCount": null,
  "dataCollection": {},
  "userDefinedProperties": {}
}
```
