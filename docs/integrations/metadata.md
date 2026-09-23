---
title: Metadata
sidebar_position: 7
---

import PropertyReference from '@site/src/components/PropertyReference';

# Metadata in Connxio

In Connxio, metadata is an essential component attached to each message, providing additional contextual information about the message itself. The metadata object consists of various fields that help track and analyze the message as it flows through the integration pipeline. These metadata fields in Connxio offer valuable information and insights into the message flow, helping with troubleshooting, analysis, and monitoring of integrations. They enhance visibility and enable efficient handling of messages within the Connxio platform.

## Metadata properties

<PropertyReference properties={[
{name: 'configCorrelationId', description: 'ID of the integration associated with the message.'},
{name: 'transactionType', description: 'Name of the integration associated with the message.'},
{name: 'interchangeId', description: 'Unique identifier for the interchange, used to track related messages.'},
{name: 'started', description: 'Timestamp when the Connxio pipeline started.', example: '2023-07-10T15:36:43'},
{name: 'inboundFileName', description: 'Name of the inbound file, if applicable.', example: 'file.json'},
{name: 'inboundEndpoint', description: 'Source endpoint associated with the message.', example: 'Topic: example-topic - Subscription: example-subscription'},
{name: 'inboundAdapter', description: 'Inbound adapter associated with the message, such as SFTP or REST.', example: 'ServiceBus'},
{name: 'outboundBlobName', description: 'Name of the internal blob used for debugging in the outbound engine.', format: 'interchangeId_<subintegrationId>.<messageFormat>'},
{name: 'transformationBlobName', description: 'Name of the internal blob used during transformation.', format: 'interchangeId_<subintegrationId>.<messageFormat>'},
{name: 'manualResendCount', description: 'Number of times the customer has manually resent the message using the resend framework.'},
{name: 'dataCollection', description: 'Data gathered by the data collection feature, shortened if too long.'},
{name: 'userDefinedProperties', description: 'Custom properties defined within code components.'},
]} />

## Example metadata object

Here's an example metadata object in Connxio:

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
