---
title: "ACK"
sidebar_position: 10.2
---

import PropertyReference from '@site/src/components/PropertyReference';

# ACK

:::info Legacy integrations only
The **Send ACK** feature described on this page is not supported for action based integrations. For actions, create branches using `runAfter` outcomes such as `Succeeded` and `Failed`, then add actions to prepare and send the ACK. Include `Skipped` if you also need to notify the receiving system when a step is skipped.

See [ACK messages when moving to actions](./move-to-actions.md#acknowledgments-ack) for an example.
:::

ACK messages let an external system react to the outcome of a delivery. Use them to update the source system, start a follow-up process, or track which records have been transferred.

An ACK code component creates the message content. The ACK can use a different destination and delivery method from the original message. For example, an integration can deliver a file through SFTP and send its ACK through Service Bus or HTTP.

:::caution Subscription usage
ACK messages count toward your subscription usage. Sending one ACK for every delivered message doubles the message traffic.
:::

## Configure ACK messages {#configuring-acknowledgments}

Open the adapter's settings to configure ACK messages.

1. Enable **Send ACK**.
2. Select **Edit ACK Options**.
3. Choose a component in **Select ack component**, or enable **Use external code component**.
4. Enable **Send negative ack** if you also want ACK messages for failed deliveries. Set **Message format override** if needed.
5. Choose **Adapter type** and configure the destination using the corresponding [ACK adapter guide](#ack-adapters).
6. Select **Done** in the ACK options, then **Done** in the adapter settings.

### Adapter settings

These fields appear in the parent adapter's settings, outside the ACK options.

<PropertyReference
properties={[
{
name: 'Adapter name',
description: 'The name used to identify the parent adapter in the integration.',
},
{
name: 'Condition (disable)',
description: 'The parent adapter’s condition expression. This belongs to the adapter configuration rather than the ACK options.',
example: '1 == 1',
},
{
name: 'Send ACK',
description: 'Enables ACK messages for this adapter. Select Edit ACK Options to configure the message content and destination.',
},
]}
/>

Use [CxMaL](../cxmal/connxio-macro-language.md) for condition expressions.

### ACK settings

<PropertyReference
properties={[
{
name: 'Code component',
description: 'Select the ACK code component that generates the ACK message content. Use + to add a component. Applies when Use external code component is disabled.',
},
{
name: 'Use external code component',
description: 'Enable to use an externally hosted code component instead of selecting an uploaded ACK component.',
},
{
name: 'Send negative ack',
description: 'Enable to send ACK messages for failed deliveries as well as successful deliveries. The ACK component can use the success parameter to generate the appropriate content.',
},
{
name: 'Message format override',
description: 'Override the message format used for the ACK.',
},
{
name: 'Adapter type',
description: 'The adapter used to deliver the ACK. Configure its connection and delivery settings for the ACK destination.',
},
]}
/>

See [Create an ACK code component](#creating-ack-code-components) for the component interface and upload instructions.

### ACK adapters

Choose one of the following values in **Adapter type**. Each link opens the corresponding action guide for connection and delivery settings.

- [SFTP](../actions/sftp.md)
- [FTP](../actions/sftp.md)
- [REST](../actions/http.md)
- [Azure Blob](../actions/azure-storage/azure-blob.md)
- [Azure File Share](../actions/azure-storage/azure-file-share.md)
- [Azure Table](../actions/azure-storage/azure-table.md)
- [Azure Queue](../actions/azure-storage/azure-queue.md)
- [Service Bus](../actions/service-bus.md)
- [Email](../actions/email.md)

## Create an ACK code component {#creating-ack-code-components}

Implement `IConnXioAck` to generate the ACK content. The component receives a `success` parameter so it can create different content for successful and failed deliveries. The content can include delivery details or the original message itself.

See the [ACK tab on the Code components page](./code-components.md#ack-component) for the interface, an example, and upload instructions. Choose the uploaded component in **Select ack component**.

## Use cases

### Ensuring delivery

Send the delivery outcome back to the source system. Enable **Send negative ack** so the source can use a failed-delivery ACK to initiate a resend or mark the message for manual processing.

### Reacting to delivery

Use an ACK to start work that depends on the original delivery. For example, after a customer record has been delivered to a receiving system, notify the source system so it can start a separate process to assign access rights.

ACK messages can also feed a notification or logging pipeline. For general integration events, see [Logging](./logging.md).

### Keeping track of delivery

When polling an API for changed records, send an ACK back to the source after delivery so it can mark those records as transferred.

For example:

1. A scheduled integration retrieves changed records from the source API.
2. Connxio delivers the records to the receiving system.
3. The ACK code component creates a message identifying the transferred records.
4. The ACK is sent to a source endpoint that marks those records as processed.

Account for repeated records if another poll runs before the source processes the ACK, or if ACK delivery fails.

## Retry

ACK messages use the retry behavior of the adapter selected to deliver the ACK. For example, an ACK sent through SFTP uses SFTP retry behavior, even if the original message was delivered through HTTP.

See the relevant [ACK adapter guide](#ack-adapters) for adapter-specific behavior and [Retry](./retry.md) for the shared retry mechanisms.
