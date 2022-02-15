# Core Concepts

- [Core Concepts `[needs work]`](#core-concepts-needs-work)
  - [InterchangeId](#interchangeid)
    - [Changing or multiplying IDs](#changing-or-multiplying-ids)
  - [What is an integration?](#what-is-an-integration)
  - [A stateless service](#a-stateless-service)
  - [Parallel processing](#parallel-processing)
  - [Robust message transfer and retention](#robust-message-transfer-and-retention)
  - [Orchestration](#orchestration)

This page explores the core concepts that make up the building blocks of the ConnXio (CX) service. Understanding these concepts are essential to being successfully withing the ConnXio eco-system and we would strongly recommend reading the points below carefully.

## InterchangeId

The *InterchangeId* is a simple but powerful part of the CX eco-system. In its most basic form it's nothing more than an ID that follows a message through the entire CX pipeline. The InterchangeId can be supplied by the customer in most cases (some protocols make this difficult, but it's implemented wherever possible), this enables the customer to track the message through CX with [logging](/Documentation/Logging.md) events, and use the ID itself for other purposes like naming files or editing the message itself.\
If the InterchangeId is not supplied by the customer it's generated in the form of a [GUID](https://en.wikipedia.org/wiki/Universally_unique_identifier), this makes the ID unique for this exact message and is used to identify it through the internal pipeline as well as for other storage and transformation purposes.

>Since it's used for complex internal processing an InterchangeID **must** be unique. Using a non unique ID *voids* *all* guarantees concerning message transfer inside CX.

This means that if you can't guarantee an unique ID you should not supply your own InterchangeID but let CX generate it for you instead.

## CorrelationId = IntegrationId

### Changing or multiplying IDs

There are some processes where the InterChangeId has to change by nature of the process enforced upon it. This most notably affects [splitting](/Documentation/Transformation/Splitting.md) and [batching](/Documentation/Transformation/Batching.md) scenarios, where the former splits one file into a number of new files each with its own ID, and the latter batches a number of messages into a single file. In both of these scenarios, keeping the original ID is impossible, therefore CX creates new ID's for the messages, there are currently no way to predict these ID's or set them from a customer perspective, this feature could be added later, but for now a customer can track the messages through the original ID as the original ID is logged with the last and first log events in both cases.

A customer *cannot* change the InterchangeId themselves at any point of CX's message processing.

## What is an integration?

An integration is a logical unit within CX that can be a little hard to grasp. When we talk about or reference "an integration" we refer to this unit which has the following characteristics:

1. Is represented by *one* integration configuration.
2. Moves *one* message/file/data to one or more receivers.

This essentially means that when we refer to one integration we refer to one single integration configuration.

## A stateless service

CX is a [stateless](https://en.wiktionary.org/wiki/stateless) service. When processing messages we hold the state of the message for 7 days to facilitate for manual resending. These states are not accessible by other processes or event the process itself unless it's specifically resent. The seven day limit cannot be changed and affects all data withing CX automatically. If a customer needs access to files after 7 days the logging provider or resending functionality provider should hold the files instead. To configure either [logging](/Documentation/Logging.md) or [resending](/Documentation/Resending.md) see the respective articles.

By leveraging other services like Azure Storage you can orchestrate CX to be semi stateful. Read more in the [orchestration](/Documentation/Use%20cases/Persistent%20Orchestration.md) section.

## Parallel processing

CX processes all messages in parallel, this means that CX has no guarantee concerning message ordering. If you need ordered messaging you can leverage certain adapters' options to stagger and sort message pick rate to create a semi ordered pipeline. This is however not possible with all protocols and for all intents and purposes, CX does not support ordered message delivery. If you need this for your system please contact ut to look at small ordering services or other customized options.

Parallel processing, while disqualifying ordered delivery, does give CX an enormous processing power. We can process almost limitless amounts of messages by scaling internal systems.

## Robust message transfer and retention

When a message is picked up or enters the CX ecosystem we do our outmost to never loose a it and keep the process going, even if external or internal systems should fail. This means that all message pipelines are based upon a queue system and even distributed across multiple regions to ensure message retention in catastrophic failure scenarios. Read more about retry [here](/Documentation/Retry.md).

## Orchestration

CX supports a variety of orchestration scenarios.

> By *orchestration* we mean the process of contacting or waiting for multiple systems, services or even manual input to piece together the correct output.

Consider the following two scenarios:

1. A message is picked up from an SFTP server, transformed to XML and sent to a REST endpoint.
2. A message is picked up from an SFTP server, we enrich it with data from an external REST endpoint, transform it to XML and send it for manual review in an external system by REST. When the manual review is completed an new message is sent to CX by REST and the message is delivered to another SFTP server.

In scenario 1 we integrate two systems without orchestration and use point to point transfer only. In scenario 2 however we short circuit the process while waiting for manual input and do two passes through CX to ensure the integration is completed and written to the SFTP catalog.

CX  supports both of these scenarios even though one requires orchestration and the other does not. This differs from other offerings within the iPAAs space in that it's more loosely coupled. Please contact us for more information if you are implementing a challenging orchestration scenario, there are very few orchestration processes that can't be solved with CX.
