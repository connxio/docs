---
sidebar_position: 4
title: 'Create or update an integration'
---

# Create or update an integration

This endpoint allows for creating or updating an integration within Connxio. Users can programmatically configure the integration properties using the same properties available in the Connxio Web Portal UI. This endpoint supports creating new integrations or updating existing ones.

**URL:** `https://api.connxio.no/integrations/:integrationConfigId`

**Method:** <span class="method post">POST</span>

**Route Parameters:**

| Key        | Type   | Description |
| ---------- | ------ | ----------- |
| integrationConfigId | string | The ID of the integration configuration to use when sending the message. |


**Request body:** 

| Key        | Type   | Optional | Description |
| ---------- | ------ | -------- | ----------- |
| id | string | no | The ID of the integration. Required when updating an existing integration. |
| name | string | no | The name of the integration. |
| description | string | no | A description of the integration. |
| sender | string | no | The name of system that sends the data. |
| receiver | string | no | The name of receiving system. |
| enabled | boolean | no | Whether the integration is enabled. |
| inboundConnection | object | no | Configuration of the inbound connection. |
| subIntegrations | array | no | Configuration of the subintegrations. |
// TODO: Finish this

### **Example request**

```json
// POST https://api.connxio.no/integrations

// REQUEST BODY
{
    "id": "ff6f3ea2-0738-482f-aade-b1782fe3fb29",
    "name": "Integration1",
    "description": "The first integration",
    "sender": "sender",
    "receiver": "receiver",
    "inboundConnection" {
        ...
    },
    "subintegrations: [
        ...
    ]
    ...
}

// RESPONSE
// 200 OK
{
    "id": "ff6f3ea2-0738-482f-aade-b1782fe3fb29",
    "name": "Integration1",
    "description": "The first integration",
    "sender": "sender",
    "receiver": "receiver",
    "companyId": "46f669ca-9770-490b-8183-34f88a6f2f0b",
    "companyName": "Company1",
    "subscriptionId": "c6c18345-65c3-46fb-af2f-30d223b08cc0",
    "subscriptionName": "Subscription1",
    "inboundConnection" {
        ...
    },
    "subintegrations: [
        ...
    ]
    ...
}

```