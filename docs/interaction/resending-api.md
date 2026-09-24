---
sidebar_position: 3
title: Resending API
---

Resend messages through Archeo, or call the Connxio API directly. Resending restarts the integration from the beginning using the selected message content and keeps logging under the original InterchangeId.

## Resend from Archeo

### Set up a webhook

1. In Archeo, open **Distribution Channels** in the sidebar and select **Webhooks**.
2. Select **Add new webhook** and give it a descriptive name, such as **Connxio Resend**.
3. Set **Rest Endpoint** to **POST** and enter `https://api.connxio.com/v2/resend/archeo/restart`.
4. Add the `Connxio-Api-Key` header with your Connxio API key. If your environment requires OAuth2, configure the webhook's authorization settings with your environment's credentials.
5. Save the webhook.

### Resend a message

1. Find the message in Archeo and right-click the log step containing the content you want to resend.
2. Select **Resend**.
3. Select the Connxio webhook you configured.

Archeo builds the request and calls the Connxio API automatically. You do not need to assemble the message content URL or metadata yourself.

## Resend through the API

Send a **POST** request to `https://api.connxio.com/v2/resend/archeo/restart`, using the authentication required by your environment and a JSON body matching the Archeo contract.

The minimum request contains the original message's InterchangeId, a URL to its content, and the integration configuration ID:

```json
{
  "transactionId": "<original-interchange-id>",
  "contentSasUri": "<message-content-url>",
  "logStepMetaData": {
    "metadata": {
      "ConfigCorrelatioId": "<integration-configuration-id>"
    }
  }
}
```

- `transactionId`: The original message's InterchangeId, so the resend is logged under the same ID.
- `contentSasUri`: A SAS URL or hosted endpoint from which Connxio can retrieve the message content.
- `logStepMetaData.metadata["ConfigCorrelatioId"]`: The integration configuration to run.

### Request and metadata models

Resending uses the Archeo models below. `LogStepMetaData` is different from the [Connxio integration metadata model](../integrations/metadata.md); use this structure when building a resend request. Archeo fills these models automatically when you resend through a webhook.

```csharp
public class ResendEventRequest
{
    public string TransactionId { get; set; }
    public string ContentSasUri { get; set; }
    public string ResendDateTime { get; set; }
    public LogStepMetaData LogStepMetaData { get; set; }
}

public class LogStepMetaData
{
    public string TransactionId { get; set; }
    public string Description { get; set; }
    public string TransactionTypeName { get; set; }
    public string MessageTypeName { get; set; }
    public string SenderName { get; set; }
    public string RecieverName { get; set; }
    public string StatusName { get; set; }
    public string FileName { get; set; }
    public DateTime Processed { get; set; }
    public Dictionary<string, string> Metadata { get; set; }
}
```

See the [Connxio API reference](/reference/connxio-api) for more details.
