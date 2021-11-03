# Event Grid Adapter

- [Event Grid Adapter](#event-grid-adapter)
  - [Limitations](#limitations)
  - [Configuring Event Grid message intake](#configuring-event-grid-message-intake)
  - [Configuring Event Grid endpoints in Azure `needs picture of correlationid`](#configuring-event-grid-endpoints-in-azure-needs-picture-of-correlationid)

ConnXio (CX) lets customers provide messages to the CX pipeline by leveraging [Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/overview). This page details how to configure Event Grid in CX but does not describe how to set up or configure Event Grid itself, please refer to the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/event-grid/blob-event-quickstart-portal) for more information about Event Grid.

## Limitations

At this point in time we only support the Blob Storage option for Event Grid. Adding new options is possible, please contact us if you need other options.

There are very few limitations on Azure Event Grid communication. Since Event Grid functions as a event emitter towards the CX [Api](/Adapters/Inbound/Api.md) the only limitations are on bandwidth and traffic. The CX Api scales with traffic and is thoroughly monitored and should handle a lot of traffic, if you have peak loads of thousands of messages per second we do recommend looking at [queue options](/Adapters/Inbound/Service%20Bus.md) instead to mitigate risk.

## Configuring Event Grid message intake

To configure CX to start processing your event grid events select the Event Grid option in "Inbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/EventGrid%20config.PNG?sv=2020-04-08&st=2021-11-03T12%3A17%3A38Z&se=2040-11-04T12%3A17%3A00Z&sr=b&sp=r&sig=n9fBkdScT9uhEFRcGSzhPtJ0oB1aFxzP8QM%2BVV0blPM%3D)

- **Even Grid Storage Account Connection String**: The connection string tot the Storage Account that holds the data represented by the message sent to the API from Event Grid.
- **Event Grid Blob Container Name List**: A comma separated list over possible containers referenced in the EventGrid message.

## Configuring Event Grid endpoints in Azure `needs picture of correlationid`

Please refer to the [Swagger documentation](https://cmh-prod-api-wa.azurewebsites.net/index.html) for what parameters are accepted for the CX `EventGrid` endpoint. As with other Api endpoints (as described on the [Api page](/Adapters/Inbound/Api.md) only CorrelationId is required for new integrations.

Event grid uses simple authentication patterns and does, at the point of writing, not support OAuth 2.0. Since this is the case we accept OCP token verification through [APIM](https://azure.microsoft.com/en-us/services/api-management/#overview). Supply this by configuring the APIM uri `https://cmh-messagehub-apim-prod.azure-api.net` with query parameters in your Event Grid configuration in Azure like so:

>`https://cmh-messagehub-apim-prod.azure-api.net/api/eventgrid?subscription-key=xxxx-xxxx-xxx-xxxx-xxxx&ConfigCorrelationId=xxxx-xxxx-xxx-xxxx`

Where **subscription-key** refers to your authentication key supplied by your ConnXio representative, and **ConfigCorrelationId** refers to the Id of the integration in the portal.
