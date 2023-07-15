# Event Grid

Connxio lets customers provide messages to the Connxio pipeline by leveraging [Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/overview). This page details how to configure Event Grid in Connxio but does not describe how to set up or configure Event Grid itself, please refer to the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/event-grid/blob-event-quickstart-portal) for more information about Event Grid.

## Limitations

At this point in time we only support the Blob Storage for Event Grid. Adding new options is possible, please contact us if you need other options.

There are very few limitations on Azure Event Grid communication. Since Event Grid functions as a event emitter towards the Connxio [Api](/integrations/adapters/inbound/Api) the only limitations are on bandwidth and traffic. The Connxio Api scales with traffic and is thoroughly monitored and should handle a lot of traffic, if you have peak loads of thousands of messages per second we do recommend looking at [queue options](/integrations/adapters/inbound/Service-Bus) instead to mitigate risk.

## Configuring Event Grid message intake

To configure Connxio to start processing your event grid events select the Event Grid option in "Inbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Event%20grid%20inbound%20config.png?sv=2020-08-04&st=2022-01-11T11%3A48%3A52Z&se=2040-01-12T11%3A48%3A00Z&sr=b&sp=r&sig=gD1Vukqa6rmrcr0MidyJq2xCrIv2jr6ctBF8gixg0j0%3D)

- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the connection string to the Storage Account that holds the data represented by the message sent to the API from Event Grid.
- **Event Grid Blob Container Name List**: A comma separated list over possible containers referenced in the EventGrid message.

## Configuring Event Grid endpoints in Azure `needs picture of correlationid`

Please refer to the [Swagger documentation](https://cmh-prod-api-wa.azurewebsites.net/index.html) for what parameters are accepted for the Connxio `EventGrid` endpoint. As with other Api endpoints (as described on the [Api page](/integrations/adapters/inbound/Api) only CorrelationId is required for new integrations.

Event grid uses simple authentication patterns and does, at the point of writing, not support OAuth 2.0. Since this is the case we accept OCP token verification through [APIM](https://azure.microsoft.com/en-us/services/api-management/#overview). Supply this by configuring the APIM uri `https://cmh-messagehub-apim-prod.azure-api.net` with query parameters in your Event Grid configuration in Azure like so:

>`https://cmh-messagehub-apim-prod.azure-api.net/api/eventgrid?subscription-key=xxxx-xxxx-xxx-xxxx-xxxx&ConfigCorrelationId=xxxx-xxxx-xxx-xxxx`

Where **subscription-key** refers to your authentication key supplied by your Connxio representative, and **ConfigCorrelationId** refers to the Id of the integration in the portal.

## Retry

Retry on Event Grid is handled by the Event Grid itself. Please refer to the [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/event-grid/delivery-and-retry).
