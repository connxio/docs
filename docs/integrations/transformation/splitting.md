---
sidebar_position: 4
---

# Splitting

Connxio (CX) gives customers the ability to split messages into smaller units. We do this by running the content through a [Code Component](/integrations/transformation/code-components) that defines how the file should be split and then sends the smaller units through the pipeline as new messages. This page describes how to utilize the splitting functionality.

## Limitations

There are very few limits to splitting the only one being that we support files up to `100mb` only. However, you can split files into any amount of messages, and process them in any shape or form in further transformations. After the splitting is run all files will be handled as a unique message inside CX which means they will generate separate [logs](/integrations/logging), [resend-events](/api/resending-api) and errors.

> Splitting can generate enormous amounts of traffic. Be sure that you test your receiving systems thoroughly before you send production level loads.

## Testing and best practices

Splitting requires special care when testing since it can generate millions of messages in a short amount of time. CX has a heavily tuned splitting algorithm that utilizes parallelization to generate messages in a rate of about 4000 per second at full capacity. This means that we recommend the following test pipeline:

1. Test you integration with a single file that splits into 2 messages.
2. Add 2 files with 200 messages.
3. Test 2 files with progressively larger loads (we recommend multiplying by 10 at a time) until you reach production level.

Obviously you can ignore steps that are unrealistic for production level load, ie. if you are estimating a load of 10 messages a day you can go straight to testing with production load levels. We do ask that you test for **peak load traffic** multiplied by 2. This adds stability for unexpected scenario's as well a prepares the receiving system for future load.\
 The reason for this recommended testing pipeline is that testing generates traffic which is payable, and we do not want our customers to incur costs for failed test runs caused by non-tested code and bad setup.

## Creating splitting code components

When implementing splitting into your integration the first step is to create the code that splits your message into smaller components. This is done in more or less the same way as [map code components](/integrations/transformation/code-components) but with a few key differences.

Firstly you need to create the splitting code itself, see the code components page for a simple rundown of the process, but instead of using the boiler plate described there for maps you use the for splitting detailed below:

```csharp
public class MyFirstSplitter : IConnXioSplit
{
    public IEnumerable<TransformationContext> Split(TransformationContext transformationContext)
    {
        // Create object from byte array
        MyInboundMessageType inboundMessage = JsonConvert.DeserializeObject<MyInboundMessageType>(transformationContext.Content);

        //Create list that holds new messages
        List<TransformationContext> outboundTransformationContexts = new List<TransformationContext>();

        //Add elements to list
        foreach (var city in inboundMessage.Cities)
        {
            var outboundMessage = new MyOutboundMessageType
            {
                CityName = city.CityName,
                Comment = city.Comment,
                Id = inboundMessage.Id
            };

            outboundTransformationContexts.Add(new TransformationContext
            {
                Content = JsonConvert.SerializeObject(outboundMessage),
                MetaData = transformationContext.MetaData.Copy()
            });
        }

        //Return new messages as list
        return outboundTransformationContexts;
    }
}
```

**Upload the component** by using the methods described on the [code components page](/integrations/transformation/code-components). Remember to choose the _splitting_ type.

## Retry

Splitting has multiple retry patterns that differ based on which step of the splitting process that fails. If the process fails on transient errors before running the splitting code component the system puts the original messages back in queue and tries again 10 times. If the failure is happens after running the splitting code the algorithm tries to send the message to the next pipeline step multiple times with increasing delay until the message is scheduled for retry through the [disaster pipeline](/integrations/retry).

REtry can end up causing delays in the delivery of splitted message units. If you experience problems like this, your logging provider should have received warnings about the fault, if not please contact your representative.
