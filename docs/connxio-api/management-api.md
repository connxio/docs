---
sidebar_position: 3
---

# Management API

The Management API for Connxio (CX) gives customers access to their subscriptions and company context programmatically. Using the endpoints provided by said API will let you perform CRUD operations on integrations. By incorporating calls to the Management API in CI/CD pipelines you can curate your transformations and integrations from within your own version control or DevOps system. The API is hosted next to the Messaging API and the OpenAPI definition is found here:

<a href="https://app-cx-ratchet-api.azurewebsites.net/index.html" className="action-button">Connxio API</a>

<br />
<br />

Please note that the API Management Endpoint is Required for actual usage of the API. This page explains the technical details around the API and contains examples of how to call and authorize towards it.

## Security

The Management API uses the same security mechanisms as the standard Connxio API. See the [API documentation](/integrations/adapters/inbound/api.md) for specifics.

## Integration contract

Most of the complexity within the Management API is connected to building the integration contract (also called model). The contracts can be found within the swagger linked above. Use the /subscription endpoint to get your current set of integrations and use those as the basis for your request. The model is constantly changing but we do our outmost to ensure backwards compatibility.


The second part of the Connxio API is the "Management API". This API allows users to perform CRUD operations on the IntegrationConfig object, and such allows them to programmatically create and manage integrations. Users can configure integrations with the same properties as when using the Connxio Web Portal UI.
The following operations are available to use:
GET /api/v2/integrations - Gets a list of all the user's integrations
GET /api/v2/integrations/{integrationConfigId} - Gets a specfic integration
POST /api/v2/integrations - Creates or updates an integration
DELETE /api/v2/integrations - Deletes an integration

The last endpoint is a way to allow users to get a list of all the available subscriptions to user can access. (all integrations are linked to a subscriptionId)
GET /api/v2/subscriptions - Gets a list of all subscriptions that user has access to