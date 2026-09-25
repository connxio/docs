import PropertyReference from '@site/src/components/PropertyReference';
import Link from '@docusaurus/Link';

# Azure Event Grid

The Event Grid trigger receives Azure Event Grid events and sends the event itself or the referenced blob content into the Connxio pipeline.

## Configure the trigger

Add an Event Grid trigger to your integration and configure the settings below.

## Event settings

<PropertyReference properties={[
{
name: "Use event as content",
description: "When enabled, sends the Event Grid event itself as the message content for subsequent actions. When disabled, Connxio retrieves the referenced blob content using the storage settings below.",
},
{
name: "Security configuration",
description: <>Shown and required when <strong>Use event as content</strong> is disabled. Select the <Link to="/integrations/security-configurations/">security configuration</Link> for the storage account containing the referenced blobs. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Blob containers (comma separated)",
description: <>Shown and required when <strong>Use event as content</strong> is disabled. Enter at least one container that events can reference. Separate multiple container names with commas.</>,
example: "container1, container2",
},
]} />

## Advanced settings

<PropertyReference properties={[
{
name: "Use SAS URI authentication",
description: "Treats the connection as a SAS URI. Use this when connecting with a SAS URI, such as for an ADLS Gen2 data lake account.",
},
{
name: "Wrapper",
description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
},
]} />

## Configure the Azure endpoint

Create an event subscription in Azure using **Event Grid Schema** and the **Web Hook** endpoint type. Select the events to send and configure the Connxio endpoint using the [Event Grid API reference](/reference/post-api-v-3-messages-integration-id-eventgrid).

## Event only handling

When **Use event as content** is enabled, subsequent actions handle the event. To retrieve its blob content, extract the blob name from `data.url` in a Script action and pass it to the [Azure Blob action](../actions/azure-storage/azure-blob.md).

### Event model

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

### Extract the blob name

Add a Script action after the trigger. This example reads `data.url` from the event JSON and stores the blob path, including any subdirectories, in the `blobName` user-defined property. It leaves the message content unchanged.

```javascript
const execute = (event) => {
  const message = JSON.parse(event.content);
  const blobUrl = message.data?.url;
  const match =
    typeof blobUrl === "string"
      ? blobUrl.match(/^https?:\/\/[^/]+\/[^/]+\/([^?#]+)/)
      : null;

  if (!match) {
    throw new Error("The event must contain a valid blob URL in data.url.");
  }

  if (!event.metadata) {
    event.metadata = {};
  }
  if (!event.metadata.userDefinedProperties) {
    event.metadata.userDefinedProperties = {};
  }
  event.metadata.userDefinedProperties.blobName = decodeURIComponent(match[1]);

  return event;
};
```

Use the `blobName` user-defined property in the Blob Get action to retrieve the content.

## Retry

Azure Event Grid handles delivery retries. See Microsoft's [delivery and retry documentation](https://learn.microsoft.com/en-us/azure/event-grid/delivery-and-retry).

## Limitations

Connxio currently supports Blob Storage events. Contact support if you need another event source.

For peak traffic of several thousand messages per second, use a queue-based trigger such as [Service Bus](./service-bus.md).
