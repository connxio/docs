---
sidebar_position: 3
---

# Batching

Connxio gives customers the ability to batch messages into larger single units. We do this by creating a bucket where messages are queued for a set interval until they are picked up, run through a [code mapping](/integrations/transformation/code-components) and then sent as a single message through the pipeline. There are certain limits to batching functionality that will be explained on this page as well the process of batching itself.

> Batching entails waiting for messages within a set interval and then transforming said messages into a single unit before processing that unit through the Connxio pipeline

## Limitations

There are certain limits imposed upon the batching functionality to not overwhelm the system. These boundaries are fluent and subject to change in the future. As of now the following limits are in effect:

1. MaxMessageBatchCount is set to `1000`
2. Connxio only supports messages below `100mb`

**MaxMessageBatchCount** is a variable that governs how many messages are possible to batch into a single message. If the bucket containing messages is larger than 1000 messages before the batching interval triggers then one message will be created per 1000 messages in the bucket. To use an example:

> 2300 messages are present in the bucket. The interval fires. Three files are created, the first and second file contains 1000 batched messages, the third file contains 300 messages.

This limitation is in place for a number of reasons, the first being that we want to force users to not create files too big for Connxio to handle. The seconds reason is that each batch is given its own set of resources and currently these resources have their limit set to not create files that will overwhelm external and internal systems. We do have future plans to support large files above 100mb, contact us for more information.

## Configuring Batching
To configure Connxio to use code mapping as a transformation, select *Batching* in the "Transformations" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/transformations-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/transformations-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new transformation, a popup with the transformation's input fields will appear. 

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/batching-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/batching-dark.webp#dark-only'),
    }}
  />
</div>

Read more below on how 
the Batching transformation works.

## Creating batching code components

When implementing batching into your integration the first step is to create the code that joins your messages together into a cohesive whole. This is done in more or less the same way as [map code components](/integrations/transformation/code-components) but with a few key differences.

Firstly you need to create the batching code itself, see the map components page for a simple rundown of the process, but instead of using the boiler plate detailed for maps you use the one detailed below:

```csharp
public class MyFirstBatcher : IConnXioBatch
{
    public TransformationContext Batch(IEnumerable<TransformationContext> transformationContexts)
    {
        var msgIns = new List<MsgIn>();

        //Make list of objects instead of bytes
        foreach (var transformationContext in transformationContexts)
        {
            msgIns.Add(JsonConvert.DeserializeObject<MsgIn>(transformationContext.Content));
        }

        //Create new outbound message
        var msgOut = new MsgOut();

        //Add content to new message
        msgOut.Type = msgIns[0].Type;
        msgOut.Values = new List<string>();

        foreach (var msg in msgIns)
        {
            msgOut.Values.Add(msg.Value);
        }

        TransformationContext outTransformationContext = new TransformationContext
        {
            Content = JsonConvert.SerializeObject(msgOut),
            MetaData = transformationContexts.First().MetaData.Copy()
        };

        //Return message as string
        return outTransformationContext;
    }
}
```

**Upload the component** by using the methods described on the [code components page](/integrations/transformation/code-components). Remember to choose the *batching* type.

## Trigger Interval
The trigger interval plays a pivotal role in orchestrating the execution timing of batching operations within the integration framework. It serves as a mechanism to precisely control when the batching process is initiated.

This interval can be configured using one of two methods: Cron expressions or Batching Trigger Interval.

### Batching Trigger Interval
The Batching Trigger Interval provides a straightforward approach to schedule batching operations. Users can specify a time interval in minutes, with a minimum limit of one minute. Alternatively, users can opt to trigger the batching operation at a specific time of day, defined in the format hh:mm.

### Cron
The Cron feature offers advanced scheduling capabilities for precise and flexible data retrieval. Using Cron expressions, users can define intricate time-based schedules to orchestrate batching operations according to their specific requirements.
Read more about Cron [here](/integrations/triggering-interval/#cron).

## Retry

Batching has multiple retry patterns that differ based on which step of the batching process that fails. If the process fails on transient errors before running the batching code component the system puts messages back in queue and tries again 60 seconds later. If the failure is happens after running the batching code the algorithm tries to send the message multiple times with increasing delay until the message is scheduled for retry through the [disaster pipeline](/integrations/retry).

Retry can end up sending smaller files than anticipated. If you experience problems like this, your logging provider should have received warnings about the fault, if not please contact your representative.
