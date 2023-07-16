---
sidebar_position: 6
title: 'Get all subscriptions'
---

# Get all subscriptions

This endpoint retrieves a list of all subscriptions associated with the company. Each integration within Connxio is linked to a subscription ID, allowing the owner to manage and organize their integrations based on different subscriptions.

**URL:** `https://api.connxio.no/subscriptions`

**Method:** <span class="method get">GET</span>

### **Example request**

```json
// GET https://api.connxio.no/subscriptions

// RESPONSE
// 200 OK
[
    {
        "id": "6714b8f3-1a1f-484b-823b-1e1fc918e229",
        "name": "Subscription1",
        "active": true,
        "companyId": "83fc1f10-ab7f-4c0c-a289-57dfb52e73d4",
        "companyName": "Company1"
    },
    {
        "id": "443365db-e94d-499c-abdc-e502356b2a3b",
        "name": "Subscription2",
        "active": true,
        "companyId": "8b3c0f1d-8eda-47b4-bf53-896f51ea5d0b",
        "companyName": "Company1"
    }
]

```