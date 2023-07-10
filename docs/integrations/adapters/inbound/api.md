# Connxio API

The Connxio (CX) Api is reachable through our [Api Management](https://azure.microsoft.com/en-us/services/api-management/?&ef_id=CjwKCAjwwsmLBhACEiwANq-tXF5xcD2EmPBq9wtxn2fHg1vExNIvKK1siM9sKzYFiT56qywH12O1QxoCAykQAvD_BwE:G:s&OCID=AID2200230_SEM_CjwKCAjwwsmLBhACEiwANq-tXF5xcD2EmPBq9wtxn2fHg1vExNIvKK1siM9sKzYFiT56qywH12O1QxoCAykQAvD_BwE:G:s&gclid=CjwKCAjwwsmLBhACEiwANq-tXF5xcD2EmPBq9wtxn2fHg1vExNIvKK1siM9sKzYFiT56qywH12O1QxoCAykQAvD_BwE#overview) (APIM) proxy and gives customers the ability to push messages through the CX pipeline with webhooks as well as use direct transformation endpoints that uses CX's internal logic to [map](/integrations/transformation/code-components), [split](/integrations/transformation/splitting) or [batch](/integrations/transformation/batching) messages with code components within their own flows. This page describes the api including information and resources needed to use it.

## Api definition

The Api definition can be found in the Api swagger here: <https://cmh-prod-api-wa.azurewebsites.net/index.html>. This swagger is hosted by the Api url itself but you will not be able to contact the Api on this url. To be able to contact the api you need to use the APIM endpoint found here: `https://cmh-messagehub-apim-prod.azure-api.net`. Don't mind the "messagehub" name, this is the earlier moniker for Connxio before we implemented our name-change, in the future we will change the url as well, but the old one will always be operational.

This definition is based on established [swagger](https://swagger.io/resources/articles/documenting-apis-with-swagger/) documentation, but we have disabled the test feature for non-communicate employees. If you need to test the Api manually please do so through tools like [postman](https://www.postman.com/).

## Authorization

To be able to send messages to CX you need to authorize yourself as a CX customer. We support several different credential schemes; Oauth, Basic and EventGrid.

All endpoints also require you to supply a [subscription header](https://docs.microsoft.com/en-us/azure/api-management/api-management-subscriptions), this basically works as a form of authorization since only valid keys let you access the api. We will show more complete examples later, but a subscription header looks like this: `Ocp-Apim-Subscription-Key:007603d399999999xxxx9964y91x7x29`.

### OAuth

Oauth is a complex authorization mechanism, read more about it here: <https://oauth.net/getting-started/>

To get access to the CX Api you need to contact us through your contact point and order a set of 5 keys:

- client_id
- client_secret
- grant_type
- resource
- uri

When you have these 5 keys you send a request like described in the curl code below:

```curl
curl --location --request POST 'https://suppliedbycommunicate.com/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={client_id}' \
--data-urlencode 'client_secret={client_secret}' \
--data-urlencode 'grant_type={grant_type}' \
--data-urlencode 'resource={resource}'
```

This returns a token that you add into the Authorization header as `Authorization:Bearer {token}`.

### Basic

We do allow our customers to use basic authentication for webhook flows. This is done by adding the [Api Key](#api-key) header to the request and enabling webhook functionality for the key. Keep in mind that we do *not* recommend using basic auth unless it is absolutely necessary. Be very particular with key management and do not use the same key for basic webhooks and other endpoints.

### Api Key

To add a layer of extra security to the CX Api we added a basic user controlled security key which is configured on the *Api Key* page. This key is sent within the special header key `Connxio-Api-Key` and can be limited and deprecated as needed. See the [Api Key page](/connxio-portal/apikey) for more information.

Api key is used in tandem with other security and does not replace other security measures like OAuth and APIM sub key.

### Event Grid

Event Grid is used extensively inside Azure and is a framework for building event based architecture on top of Azure components. Read more about eventgrid here <https://docs.microsoft.com/en-us/azure/event-grid/overview>. We support eventgrid, and if you follow the directions provided by Microsoft all you should need to do is point your eventgrid url to the Event Grid endpoint at `/api/EventGrid`. You need to supply the endpoint with a set of query parameters like so: `/api/EventGrid?ConfigCorrelationId={guid}&InterchangeId={guid}`. The only required parameter is CorrelationId. DocumentType, ReceiverId and SenderId are obsolete. FileName supplies the pipeline with a FileName parameter that can be used in [variable replacement](/connxio-portal/variables/variable-replacement) and InterchangeId supplies the pipeline with a custom InterchangeId like described [here](/concepts/core-concepts).

Event Grid uses an Api Key in the same was as [basic auth](#basic) and falls under the *webhook* banner as well.

## Enable message delivery

Even if you have all the authorization and message delivery handled CX will not allow you to communicate with the API unless you have set up an integration and configured it to receive messages through the API. To do this you click the "Inbound Connection" shape and simply select the "Api" option. No other configuration is necessary.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Api%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A49%3A45Z&se=2040-10-28T12%3A49%3A00Z&sr=b&sp=r&sig=OXEdJEImDuRRfHTzsSm%2Bm54TEFILE1itF%2FPRWfUbr2o%3D)

## Correlation Id

All request **need to contain a valid CorrelationId** for CX to be able to process them. This Id can be found on your integrations inside the portal. CorrelationId refers to which integration is to be run on your message, CorrelationId explained in more detail inside the [Core Concepts page](/concepts/core-concepts).

## Endpoints

Cx supplies three endpoint for pure message delivery. All endpoint end up with the same result but allow for different use cases:

1. `/api/message` lets you supply your parameters as query parameters. This is excellent for scenarios where you do not have access to the message body or are setting up the request through a third party. The body of the request is treated as the raw message body.
2. `/api/message/new` this endpoint lets you supply messages in a ordered JSON format. This lets you supply your message with your chosen encoding in the `messageBody` parameter as base64 encoded bytes. This is more code heavy way of communicating with the Api and lets you have total control over your message body and parameters without having to deal with the peculiars of Urls and query parameters.
3. `/api/Message/new/batch` does the exact same thing as **2** but lets you supply an array to the Api. This cuts down on traffic and is easier to handle in large traffic scenarios. As such delivering messages as batches may speed up message processing.

## Request Example

After ensuring you have the right Url and security credentials a valid request should look something like this:

>DocumentType, RecieverId and SenderId are obsolete.

### /api/message

```curl
curl --location --request POST 'https://cmh-messagehub-apim-prod.azure-api.net/api/message?ConfigCorrelationId=xxxx-xxx-xxxx-xxxxx-xxxxxxx' \
--header 'Content-Type: application/json' \
--header 'Ocp-Apim-Subscription-Key: xxxxxxxxxxxxxxxxxxxxx' \
--header 'Authorization: Bearer {token}' \
--data-raw '{
 "Prop": "Superdupertest"
}'
```

### /api/message/new

```curl
curl --location --request POST 'https://cmh-messagehub-apim-prod.azure-api.net/api/message/new' \
--header 'Content-Type: application/json' \
--header 'Ocp-Apim-Subscription-Key: 631373d321784590baff7464d91a7c69' \
--header 'Authorization: Bearer {token}' \
--data-raw '{
  "messageEncoding": "utf-8",
  "configCorrelationId": "xxxx-xxxx-xxx-xxx-xxx",
  "interchangeId": "x1xx-1xxx-xxx-111-x1x",
  "messageBody": "ewoJIlByb3AiOiAiU3VwZXJkdXBlcnRlc3QiLAoJIlByb3AiOiAiU3VwZXJkdXBlcnRlc3QiLAoJIlByb3AiOiAiU3VwZXJkdXBlcnRlc3QiCn0=",
  "fileName": "myfile"
}'
```

## Retry

Be aware that when using our Api you are required to handle all retry on the client side. Our regular SLA is in effect at all times but hiccups can happen within all network infrastructure and should be assessed and handled as needed.
