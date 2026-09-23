---
sidebar_position: 30
---

# Batching

Batching groups multiple messages into one output message.

Messages are queued in a bucket for a configured interval, processed by a batching code component, and then sent through the pipeline as a single message.

## Limitations

Current limits:

1. A single batch can include up to `1000` input messages
2. Connxio supports messages below `100 MB`

If more than 1000 messages are queued when the interval fires, Connxio splits them into multiple batches.

Example:

> If 2300 messages are in the bucket, Connxio creates three output files: 1000, 1000, and 300 messages.

These limits prevent oversized files and protect both internal and external systems from resource spikes. For plans around files above 100 MB, contact your representative.

## Configuring Batching

To configure batching, select _Batching_ in the "Transformations" list.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import RequiredNugetPackage from '@site/docs/\_shared/RequiredNugetPackage.mdx';

When you create a new transformation, a popup appears with the batching input fields.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/batching-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/batching-dark.webp#dark-only'),
    }}
  />
</div>

See the sections below for how batching code, scheduling, and retries work.

## Creating batching code components

### NuGet package

<RequiredNugetPackage />

Start by creating code that combines queued messages into one output payload. This is similar to [map code components](/integrations/transformation/code-components), but uses the batching interface.

Use the batching boilerplate below:

```csharp
using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class MyFirstBatcher : IConnxioBatch
{
    public TransformationContext Batch(IEnumerable<TransformationContext> transformationContexts)
    {
        var msgIns = new List<dynamic>();

        foreach (var transformationContext in transformationContexts)
        {
            msgIns.Add(JsonConvert.DeserializeObject<dynamic>(transformationContext.Content));
        }

        //Create new outbound message
        var message = new
        {
            Type = msgIns[0].Type,
            Values = new List<dynamic>()
        };

        foreach (var msg in msgIns)
        {
            message.Values.Add(msg.Value);
        }

        // Create new transformation context and set content and metadata
        var outTransformationContext = new TransformationContext
        {
            Content = JsonConvert.SerializeObject(message),
            MetaData = transformationContexts.First().MetaData.Copy()
        };

        //Return batched message
        return outTransformationContext;
    }
}
```

**Upload the component** using the process on the [code components page](/integrations/transformation/code-components), and select the _batching_ type.

## Trigger Interval

The trigger interval controls when batching runs.

You can configure it with either a Cron expression or a Batching Trigger Interval.

### Batching Trigger Interval

Set a fixed interval in minutes (minimum: 1), or run once daily at a specific time (`hh:mm`).

### Cron

Use Cron for advanced schedules. Read more [here](/integrations/triggering-interval/#cron).

## Retry

Retry behavior depends on where failure occurs:

1. If a transient error happens before the batching code runs, messages are returned to the queue and retried after 60 seconds.
2. If failure happens after batching code runs, Connxio retries send attempts with increasing delay, then schedules the message through the [disaster pipeline](/integrations/retry).

Retries can produce smaller output files than expected. Check your logging provider for warnings; if none appear, contact your representative.
