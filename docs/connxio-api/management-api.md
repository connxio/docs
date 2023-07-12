---
sidebar_position: 3
---

# Management API

The Connxio Management API allows users to programmatically create and manage integrations within Connxio. It provides a set of endpoints for performing CRUD (Create, Read, Update, Delete) operations on the IntegrationConfig object, enabling users to configure and manipulate integrations using API calls. The Management API includes the following operations:

## 1. GET /api/v2/integrations

This endpoint retrieves a list of all integrations associated with the user's account. It provides an overview of the existing integrations, allowing users to view the integration details.

## 2. GET /api/v2/integrations/{integrationConfigId}

This endpoint retrieves a specific integration based on the given `integrationConfigId`. Users can access detailed information about a particular integration, including its configuration settings, adapter details, and associated endpoints.

## 3. POST /api/v2/integrations

This endpoint allows users to create or update an integration within Connxio. Users can programmatically configure the integration properties using the same properties available in the Connxio Web Portal UI.

## 4. DELETE /api/v2/integrations

This endpoint enables users to delete an integration from Connxio. By providing the necessary parameters, users can remove an integration and its associated configuration from their account.

Additionally, the following endpoint allows users to retrieve a list of all available subscriptions linked to their account:

## GET /api/v2/subscriptions

This endpoint retrieves a list of all subscriptions that the user has access to. Each integration within Connxio is linked to a subscription ID, allowing users to manage and organize their integrations based on different subscriptions.

Please note that proper authentication and authorization mechanisms must be implemented to access the Management API endpoints securely. Refer to the Connxio API documentation for more details on authentication and request/response formats.

For further assistance or inquiries related to the Connxio Management API, please contact our support team.




<!-- # Management API

The Management API for Connxio (CX) gives customers access to their subscriptions and company context programmatically. Using the endpoints provided by said API will let you perform CRUD operations on integrations. By incorporating calls to the Management API in CI/CD pipelines you can curate your transformations and integrations from within your own version control or DevOps system. The API is hosted next to the Messaging API and the OpenAPI definition is found here:

<a href="https://app-cx-ratchet-api.azurewebsites.net/index.html" className="action-button">Connxio API</a>

<br />
<br />

Please note that the API Management Endpoint is Required for actual usage of the API. This page explains the technical details around the API and contains examples of how to call and authorize towards it.

## Security

The Management API uses the same security mechanisms as the standard Connxio API. See the [API documentation](/integrations/adapters/inbound/api.md) for specifics.

## Integration contract

Most of the complexity within the Management API is connected to building the integration contract (also called model). The contracts can be found within the swagger linked above. Use the /subscription endpoint to get your current set of integrations and use those as the basis for your request. The model is constantly changing but we do our outmost to ensure backwards compatibility. -->
