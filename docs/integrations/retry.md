---
sidebar_position: 20
---

# Retry

Connxio uses multiple retry layers for resilience. It currently supports three retry types:

1. Endpoint retry
2. Engine retry
3. Catastrophic failure retry

## Endpoint retry

All adapters use retry logic to handle instability when delivering or picking up messages. Endpoint retry refers to the immediate retries triggered when a protocol or receiver is unreachable or experiencing a transient failure. The exact behavior depends on the protocol and is described in each adapter article, but all adapters follow the same general limit: retries stay within a window of 1 minute or less to match the transient nature of Connxio's scaling architecture.\
In short, endpoint retry starts immediately after a failed request and staggers retries within 1 minute or less.

## Engine retry

Although adapters retry immediately when a request fails, prolonged failures will still cause the message to fail after the [endpoint retry](#endpoint-retry) grace period. To handle this, Connxio provides two engine retry strategies: _linear_ and _backoff_ retry.

### Linear retry

Linear retry retries a message a set number of times in sequence. Each retry attempt also triggers [endpoint retry](#endpoint-retry), so the total number of attempts is calculated as follows:

> **Linear engine retry × endpoint retry = total retries before failure**

Each engine uses a retry count based on the operation and engine type. With linear retry enabled, an engine retries at least 3 times and at most 10 times. See the relevant engine documentation for exact behavior.

### Backoff retry

Backoff retry spaces out retry attempts over time to reduce pressure on external endpoints during periods of repeated failure or high traffic. Connxio monitors recent failures and, based on the configured or default thresholds below, can delay messages before trying them again. The variables in the table define when delays begin, how long messages wait before reprocessing, and when Connxio stops retrying.

| Variable                    | Value | Description                                                                                                                                                                                                |
| --------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MaxNumberOfRetries          | 5     | Maximum number of times Connxio retries a failed message before giving up and marking it for possible manual retry.                                                                                        |
| FailureCountIntervalMinutes | 3     | Time window, in minutes, used to count failures. Connxio checks how many errors occur during this period when deciding whether to start delaying messages.                                                 |
| MaxErrorsPerInterval        | 1000  | Number of errors allowed within _FailureCountIntervalMinutes_ before Connxio begins delaying messages to reduce pressure on the external service.                                                          |
| ReQueueMinDelaySeconds      | 10    | Shortest delay before a failed or delayed message is queued again for processing.                                                                                                                          |
| ReQueueMaxDelaySeconds      | 60    | Longest delay before a failed or delayed message is queued again for processing. Connxio schedules the message at a random time between the minimum and maximum delay values.                              |
| MaxDelayActions             | 5     | Maximum number of times Connxio can delay a message instead of processing it when the error threshold is exceeded. After this limit is reached, the message stops and is marked for possible manual retry. |
| Enabled                     | NA    | Turns this retry behavior on or off for the integration. If disabled, Connxio uses the default retry settings.                                                                                             |

## Catastrophic failure retry

When Connxio picks up messages from a location or receives them through its API, it is designed to prevent message loss within the engine. Catastrophic failure retry stores messages that lose connectivity to internal or external services in a separate recovery flow. The message is then reinserted into the original flow automatically or, if the failure persists, manually after the issue is resolved.
