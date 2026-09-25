import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Azure Event Hub

The Event Hub trigger receives messages from an Azure Event Hub consumer group and sends them into the Connxio pipeline. It processes messages continuously and does not use a trigger interval.

## Configure the trigger

Add an Event Hub trigger to your integration and configure the settings below.

## General settings

<TriggerGeneralSettings />

## Event Hub settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/#Event-Hub">Event Hub security configuration</Link> containing the Event Hub name, connection string, consumer group, and checkpoint storage settings. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "System property filters",
description: <>Filters incoming messages by entries in <code>EventData.Properties</code>. Add a key and value to match, or leave the value blank to check only that the key exists. If multiple filters are configured, a message is processed when it matches any one of them.</>,
},
]} />

## InterchangeId

To supply your own ID for transactional logging, add an `interchangeId` property to the message. The key starts with a lowercase `i`, and the value must be a string.

```csharp
EventData eventData = new EventData(Encoding.UTF8.GetBytes(message));
eventData.Properties.Add("interchangeId", "3c8701dc-858b-4f98-915a-5b3432eb37ec");
```

## Retry

Connxio updates the Event Hub checkpoint after successfully passing a message to the main engine. If processing fails before that checkpoint is saved, the processor restarts and retrieves the message again.

When enough message information is available, failures use Connxio's [retry handling](../integrations/retry.md). Otherwise, the processor retries retrieval every minute. A persistent failure can block processing of the affected message. Repeated failures appear on the integration's **Performance** page.

Monitor your consumer groups to detect stalled processing.

## Performance

Throughput depends on the Event Hub resource and its partition count. Connxio scales processing across partitions, so configure enough partitions for the expected traffic, especially for high-volume integrations.

See Microsoft's [Event Hubs scalability guide](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability) for resource and partition planning.
