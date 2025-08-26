# Azure Event Hub

The Azure Event Hub inbound adapter in Connxio enables seamless integration with Azure Event Hub, a cloud-based  real-time data ingestion service. With this adapter, users can receive and process messages from Event Hub consumer groups within their Connxio integrations.

## Performance

Unlike most other Adapters in Connxio Event Hub scaling and performance is totally dependant on the Event Hub resource and not on the scaling performed inside Connxio. Microsoft has a comprehensive guide on how to scale Event Hub [here](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-scalability). We strongly recommend doing an exhaustive study of the information supplied by them.

Since there are multiple factors that impact Event Hub scaling we won't be doing a deep dive in this article. We will, however, mention *partitioning* specifically. The partitioning scheme is imperative for Event Hub performance and we strongly recommend setting aside multiple partitions for any Event Hub integration - especially those with large amounts of traffic. The number of partitions is directly correlated to the performance of the integration since Connxio scales on this parameter specifically. Partition count is set by the resource administrator in Azure on the Subscription hosting the Event Hub.

## Configuring the Event Hub adapter

To start fetching data from Event Hub select the "Event Hub" option in the "Inbound Connection" drop down:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring event-hub connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

<br />

On creating a new adapter, a popup with the adapter's input fields will appear.
EventHub only has 1 section since most of the settings are configured in the [Security Configuration](/connxio-portal/security-configurations#Event-Hub).

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/eventhub.png'),
      dark: useBaseUrl('/img/docs/eventhub-dark.png#dark-only'),
    }}
  />
</div>

- **Servicebus Type**: There are two types; Topic and Queue.
- **Security configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations#Event-Hub) that contains the relevant connection properties.
- **System property filters**: A dictionary that filters messages picked from the Consumer Group based on the [EventData.Properties Properties](https://learn.microsoft.com/en-us/dotnet/api/azure.messaging.eventhubs.eventdata.properties?view=azure-dotnet). If the value field is left blank any value will be accepted and only the existence of the key will be verified. You can add multiple filters. If the message matches one of the filters it will be processed by the integration.

### Wrapper
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="data pickup interval"
    sources={{
      light: useBaseUrl('/img/docs/inbound/wrapper-light.webp'),
      dark: useBaseUrl('/img/docs/inbound/wrapper-dark.webp#dark-only'),
    }}
  />
</div>

- **WrapperType**: Choose between Json, XML or None.
- **Might be Wrapped**: A wrapper is essentially just a shell around the actual message content that contains information not within the concern of the message itself. Read more about wrappers [here](/interaction/wrappers).

## Filtering

Since Event Hub can have multiple event types in one consumer group we provide filtering on the adapter. This is handled as described above in the **System property filters** property section.

## InterchangeId

You can supply your own InterchangeId for transactional logging purposes by adding a EventData.Properties Property to the message with the key `InterchangeId` and the string value for the InterchangeId itself. I.e.:

```csharp
EventData eventData = new EventData(Encoding.UTF8.GetBytes(message));
eventData.Properties.Add("InterchangeId", "3c8701dc-858b-4f98-915a-5b3432eb37ec");
```

Be sure to read the [Core Concepts](/getting-started/core-concepts) for more information about supplying your own InterchangeId.

## Retry

The Event Hub implementation on the Connxio side is configured with the continuous [ProcessEventHandler](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send?tabs=passwordless%2Croles-azure-portal#update-the-code) pattern. The [Event Hub checkpoint](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-features#checkpointing) is updated after a message is sent successfully from the Connxio inbound endpoint to the main Connxio engine. If at any point a failure is detected the checkpoint will not be set and the processor will restart to try to fetch the message again. If the failure happens at a point where Connxio has enough information the message will be sent through the regular CX error handling process. If the information required for error handling is missing the processor will try to fetch the message every minute until it succeeds. If the failure never self-heals the processor will be stuck on that message forever and seemingly halt. Connxio will log repeating failures to the *Performance* page of your integration when faults happen at any point in the process.

It is imperative that the Event Hub Consumer groups are monitored to detect stops in processing. This can be done in a multitude of ways and is the responsibility of the owner of the Event Hub resource.
