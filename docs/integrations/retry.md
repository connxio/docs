---
sidebar_position: 20
---

# Retry

CX uses multiple layers of retry to ensure the highest possible robustness. We currently use three types of retry:

1. Endpoint retry
2. Engine retry
3. Catastrophic failure retry

## Endpoint retry

All adapters use retry logic to compensate for protocol instability on delivery and pickup of messages. Thus endpoint retry refers to the instant retry mechanisms used when the instability of the protocol or the receivers themselves are unreachable or experiencing some kind of transient failure. The nature of the retry varies by protocol and will be described in the specific articles per adapter, however all the adapters do have some similarities imposed by external limitations, such as the number of retries which varies by protocol but is kept within a time-range of 1 minute to conform to the transient nature of CX's scaling architecture.\
In short endpoint retry is triggered instantly when a request fails, and has a number of retries that stagger inside an interval of 1 minute or less.

## Engine retry

Even though the adapters themselves retry instantly when a request fails prolonged failure will cause the message itself to fail after the grace period offered by the [endpoint retry](#endpoint-retry). To handle these kind of failures CX has two different strategies for engine retry, both based on [Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sequencing) functionality. We call these strategies *linear* and *backoff* retry.

### Linear retry

Linear retry uses Service Bus' abandon message functionality to leverage internal retry mechanisms and retry the message a set number of times in a linear fashion. Every retry attempt also triggers the [endpoint retry](#endpoint-retry), this means that the total number of retries are calculated thusly; (linear engine retry * endpoint retry) = total number of retries before failure.\
Every engine uses an optimal number of retries based on the kind of operation attempted and the nature of the engine itself. That said, no engine retries more than 10 times or less than 3 while configured to use linear retry. See the individual engines documentation for specific information about what number and kind of retry is used for that engine.

### Backoff retry

Backoff retry uses the [message scheduling](https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sequencing) feature of Service Bus to stagger retries in a way that causes less load on external endpoints during peak traffic. In essence the backoff retry functionality keeps track of failures, and based upon customer configured or default variables, it delays traffic to more evenly distribute messages and external calls. The variables are listed in the table below with a description of their functionality and the default value if not set within the integration:

| Variable | Value | Description |
|---|---|---|
| MaxNumberOfRetries | 5 | The max number of retries. When the maximum number of retries are reached the message is stopped and marked for potential manual retry.|
| FailureCountIntervalMinutes | 3 | With each failure that causes the engine to terminate the message processing the *MaxErrorsPerInterval* is incremented. This property control the reset time of *MaxErrorsPerInterval*. This causes CX to count errors within the set interval and start delaying messages if *MaxErrorsPerInterval* is hit within the interval set by this property. E.g. if this property is set to 3, the engine will count errors for 3 minutes and if *MaxErrorsPerInterval* is set to 5 it will start delaying if we hit 5 error counts within those 3 minutes, if not we reset the count and do it all again.|
| MaxErrorsPerInterval | 1000 | This is the max count of errors that can occur within the set *FailureCountIntervalMinutes*. When the threshold set here is hit the engine will start to delay messages in hopes of reducing the load on the external service. |
| ReQueueMinDelaySeconds | 10 | When a message is delayed it is re-scheduled on the Service Bus within the interval of ReQueueMaxDelaySeconds and this property. Meaning that if this property is set to 10 seconds and ReQueueMaxDelaySeconds is set to 60 seconds, failed messages will be re-scheduled for processing 10-60 seconds from the time of scheduling. Messages are queued randomly within the interval until all slots are used then the process repeats if necessary. |
| ReQueueMaxDelaySeconds | 60 | When a message is delayed it is re-scheduled on the Service Bus within the interval of ReQueueMinDelaySeconds and this property. Meaning that if this property is set to 60 seconds and ReQueueMinDelaySeconds is set to 10 seconds, failed messages will be re-scheduled for processing 10-60 seconds from the time of scheduling. Messages are queued randomly within the interval until all slots are used then the process repeats if necessary. |
| MaxDelayActions | 5 | The max number of delay actions. A delay action happens when the MaxErrorsPerInterval ceiling is reached within the FailureCountIntervalMinutes. The delay action is similar to a retry as it uses the same re-queue window and mechanism for re-scheduling, but unlike retry a delay action does not perform any work on the message and stops the message from being processed at all. This enables us to temporarily [circuit break](https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) the flow of messages to relieve stressed receiver services. When the maximum number of delay actions are reached the message is stopped and marked for potential manual retry. |
| Enabled | NA | Enables the retry as specified by the integration. Default values are used if disabled.|

## Catastrophic failure retry

When CX picks messages from a location or receives messages through its API, we do out outmost to ensure that the message is delivered and never lost within the CX engine. Catastrophic failure retry queues messages that experience connectivity loss to internal or external services or protocols on a Service Bus that is hosted in another data center. It is then reinserted into the original flow either automatically, or if the failure is persistent, manually after the fault is fixed.
