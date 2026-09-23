---
sidebar_position: 40
---

# Splitting

Splitting breaks one message into multiple smaller messages. Each part is sent through the pipeline independently as a new message.

## Limitations

Connxio supports input files up to `100 MB`. There is no limit on the number of output messages. Each split message is treated as an independent message, with its own [logs](/integrations/logging), [resend events](/connxio-portal/resending-api), and errors.

:::caution
Splitting can generate large amounts of traffic. Test your receiving systems thoroughly before sending production-level loads.
:::

## Configuring Splitting

To configure splitting, select _Splitting_ in the "Transformations" list.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import RequiredNugetPackage from '@site/docs/\_shared/RequiredNugetPackage.mdx';

When you create a new transformation, a popup appears with the splitting input fields.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/splitting-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/splitting-dark.webp#dark-only'),
    }}
  />
</div>

See the sections below for how splitting code and retries work.

## Creating splitting code components

### NuGet package

<RequiredNugetPackage />

Start by creating code that splits a message into multiple output messages. This is similar to [map code components](/integrations/transformation/code-components), but uses the splitting interface.

Use the splitting boilerplate below:

```csharp
using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class MyFirstSplitter : IConnxioSplit
{
    public IEnumerable<TransformationContext> Split(TransformationContext transformationContext)
    {
        // Create object from byte array
        dynamic inboundMessage = JsonConvert.DeserializeObject<dynamic>(transformationContext.Content) ?? throw new ArgumentException("Failed to deserialize inbound message.");

        //Create list that holds new messages
        var output = new List<TransformationContext>();

        //Add elements to list
        foreach (var city in inboundMessage.Cities)
        {
            var outboundMessage = new
            {
                CityName = city.CityName,
                Comment = city.Comment,
                Id = inboundMessage.Id
            };

            output.Add(new TransformationContext
            {
                Content = JsonConvert.SerializeObject(outboundMessage),
                MetaData = transformationContext.MetaData.Copy()
            });
        }

        //Return splitted messages
        return output;
    }
}
```

**Upload the component** using the process on the [code components page](/integrations/transformation/code-components), and select the _splitting_ type.

## Testing and best practices

Connxio can generate messages at ~4000 per second at full capacity, so uncontrolled test runs can produce a lot of traffic and incur costs. Recommended test progression:

1. One file that splits into 2 messages.
2. Two files with 200 messages each.
3. Progressively larger files (multiply by 10) up to production level.

Always test at **peak load × 2** to account for unexpected spikes.

## Retry

Retry behavior depends on where failure occurs:

1. If a transient error happens before the splitting code runs, the original message is returned to the queue and retried up to 10 times.
2. If failure happens after splitting code runs, Connxio retries delivery with increasing delay, then schedules the message through the [disaster pipeline](/integrations/retry).

Retries can delay delivery of split message units. Check your logging provider for warnings; if none appear, contact your representative.
