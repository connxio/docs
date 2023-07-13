---
sidebar_position: 3
title: 'Get a single integration'
---

# Get all integrations

This endpoint retrieves a specific integration based on the given integrationConfigId. Users can access detailed information about a particular integration, including its configuration settings, adapter details, and associated endpoints.

**URL:** `https://api.connxio.no/integrations/:integrationConfigId`

**Method:** <span class="method get">GET</span>

**Route Parameters:**

| Key        | Type   | Description |
| ---------- | ------ | ----------- |
| integrationConfigId | string | The ID of the integration configuration to use when sending the message. |

### **Example request**

```json
// GET https://api.connxio.no/integrations/ff6f3ea2-0738-482f-aade-b1782fe3fb29

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