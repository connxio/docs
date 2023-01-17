# Management Api

The Management Api for ConnXio (CX) gives customers access to their subscriptions and company context programmatically. Using the endpoints provided by said Api will let you perform CRUD operations on integrations. By incorporating calls to the Management Api in CI/CD pipelines you can curate your transformations and integrations from within your own version control or DevOps system. The Api is hosted next to the Messaging Api and the swagger is found here: <https://cmh-prod-api-wa.azurewebsites.net/index.html>. Please not that the Api Management Endpoint is Required for actual usage of the API. This page explains the technical details around the Api and contains examples of how to call and authorize towards it.

## Security

The Management Api uses the same security mechanisms as the standard ConnXio Api. See the [Api documentation](/Adapters/Inbound/api.md) for specifics.

## Integration contract

Most of the complexity within the Management Api is connected to building the integration contract (also called model). The contracts can be found within the swagger linked above. Use the /subscription endpoint to get your current set of integrations and use those as the basis for your request. The model is constantly changing but we do our outmost to ensure backwards compatibility.
