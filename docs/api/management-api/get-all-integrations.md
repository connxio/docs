---
sidebar_position: 2
title: 'Get all integrations'
---

# Get all integrations

Use this endpoint to get a list of all integration configurations associated with the company. It provides an overview of the existing integrations, allowing users to view integration details and configurations.

**URL:** `https://api.connxio.no/integrations`

**Method:** <span class="method get">GET</span>

### **Example request**

```json
// GET https://api.connxio.no/integrations

// RESPONSE
// 200 OK
[
    {
        "id": "55203f92-6349-42d5-bd72-96094a7e4b25",
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
]

```