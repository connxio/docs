---
  title: "Overview"
  sidebar_position: 1
---

# Adapters

We use the word "Adapters" to describe the components that start or complete an integration flow by interfacing with systems outside of ConnXio (CX) through various protocols. Subsequently we put adapters into two categories; *inbound* and *outbound*.

**Inbound adapters** reach out to other systems over their configured protocol, search for files to pick up and then use parallel processing to pick up said files and upload them to the internal engines to start processing them. Inbound adapters give customers a plethora of settings to configure based on their protocol and the behavior described within the scope of that protocol. For example you might be able to configure security, pick rates, parallel processing thresholds, duplicate detection, etc.\
Inbound adapters are set up to trigger off of a time interval with a minimum interval of one minute. The minimum interval is 1 minute because the system picks up and runs each inbound configuration once every minute.

**Outbound adapters** are different from inbound adapters in the way they *push* messages instead of picking them up. The way these adapters function are more akin to [webhooks](https://en.wikipedia.org/wiki/Webhook) and the REST outbound adapter is actually a webhook in and of itself. The outbound webhooks react to events supplied by the CX internal engine and sends the processed messages to the configured place based on the configuration set up for the protocol that the adapter communicates over.

## Retry

General retry information can be found [here](/retry). For specific information see the detailed information per adapter.

## Acknowledgment events

All outbound adapters supply users with the ability to send an acknowledgement (ACK) of a completed message delivery. The guide describing the configuration process is detailed [here](/adapters/outbound/acknowledgment). The concept of sending ACK messages is inspired by the [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment) protocol and gives our customers the ability to verify that a message has been delivered successfully in close to real time. When enabled, this feature supplies an external system with an event with contents supplied by using the standard CX [code mapping functionality](/transformation/code-components), which makes the ACK message extremely powerful as it can contain almost anything, even the delivered message itself.
