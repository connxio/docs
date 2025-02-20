---
sidebar_position: 2
---

# Core Concepts
> Terms and concepts you will commonly see when you use Connxio.

## Integration

An integration in Connxio represents a configuration that enables the seamless transfer of data and messages between two systems. It defines the specific settings, adapters, transformations, and endpoints involved in the data exchange process. With Connxio integrations, users can establish robust connections between systems, enabling efficient data flow and automation.

The ID of an integration will sometimes be called:

- IntegrationId
- IntegrationConfigId
- ConfigCorrelationId

## InterchangeId

The InterchangeId is a unique identifier assigned to each message or data interchange processed by Connxio. It is used extensively by Connxio itself, while also allowing users, in conjuction with Connxio's [logging tools](/integrations/logging), to trace messages, identify specific data exchanges, and monitor the progress and status of individual messages within the Connxio pipeline.

When a new message proccess is started, Connxio will generate a UUID v4 as it's InterchangeId, however users can also in most cases supply their own ID instead (some protocols make this difficult, but it's implemented wherever possible). When providing your own InterchangeId you are responsible for ensuring it's uniqueness. Using a non-unique ID **_voids all_** guarantees concerning message transfer inside Connxio.

In scenarios such as [batching](/integrations/transformation/batching) and [splitting](/integrations/transformation/splitting), the InterchangeId may change during processing. During batching, multiple interchangeIds are consolidated into a single new one, while splitting results in a single interchangeId being split into multiple new ones based on the original message.

## Adapter

An adapter in Connxio represents a specific protocol or mechanism used to interact with systems and handle data transfer. Adapters serve as connectors between the integration pipeline and external systems, facilitating seamless communication. Connxio supports various adapters, including API/webhook, Azure Blob Storage, FTP/SFTP, email, and more, enabling flexible integration possibilities.

## Delivery

Connxio is built with the [at-least-once](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions#receive-modes) delivery guarantee. This is the same concept used by Azure Service Bus, and since Connxio is built on Azure building blocks we use the same principal.

At-least-once delivery basically means that a message will always be delivered once, but might be delivered more than once. Therefore you - as a customer - need to take the appropriate measures on the receiver side to mitigate problems receiving duplicate messages if the endpoint is not [idempotent](https://en.wikipedia.org/wiki/Idempotence).

We do have a solution for duplicate free processing called _duplicate detection_ which can be enabled on outbound adapters. However, duplicate detection is expensive and might incur additional cost depending on the amount of messages passing through the integration.

## Transformation

Transformations in Connxio are operations applied to data during the integration process. These transformations allow users to modify, reformat, or manipulate data as it passes through the integration pipeline. Connxio supports different types of transformations, such as code components, batching, splitting, format conversion, and prettifying, providing users with the flexibility to customize data processing based on their specific requirements.

## Retry

Retry and guaranteed delivery mechanisms ensure the reliable transfer of messages within Connxio. In case of transmission failures or temporary system unavailability, Connxio employs automated [retry mechanisms](/integrations/retry) to reattempt message delivery. If the retry process is unable to successfully deliver the message, it will be persisted to Connxio's error persistence store. Users can access the Connxio web portal to view these failures, identify the error occurrence, and manually resend the messages. This feature enables users to actively manage and troubleshoot message delivery issues.

[Read more about resending here](/connxio-portal/connxio-resending).

## Parallel Processing

Connxio utilizes parallel processing to handle integrations, enabling efficient and simultaneous processing of messages. It should be noted that due to parallel processing, Connxio does not guarantee processing of messages in a specific order. However, when using the API inbound adapter, users have the option to set the "Use Synchronous Communication" flag, allowing them to wait for one request to finish before starting another, enabling more controlled and ordered communication.

## Stateless

Connxio is a [stateless](https://en.wiktionary.org/wiki/stateless) service. When processing messages Connxio will hold the state of the message for 7 days to facilitate for manual resending. These states are not accessible by other processes or even the process itself unless it's specifically resent. The seven day limit cannot be changed and affects all data withing Connxio automatically. If a customer needs access to files after 7 days the logging provider or resending functionality provider should hold the files instead. To configure either [logging](/integrations/logging) or [resending](/connxio-portal/resending-api) see the respective articles.

## Orchestration

Connxio supports a variety of orchestration scenarios.

> By _orchestration_ we mean the process of contacting or waiting for multiple systems, services or even manual input to piece together the correct output.

Consider the following two scenarios:

1. A message is picked up from an SFTP server, transformed to XML and sent to a REST endpoint.
2. A message is picked up from an SFTP server, we enrich it with data from an external REST endpoint, transform it to XML and send it for manual review in an external system by REST. When the manual review is completed an new message is sent to Connxio by REST and the message is delivered to another SFTP server.

In scenario 1 we integrate two systems without orchestration and use point to point transfer only. In scenario 2 however we short circuit the process while waiting for manual input and do two passes through Connxio to ensure the integration is completed and written to the SFTP catalog.

Connxio supports both of these scenarios even though one requires orchestration and the other does not. This differs from other offerings within the iPAAs space in that it's more loosely coupled. Please contact us for more information if you are implementing a challenging orchestration scenario, there are very few orchestration processes that can't be solved with Connxio.
