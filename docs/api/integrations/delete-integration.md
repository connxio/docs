---
sidebar_position: 5
title: 'Delete an integration'
---

# Delete an integration

This endpoint enables deletion of an integration from Connxio. By providing the necessary parameters, users can remove an integration and its associated configuration from their subscription.

**URL:** `https://api.connxio.no/integrations/:integrationConfigId`

**Method:** <span class="method delete">DELETE</span>

**Route Parameters:**

| Key        | Type   | Description |
| ---------- | ------ | ----------- |
| integrationConfigId | string | The ID of the integration configuration to use when sending the message. |

### **Example request**

```json
// DELETE https://api.connxio.no/integrations/ff6f3ea2-0738-482f-aade-b1782fe3fb29

// RESPONSE
204 No Content
```