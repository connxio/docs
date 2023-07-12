# ACK

Connxio (CX) provides users with the option to receive acknowledgement (ACK) events when a message has been delivered to the receiving system. The concept of sending ACK messages is inspired by the [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment) protocol and gives our customers the ability to verify that a message has been delivered successfully in close to real time. When enabled, this feature supplies an external system with an event with contents supplied by using the standard CX [code mapping functionality](/integrations/transformation/code-components), which makes the ACK message extremely powerful as it can contain almost anything, even the delivered message itself. This page describes how to enable this functionality and common use cases.

## Limitations

Be aware that enabling ACK messages **multiplies traffic by two**. We count all messages that are sent from CX and ACK messages are counted towards this number. Be ready and able to receive the same peak traffic on the ACK receiver as on the normal receiving endpoint.

## Use cases

Ack messages can be used in a variety of scenarios. The most common ones are ensuring delivery, reacting to delivery or keeping track of delivery.

### Ensuring delivery

Using ACK's you can ensure delivery in the source system by reacting to negative ACK messages and resending messages automatically when failures happen. You can also change the delivery status in the source system for later manual processing.

### Reacting to delivery

Reacting to delivery entails performing en action when something is delivered, this could include starting a new CX flow or a separate internal integration pipeline or process. Take en example where a customer is migrated to a new system, and access rights have to be sent after the user is stored in the receiver system. An ACK could be sent to update the originating system with the user created status and an automatic process could start the user access update.

Reactions could also include alert from internal systems or logging providers like Slack, Teams or Archeo. This can also be handled by [logging events](/integrations/logging) but ACK messages can represent another pipeline and since the message is ensured delivered it represents an unique opportunity to react to the delivery itself without any extra rules or customization.

### Keeping track of delivery

Especially for RESTful Api's keeping track of what has been retrieved can be a hassle. Consider the following scenario: you fetch resources from an Api endpoint that hosts changes to data every 5 minutes and put these changes in an external Api. The polling interval triggers and the data is transferred successfully. 5 minutes passes and the interval triggers again, how do you only migrate the new changes? Well, a simple solution would be to have a separate endpoint that receives events describing what data has been transferred. USing ACK messages you map to the correct format and tell the originating Api that the data has been transferred and that the change can be removed from the fetch endpoint. This scenario has its pitfalls and can cause duplicates if the interval is too long or something fails, but these pitfalls are manageable and will enable you to fetch changes from said receiving endpoint successfully.\
This is just one of the many uses for tracking delivery, but this example illustrates the potential benefits of using ACK message sin this way.

## Configuring Acknowledgments

Ack delivery can be configured on all outbound adapters in CX. You can use any outbound adapter to deliver the ACK as well. So say you want to deliver the message data itself through Sftp, you can still deliver the ACK through Service Bus or Rest to another part of the system or another system entirely. To start sending ACK messages enable the "Send Acknowledgment" switch in the outbound adapter window:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Ack%20enable%20on%20adapter.png?sv=2020-08-04&st=2021-11-16T11%3A14%3A39Z&se=2040-11-17T11%3A14%3A00Z&sr=b&sp=r&sig=nxGH1A8rQw7uw1XSoda0nusLAJEh1UW4752GPHGy4GQ%3D)

When you enable the "Send Acknowledgment" switch a menu pops up, if you need to enter this menu at a later time use the "Edit Ack options" button depicted above. Configure the Ack options window like so to start sending ACK messages:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Ack%20Options%20config.png?sv=2020-08-04&st=2022-01-11T12%3A32%3A18Z&se=2040-01-12T12%3A32%3A00Z&sr=b&sp=r&sig=nixBhAC%2BcjSGQl6ql1L6Z0DlaO%2FX0LaHDYZzl%2BwS%2Bj4%3D)

- **Code Acknowledgement Map (Code Component)**: The *Code Component* is selected as described in the [Code Components](/integrations/transformation/code-components) section.
- **Outbound file format**: Only applicable if the adapter delivers a file and denotes the file format and ending of the file.
- **Adapter Type**: The type of adapter to use to deliver the ACK message. All adapter configuration is explained under the `Adapters` header.

When acc is enabled for an adapter the adapter will display an icon like this in the master view:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Ack%20icon%20image.png?sv=2020-08-04&st=2021-11-16T11%3A33%3A15Z&se=2040-11-17T11%3A33%3A00Z&sr=b&sp=r&sig=wre4L15vsKCLNXyHC1xrnH6GMe80RCUNvF4AFeROJsk%3D)

## Creating Ack code components

Creating an Ack code component is done in more or less the same way as [map code components](/integrations/transformation/code-components). The only differences are that an Ack code componenet requires the 'IConnXioAck' interface and that is takes 'bool success' as a parameter.

```csharp
    public class Mapper : IConnXioAck
    {
        public TransformationContext Map(TransformationContext transformationContext, bool success)
        {
            //Add error handling as necessary, this will give better error messages in the logs
            if (transformationContext.Content == null)
                throw new ArgumentException("Message field is null");

            //You can use newtonsoft and other basic nuget packages. Contact the CX team if you need a non supported package.
            dynamic obj = JsonConvert.DeserializeObject(transformationContext.Content);

            //Creating an instance of the ACK message to send
            CustomAck ACK = new CustomAck
            {
                Id = obj.Id,
                SuccessfulDelivery = success
            };

            //Replace content in the original TransformationContext with the new ACK content
            transformationContext.Content = JsonConvert.SerializeObject(ACK);

            //Return string representation of the ACK
            return transformationContext;
        }
    }    

    public class CustomAck
    {
        public string Id { get; set; }
        public bool SuccessfulDelivery { get; set; }
    }
```

## Retry

Acknowledgments use the same retry mechanism as the corresponding outbound adapter. Ie. if the ACK is sent by Sftp then the retry mechanisms for Sftp is used. These mechanisms are detailed per adapter under the `Adapter -> Outbound` heading.