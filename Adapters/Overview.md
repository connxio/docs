# Adapters

We use the word "Adapters" to describe the components that start or complete an integration flow by interfacing with systems outside of ConnXio (CX) through various protocols. Subsequently we put adapters into two categories; *inbound* and *outbound*.

**Inbound adapters** reach out to other systems over their configured protocol, search for files to pick up and then use parallel processing to pick up said files and upload them to the internal engines to start processing them. Inbound adapters give customers a plethora of settings to configure based on their protocol and the behavior described within the scope of that protocol. For example you might be able to configure security, pick rates, parallel processing thresholds, duplicate detection, etc.\
Inbound adapters are set up to trigger off of a time interval with a minimum interval of one minute. The minimum interval is 1 minute because the system picks up and runs each inbound configuration once every minute.

**Outbound adapters** are different from inbound adapters in the way they *push* messages instead of picking them up. The way these adapters function are more akin to [webhooks](https://en.wikipedia.org/wiki/Webhook) and the REST outbound adapter is actually a webhook in and of itself. The outbound webhooks react to events supplied by the CX internal engine and sends the processed messages to the configured place based on the configuration set up for the protocol that the adapter communicates over.

## Retry

CX uses multiple layers of retry to ensure the highest possible robustness. We currently use three types of retry:

1. Endpoint retry
2. Engine retry
3. Catastrophic failure retry

### Endpoint retry

All adapters use retry logic to compensate for protocol instability on delivery and pickup of messages. Thus endpoint retry refers to the instant retry mechanisms used when the instability of the protocol or the receivers themselves are unreachable or experiencing some kind of transient failure.  The nature of the retry varies by protocol and will be described in the specific articles per adapter, however all the adapters do have some similarities imposed by external limitations, such as the number of retries which varies by protocol but is kept within a time-range of 1 minute to conform to the transient nature of CX's scaling architecture.\
In short endpoint retry is triggered instantly when a request fails, and has a number of retries that stagger inside an interval of 1 minute or less.

### Engine retry

Even though the adapters themselves retry instantly when a request fails. 

## Acknowledgment events

All outbound adapters supply users with the ability to send an acknowledgement (ACK) of a completed message delivery. The guide describing the configuration process is detailed [here](/Adapters/Outbound/Acknowledgment.md). The concept of sending ACK messages is inspired by the [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment) protocol and gives our customers the ability to verify that a message has been delivered successfully in close to real time. When enabled, this feature supplies an external system with an event with contents supplied by using the standard CX [code mapping functionality](/Transformation/Code%20Mapping.md), which makes the ACK message extremely powerful as it can contain almost anything, even the delivered message itself.

### Stuff Everywhere

Even here

<!-- 
![alt](https://cxint2sa.blob.core.windows.net/test/_95146618_bills.jpg?sv=2020-04-08&st=2021-10-03T12%3A49%3A00Z&se=2025-06-05T12%3A49%3A00Z&sr=b&sp=r&sig=bUEyoRf1sf4ouXAzLqW%2Bn%2F6sTIYz3FQHX%2Fv2ZlZyqaU%3D) -->
