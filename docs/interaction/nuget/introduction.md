---
title: Introduction
sidebar_position: 1
---

# Connxio NuGet

The interaction NuGet exists to allow users of Connxio(CX) to interact with the CX API both synchronously and asynchronously. It also provides handlers for Blob and ServiceBus interaction, enabling programmatic use of many of Connxio's main features. You still need to set up your integrations in the CX portal, and add any transformation components you may require there.
The package can be found here: [Interaction NuGet](https://www.nuget.org/packages/Connxio.Interaction)

#### Prerequisites
- .NET version >= 8.0

## Message Config
The MessageConfig-object allows you to control some parts of the flow when using the Blob or ServiceBus handlers. When using the config, it is required that it reflects your integration in the CX portal. When using the Wrapped functionality in CX, you may set the values here and automatically wrap your message, or manually wrap it yourself.
:::info [Set up your integration] 
This object only configures the message behaviour up to the point of sending it to Connxio. If you have not configured your Integration accordingly, your message might fail.
E.g. setting the configuration with PureMessageSending to true, whilst sending normal messages in the CX Integration Configuration will fail, as there is no SasUri for the normal message pipeline to fetch the file.
:::
Example:
``` C#
MessageConfig config = new()
{
    MessageInboundEncoding = MessageInboundEncoding.UTF8,
    MessageInboundFormat = MessageInboundFormat.JSON,
    PureMessageSending = false,
    Wrap = true,
    WrapperType = WrapperType.Json,
    InterchangeId = interchangeId,
    IsLoadTest = true,
    IsTest = true
};
```

:::note[Additional Usage]
Much of the functionality within this package can be used outside of a Connxio context.
:::
