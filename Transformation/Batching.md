# Batching

ConnXio (CX) gives customers the ability to batch messages into larger single units. We do this by creating a bucket where messages are queued for a set interval until they are picked up, ran through a [code mapping](/Transformation/Code%20Mapping.md) and then sent as a single message through the pipeline. There are certain limits to batching functionality that will be explained on this page as well the process of batching itself.

> Batching entails waiting for messages within a set interval and then transforming said messages into a single unit before processing that unit through the CX pipeline

## Limits

There are certain limits imposed upon the batching functionality to not overwhelm the system. These boundaries are fluent and subject to change in the future. As of now the following limits are in effect:

1. MaxMessageBatchCount is set to `1000`
2. ConnXio only supports messages below `100mb` (see [Integration limitations](/Integrations/Limitations.md))

**MaxMessageBatchCount** is a variable that governs how many messages are possible to batch into a single message. If the bucket containing messages is larger than 1000 messages before the batching interval triggers then one message will be created per 1000 messages in the bucket. To use an example:

> 2300 messages are present in the bucket. The interval fires. Three files are created, the first and second file contains 1000 batched messages, the third file contains 300 messages.

This limitation is in place for a number of reasons, the first being that we want to force users to not create files too big for CX to handle. The seconds reason is that each batch is given its own set of resources and currently these resources have their limit set to not create files that will overwhelm external and internal systems. We do have future plans to support large files above 100mb, contact us for more information.

## Creating batching code components

When implementing batching into your integration the first step is to create the code that joins your messages together into a cohesive whole. This is done in more or less the same way as [map code components](/Transformation/Code%20Components.md) but with a few key differences.

Firstly you need to create the mapping itself, see the map components page for a simple rundown of the process, but instead of using the boiler plate detailed for maps you use the one detailed below:

```csharp
public class Initialize
{
    /// <summary>
    /// Method name must be Batch and class name Initialize
    /// </summary>
    /// <param name="messages">A list of the messages picked from the bucket in bytes</param>
    /// <param name="encoding">Added mostly for backwards compatibility, is always utf-8</param>
    /// <returns></returns>
    public string Batch(List<byte[]> messages, Encoding encoding)
    {
        var msgIns = new List<MsgIn>();

        //Make list of objects instead of bytes
        foreach (var message in messages)
        {
            msgIns.Add(JsonConvert.DeserializeObject<MsgIn>(encoding.GetString(message)));
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

        //Return message as string
        return JsonConvert.SerializeObject(msgOut);
    }
}
```

**Upload the component** by using the methods described on the [code components page](/Transformation/Code%20Components.md).
