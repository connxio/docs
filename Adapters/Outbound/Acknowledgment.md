# Acknowledgements

- [Acknowledgements](#acknowledgements)
  - [Limitations](#limitations)
  - [Use cases](#use-cases)
    - [Ensuring delivery](#ensuring-delivery)
    - [Reacting to delivery](#reacting-to-delivery)
    - [Keeping track of delivery](#keeping-track-of-delivery)
  - [Configuring Acknowledgments](#configuring-acknowledgments)
  - [Retry](#retry)

ConnXio (CX) provides users with the option to receive acknowledgement (ack) events when a message has been delivered to the receiving system. The concept of sending ACK messages is inspired by the [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment) protocol and gives our customers the ability to verify that a message has been delivered successfully in close to real time. When enabled, this feature supplies an external system with an event with contents supplied by using the standard CX [code mapping functionality](/Transformation/Code%20Mapping.md), which makes the ACK message extremely powerful as it can contain almost anything, even the delivered message itself. This page describes how to enable this functionality and common use cases.

## Limitations

Be aware that enabling ack messages **multiplies traffic by two**. We count all messages that are sent from CX and ack messages are counted towards this number. Be ready and able to receive the same peak traffic on the ack receiver as on the normal receiving endpoint.

## Use cases

Ack messages can be used in a variety of scenarios. The most common ones are ensuring delivery, reacting to delivery or keeping track of delivery.

### Ensuring delivery

Using ack's you can ensure delivery in the source system by reacting to negative ack messages and resending messages automatically when failures happen. You can also change the delivery status in the source system for later manual processing.

### Reacting to delivery

Reacting to delivery entails performing en action when something is delivered, this could include starting a new CX flow or a separate internal integration pipeline or process. Take en example where a customer is migrated to a new system, and access rights have to be sent after the user is stored in the receiver system. An ack could be sent to update the originating system with the user created status and an automatic process could start the user access update.

Reactions could also include alert from internal systems or logging providers like Slack, Teams or Archeo. This can also be handled by [logging events](/Logging.md) but ack messages can represent another pipeline and since the message is ensured delivered it represents an unique opportunity to react to the delivery itself without any extra rules or customization.

### Keeping track of delivery

Especially for RESTful Api's keeping track of what has been retrieved can be a hassle. Consider the following scenario: you fetch resources from an Api endpoint that hosts changes to data every 5 minutes and put these changes in an external Api. The polling interval triggers and the data is transferred successfully. 5 minutes passes and the interval triggers again, how do you only migrate the new changes? Well, a simple solution would be to have a separate endpoint that receives events describing what data has been transferred. USing ack messages you map to the correct format and tell the originating Api that the data has been transferred and that the change can be removed from the fetch endpoint. This scenario has its pitfalls and can cause duplicates if the interval is too long or something fails, but these pitfalls are manageable and will enable you to fetch changes from said receiving endpoint successfully.\
This is just one of the many uses for tracking delivery, but this example illustrates the potential benefits of using ack message sin this way.

## Configuring Acknowledgments

Ack delivery can be configured on all outbound adapters in CX. You can use any outbound adapter to deliver the ack as well. So say you want to deliver the message data itself through Sftp, you can still deliver the ack through Service Bus or Rest to another part of the system or another system entirely. To start sending ack messages enable the "Send Acknowledgment" switch in the outbound adapter window:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Ack%20enable%20on%20adapter.png?sv=2020-08-04&st=2021-11-16T11%3A14%3A39Z&se=2040-11-17T11%3A14%3A00Z&sr=b&sp=r&sig=nxGH1A8rQw7uw1XSoda0nusLAJEh1UW4752GPHGy4GQ%3D)

When you enable the "Send Acknowledgment" switch a menu pops up, if you need to enter this menu at a later time use the "Edit Ack options" button depicted above. Configure the Ack options window like so to start sending ack messages:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Ack%20options%20config.png?sv=2020-08-04&st=2021-11-16T11%3A21%3A07Z&se=2040-11-17T11%3A21%3A00Z&sr=b&sp=r&sig=pgTsDiH8AAcdsbXpZ27GQFY6aLv071v6Udh7ktfEVRU%3D)

- **Code Component**: Select or input the code component that creates the ack message content. If left empty the message content of the delivered message is used.
- **Adapter Type**: The type of adapter to use to deliver the ack message. All adapter configuration is explained under the `Adapters` header.
- **Outbound file format**: Only applicable if the adapter delivers a file and denotes the file format and ending of the file.

When acc is enabled for an adapter the adapter will display an icon like this in the master view:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Ack%20icon%20image.png?sv=2020-08-04&st=2021-11-16T11%3A33%3A15Z&se=2040-11-17T11%3A33%3A00Z&sr=b&sp=r&sig=wre4L15vsKCLNXyHC1xrnH6GMe80RCUNvF4AFeROJsk%3D)

## Retry

Acknowledgments use the same retry mechanism as the corresponding outbound adapter. Ie. if the ack is sent by Sftp then the retry mechanisms for Sftp is used. These mechanisms are detailed per adapter under the `Adapter -> Outbound` heading.
