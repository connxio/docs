
# Api Keys

`This functionality is not in production and in development. More information can be found on the` [functionality page](/Functionality)

To better secure the communication with ConnXio (CX) Api's we have created a security mechanism we call *Api Keys*. By using Api Keys to secure RestFul communication you can put limitations on what actions are allowed within the key scope which facilitates a narrower security model. We also offer lifecycle management for keys which lets you throw away keys that may have been compromised or dole out keys to your partners which can be revoked in the future.

## Creating a key

You create a key by opening the *API Keys* menu item under the *Administration* section in the sidebar. Administrator privileges are required to generate new keys for your company.

A key requires a name as well as a scope on creation. You enter the name and select the scope as you see in the picture below:

![img](/site/static/img/ApiKey_create.png)

- **Api Key Name**: The name of the api key, consider using stakeholders as a part of the name for easier lifecycle management.
- **Scopes**: Select the scope(s) the Api Key should be valid for. We talk about scopes in grater detail [below](#scopes).

When you have entered the name and selected your scopes the press the `Create Api Key` button which will generate the key and display it in the list.

The key is base64 encoded and is available to edit in the list. By default the key is set to be *Active* on creation and can be turned off (which will make CX reject all requests containing the key) by clicking the corresponding *Active* slider in the list.

## Scopes

To enable more granulated security for CX endpoints we have created scopes for our Api Keys. We recommend only using one scope per key for the best security, but since CX uses multiple forms of security for our Api's, using one key for multiple scopes only lessens the security slightly.

![img](/site/static/img/ApiKey_Scopes.png)

There are three defines scopes, and they relate to different CX Api functionality:

### Messaging

The *Messaging* scope relates to the actual sending of messages to CX by using the Api endpoints defined in the [Api adapter](/docs/Adapters/Inbound/api.md). These endpoints also require OAuth and a APIM tracking key. This is the primary scope for connecting to CX throung inbound rest communication.

### Webhook

The webhook scope is only usable for integrations requiring basic authentication schemes and should be used with outmost caution as this bypasses the primary security of the CX API. An integration is still protected by the CX framework but will loose a big security factor by using these endpoints. Contact the CX team for details about the webhook endpoints and how to use them.

### Management

The management scope is used for updating, creating and deleting integrations programmatically and has its own Api for this purpose. More information can be found [here](/docs/Managament/management-api.md).

## Subscription

When a key si generated it's limited to the current logged in subscription by default. If you want to enable it for multiple subscriptions you can do this by using he *subscription menu* as shown in the picture above. We recommend only using one subscription per Api key for the best security.

## Backwards compatibility

Since the Api Key security scheme is much newer than the Cx platform itself all previously created integrations will work without a key until they are saved within the new portal after the key scheme has been enabled in CX. A warning will pop up before you save to ensure that you provide the right credentials on an upgrade.
