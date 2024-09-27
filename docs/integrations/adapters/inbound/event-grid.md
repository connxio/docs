# Event Grid

The Azure Event Grid inbound adapter in Connxio allows seamless integration with Azure Event Grid, a fully managed event routing service. With this adapter, users can receive and process events published to Azure Event Grid in their Connxio integrations.

<details>
<summary>Limitations</summary>
<p>
At this point in time we only support the Blob Storage for Event Grid. Adding new options is possible, please contact us if you need other options.
<br />
<br />
If you're integration experiences peak traffic of several thousand messages per second, we recommend using a <a href="/integrations/adapters/inbound/service-bus">queue system</a> instead.
</p>
</details>

## Configuring the Azure Event Grid adapter

To configure Connxio to start processing your event grid events select the Event Grid option in "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

A new window pops up with the input fields for the adapter's properties:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/eventgrid-properties-light.webp'),
      dark: useBaseUrl('/img/docs/eventgrid-properties-dark.webp#dark-only'),
    }}
  />
</div>

<br />
The following properties are used to configure the adapter:

- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the connection string to the Storage Account that holds the data represented by the message sent to the API from Event Grid.
- **Event Grid Blob Container Name List**: A comma separated list over possible containers referenced in the EventGrid message.

## Configuring Event Grid endpoints in Azure

To configure Event Grid to send events to Connxio, please [review the API documentation here](/reference/post-api-v-3-messages-integration-id-eventgrid).

## Retry

Retry on Event Grid is handled by the Event Grid itself. Please refer to the [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/event-grid/delivery-and-retry).
