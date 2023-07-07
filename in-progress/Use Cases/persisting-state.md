---
    slug: /use-cases/persisting-state
---

# Persisting State

> This page is incomplete and should not be used.

There are many scenarios where you might want to persist state when integrating systems. This page will describe and handle a common scenario where persistent state is required, it will also describe the pitfalls and discuss the complexity introduced when using Connxio (CX) with persisted state.

## The Case

To illustrate the use case we will be using a specific example. For persistent orchestration we have selected the following case:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Use%20Case%20-%20Persisting%20State.png?sv=2020-08-04&st=2021-11-26T13%3A01%3A21Z&se=2040-11-27T13%3A01%3A00Z&sr=b&sp=r&sig=fDejCqVC3m1QVOZNiRYq9RO%2Fb4uPpvh0%2F%2BaJrtvR5kI%3D)

As you can see in the diagram above we will be moving data from an Api serving user objects to an external recruiting tool. CX will get messages from the inbound Api every hour. The user Api is master for the user data and users can and will be deleted, but the user Api does not have soft delete. This means that the receiving recruitment tool can't know if a user has been deleted or not without cleaning out all entries that are not received by CX. If we choose to make the recruitment system delete all non-received events we can potentially delete users that fail or are delayed for some reason either in the User Api or in CX itself. This can cause users to loose access or loss of system specific settings created in the recruitment Api relating to the user. To solve this problem we want CX to remember what users were sent last time and, instead of not sending information about deleted users, we make CX actively send delete messages for the deleted users. If your receiving Api does not support delete events or similar mechanisms you can use the [acknowledgements](/Adapters/Outbound/Acknowledgment) functionality in tandem with alerting on log events to handle failures manually or automatically in the receiving system. For this use case we will assume that the receiving system has a delete endpoint.

## Setting up the integration

We set up the integration in the portal by configuring the inbound adapter to use the Rest inbound type:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Rest%20Inbound%20Config.png?sv=2020-08-04&st=2021-11-04T11%3A54%3A52Z&se=2040-11-05T11%3A54%3A00Z&sr=b&sp=r&sig=A2BUYolZuVJZ08rvAFV91MXGTRtGP%2F7Ybns0gjELH3o%3D)

After that we configure the outbound adapter to use rest as well, but this time we configure the adapter to use Acknowledgements (ack) to add files to blob. It's the ack function which lets us force CX to hold state. We need to configure the usage of said state as a data collection as well which is explained later. The configuration for the outbound adapter should look something like this:

Outbound Adapter:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Use%20Case%20State-%20Outbound-Rest.png?sv=2020-08-04&st=2021-11-29T12%3A50%3A55Z&se=2040-11-30T12%3A50%3A00Z&sr=b&sp=r&sig=stFOJDP17uAhAxd7a8NJwvXlnE2ru3m2VbbDJCT1zDo%3D)

Ack:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Use%20Case%20State%20Ack.png?sv=2020-08-04&st=2021-11-29T12%3A43%3A54Z&se=2040-11-30T12%3A43%3A00Z&sr=b&sp=r&sig=rV06Ki%2FV2Y9YLDlzegbYcKcQQ6d9VDTPRz%2Fjy1zH7TI%3D)

There are several points to note here:

1. The rest communication is unchanged from non persisted state configuration. We send the messages as we would in any Rest sync operation.
2. The magic happens in the Ack functionality. The ack is sent only if a message is successfully received by the receiving system, this is ensured by setting the "Send Negative Acknowledgement" to the off position. 
3. The message body of the Ack request is the message content itself. This is ensured implicitly by not setting a value for the "Code Acknowledgement Map". This is important as this is the value we need for the second part of the case where we refer to the persistent store.
4. The Url specified in the ack refers to a blob container and a filename based on the userId. This is very important since we need to be able to get the same previous information for the user.