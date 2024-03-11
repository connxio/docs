---
title: Synchronous
sidebar_position: 7
---

# Synchronous Communication


Connxio provides an option for synchronous communication through its API. We included this for multiple reasons, some of which relate to execution flows within systems. We wanted to facilitate communication with systems on the outbound connection, and because it can often make sense to wait for a response and do something with the data when the operation is completed.

## Configuring the Adapter

To use the synchronous functionality, set up a regular [API Inbound Adapter](/integrations/adapters/inbound/api.mdx) and toggle the *Use Synchronous Communication* option.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '800px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/synchronous-api-toggle-light.webp'),
      dark: useBaseUrl('/img/docs/synchronous-api-toggle-dark.webp#dark-only'),
    }}
  />
</div>

## Usage

When utilizing the synchronous option, a few things differ from the other adapters. The messages are sent through the Http-protocol, so Connxio's resending functionality is not available, and there is minimal logging on the message pipeline. The response object covers some of these responsibilities. Any errors or exceptions encountered during message passing, will be recorded in the response for error-handling and troubleshooting purposes. When there is a *REST Outbound Adapter* on the subintegration(s), it is possible to retrieve response data and e.g. continue an execution flow. There is a message response-object for each subintegration on your integration. When a subintegration does a splitting operation or has multiple outbound adapters, each operation will be returned within the message response object of that subintegration. E.g. a subintegration with a splitting operation and 3 outbound adapters will return 3 results per split. So a list of 10 objects will split into 10 messages, each returning 3 outbound responses, resulting in 30 returned operations within the message response-object.

The synchronous API does not support batching transformations or messages sent to the */batch* endpoint.


## Interaction NuGet

The Interaction NuGet can be easily implemented to use the Synchronous functionality of Connxio when working with C#/.NET.

For a more detailed explanation of using the Interaction Nuget: [Click here](/interaction/nuget/connxio-api.md)

The Interaction NuGet contains options for wrapping and sending messages, and already contains a class that reflects the returned values from the Synchronous API. The returned object can look as follows:

```json
[
  {
    "subIntegrationName": "",
    "totalResponses": 1,
    "synchronousMessageResponses": [
      {
        "metaData": {
          "interchangeId": "guid",
          "inboundFileName": "string",
          "inboundFilePath": "string",
          "outboundFileName": "string",
          "started": "2024-03-07T09:42:27.6629322Z",
          "dataCollection": {},
          "userDefinedProperties": {},
          "inboundMessageMetaData": null,
          "configCorrelatioId": "<yourConfigurationId>",
          "transformationBlobName": null,
          "outboundBlobName": "<interchangeId>_<subintegrationId>_<outboundAdapterId>.<messageOutboundFormat>",
          "inboundAdapter": "Api",
          "inboundEndpoint": null,
          "outboundAdapter": "Discard",
          "outboundEndpoint": "The eternal void",
          "transactionType": "SynchronousExample",
          "manualResendCount": 0,
          "outboundRestResponse": "Response from an outbound endpoint (REST Outbound)",
          "isTestRun": false,
          "isLoadTest": false,
          "useSynchronousCommunication": true,
          "testRunId": null
        },
        "errorMessage": null,
        "messageErrorCode": null,
        "stackTrace": null,
        "transientError": null,
        "origin": null
      }
    ],
    "errors": null
  }
]
```

Note that there are two seperate outputs for errors. The second "errors" field reflect client errors that occur when attempting to communicate with Connxio. The other error data is intended to reflect errors that occured when passing the message through Connxio and is present outside of the NuGet. The "errors" field only exists in the NuGet and is not a part of the standard return-object.

## Retry

Be aware that when using our Api you are required to handle all retry on the client side. Our regular SLA is in effect at all times but hiccups can happen within all network infrastructure and should be assessed and handled as needed.
When using the Interaction NuGet, there is built in Exponential Retry when retry is set.