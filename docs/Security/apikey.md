
# Api Keys

:::caution in development

Currently, only API Keys for the management API is in production. API Keys for the messaging API will be enabled at a later date. More information can be found on the [functionality page](/Functionality).

:::

To better secure the communication with Connxio (CX) Api's we have created a security mechanism we call *Api Keys*. By using Api Keys to secure RestFul communication you can put limitations on what actions are allowed within the key scope which facilitates a narrower security model. We also offer lifecycle management for keys which lets you throw away keys that may have been compromised or dole out keys to your partners which can be revoked in the future.

## Creating a key

You create a key by opening the *API Keys* menu item under the *Administration* section in the sidebar. Administrator privileges are required to generate new keys for your company.

A key requires a name as well as a scope on creation. You enter the name and select the scope as you see in the picture below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/ApiKey_create.png?sv=2020-10-02&st=2022-06-10T11%3A57%3A23Z&se=2040-06-11T11%3A57%3A00Z&sr=b&sp=r&sig=J1aKZcpbXt4XP4uoyfP%2B04F2wKsP8HUDedH9HeIg9SM%3D)

- **Name**: The name of the api key, consider using stakeholders as a part of the name for easier lifecycle management.
- **Key**: The key itself. Copy this into the `Connxio-Api-Key` header on your request.
- **Created**: The date of creation for this key.
- **Active**: If the active state is changed the key stops working.
- **Scopes**: Selects the scope(s) the Api Key should be valid for. We talk about scopes in grater detail [below](#scopes).
- **Subscription**: Selects the subscription the Api Key should be valid for. The default subscription is the one you are currently logged into.

When you have entered the name and selected your scopes the press the `Create Api Key` button which will generate the key and display it in the list.

The key is base64 encoded and is available to edit in the list. By default the key is set to be *Active* on creation and can be turned off (which will make CX reject all requests containing the key) by clicking the corresponding *Active* slider in the list.

## Using a key

Using the key is as simple as adding the key value to a header called `Connxio-Api-Key`. The following picture shows how this is done in postman:

![img](https://cmhpictsa.blob.core.windows.net/pictures/ApiKey_Postman.png?sv=2020-10-02&st=2022-08-03T09%3A25%3A35Z&se=2030-08-04T09%3A25%3A00Z&sr=b&sp=r&sig=eIN4qgy68j2IoryW2%2BTrj1dDEy0h5%2FKLouq9xfFeZGs%3D)

## Scopes

To enable more granulated security for CX endpoints we have created scopes for our Api Keys. We recommend only using one scope per key for the best security, but since CX uses multiple forms of security for our Api's, using one key for multiple scopes only lessens the security slightly.

![img](https://cmhpictsa.blob.core.windows.net/pictures/ApiKey_Scopes.png?sv=2020-10-02&st=2022-06-10T11%3A56%3A38Z&se=2040-06-11T11%3A56%3A00Z&sr=b&sp=r&sig=QR1yJFNOq8htrguGLwyWgfzczcKQmf3m%2BVxIQbZVp7w%3D)

There are three defines scopes, and they relate to different CX Api functionality:

### Messaging

The *Messaging* scope relates to the actual sending of messages to CX by using the Api endpoints defined in the [Api adapter](/Adapters/Inbound/api.md). These endpoints also require OAuth and a APIM tracking key. This is the primary scope for connecting to CX through inbound rest communication.

### Webhook

The webhook scope is only usable for integrations requiring basic authentication schemes and should be used with outmost caution as this bypasses the primary security of the CX API. An integration is still protected by the CX framework but will loose a big security factor by using these endpoints. Contact the CX team for details about the webhook endpoints and how to use them.

### Management

The management scope is used for updating, creating and deleting integrations programmatically and has its own Api for this purpose. More information can be found [here](/Management/management-api.md).

## Subscription

When a key is generated it's limited to the current logged in subscription by default. If you want to enable it for multiple subscriptions you can do this by using he *subscription menu* as shown in the picture above. We recommend only using one subscription per Api key for the best security.

## Backwards compatibility

Since the Api Key security scheme is much newer than the Cx platform itself all previously created integrations will work without a key until they are saved within the new portal after the key scheme has been enabled in CX. A warning will pop up before you save to ensure that you provide the right credentials on an upgrade.
