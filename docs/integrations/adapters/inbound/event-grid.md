# Event Grid

The Azure Event Grid inbound adapter in Connxio allows seamless integration with Azure Event Grid, a fully managed event routing service. With this adapter, users can receive and process events published to Azure Event Grid in their Connxio integrations.

<details>
<summary>Limitations</summary>
<p>
At this point in time we only support the Blob Storage for Event Grid. Adding new options is possible, please contact us if you need other options.
<br />
<br />
If you're integration experiences peak traffic of several thousand messages per second, we recommend using a <a href="/integrations/adapters/inbound/service-bus">queue system</a> instead.
</p>
</details>

## Configuring the Azure Event Grid adapter

To configure Connxio to start processing your event grid events select the Event Grid option in "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

A new window pops up with the input fields for the adapter's properties:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/eventgrid-properties-light.jpg'),
      dark: useBaseUrl('/img/docs/eventgrid-properties-dark.jpg#dark-only'),
    }}
  />
</div>

<br />

The following properties are used to configure the adapter:

- **Use event as Content**: Turn this switch on if you want the EventGrid event to be sent as content to the Connxio Engine. You do not need the *Connection String* and *Container List* properties when this option is enabled.
- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the connection string to the Storage Account that holds the data represented by the message sent to the API from Event Grid.
- **Event Grid Blob Container Name List**: A comma separated list over possible containers referenced in the EventGrid message.
- **Use SAS URI authentication**: Enable this option to treat the connection as a SAS URI. Useful when connecting to ADLS Gen2 datalake accounts.

## Configuring Event Grid endpoints in Azure

To configure Event Grid to send events to Connxio, please [review the API documentation here](/reference/post-api-v-3-messages-integration-id-eventgrid).

We use the **Event Grid Schema** Event Schema. Be sure to select the right one when creating an event subscription in Azure. After the Schema type is set you need to select your event types and the endpoint details. Use the **Web Hook** event type and add the Connxio endpoint.The Url should look something like this `https://api.connxio.com/v2/messages/{integrationId}/eventgrid?Connxio-Api-Key={apiKey}&Connxio-Api-Webhook=true`

## Event only handling

When using the *Use event as Content* option you are required to handle the event manually. The easiest way to accomplish this is to extract the blob name from the `Url` parameter with a Code Mapping and use it with the [Blob Get transformation](/integrations/transformation/blob-get).

The **Event Grid Schema** model looks like this:

```csharp
public class EventGridMessage
{
    public string? Topic { get; set; }
    public string? Subject { get; set; }
    public string? EventType { get; set; }
    public DateTime EventTime { get; set; }
    public string? Id { get; set; }
    public object Data { get; set; } = null!;
    public string? DataVersion { get; set; }
    public string? MetadataVersion { get; set; }
}

public class EventGridData
{
    public string? ValidationCode { get; set; }
    public string? ValidationUrl { get; set; }
    public string? Api { get; set; }
    public string? ClientRequestId { get; set; }
    public string? RequestId { get; set; }
    public string? ETag { get; set; }
    public string? ContentType { get; set; }
    public int ContentLength { get; set; }
    public string? BlobType { get; set; }
    public string Url { get; set; } = null!;
    public string? Sequencer { get; set; }
    public Storagediagnostics? StorageDiagnostics { get; set; }
}

public class Storagediagnostics
{
    public string? BatchId { get; set; }
}
```

The `Url` parameter on the `EventGridData` object contains the full blob Uri and looks something like this: `"url": "https://temptestcx.blob.core.windows.net/jonmeventgrid/test.txt"`. To extract just the name from the Url you can use the following Regex function:

```csharp
private static string GetNameFromBlobUrl(string blobUrl)
{
    string pattern = @"https?://[^/]+/[^/]+/(.+)";

    Match match = Regex.Match(blobUrl, pattern);

    if (!match.Success)
    {
        throw new Exception($"Failed to find path for file with url {blobUrl}");
    }

    return match.Groups[1].Value;
}
```

The mapping function would then look something like this:

```csharp
public TransformationContext Map(TransformationContext transformationContext)
{
    EventGridMessage eventGridMessage = JsonConvert.DeserializeObject<EventGridMessage>(transformationContext.Content)!;
    EventGridData eventGridData = JsonConvert.DeserializeObject<EventGridData>(eventGridMessage.Data.ToString()!)!;

    transformationContext.MetaData.UserDefinedProperties.Add("blobName", GetFileNameFromBlobUrl(eventGridData.Url));

    return transformationContext;
}
```

The name of the blob is now stored in the `blobName` *User Defined* property and can be used with CxMal. The next step is to use the name we just extracted to get the blob before using the contents as needed in the integration flow.

## Retry

Retry on Event Grid is handled by the Event Grid itself. Please refer to the [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/event-grid/delivery-and-retry).
