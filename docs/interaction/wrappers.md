# Wrappers

Not all adapters can handle metadata outside the actual message. (S)FTP is a good example, where the protocol doesn't lend itself to sending anything but the actual file, so if you want to send something like a folder location into CX you need to include that in the message itself which is then sent to all the engines and has to be filtered out if you don't want it included in the outbound message. To circumvent this we added the concept of wrappers. A wrapper is essentially just a shell around the actual message content that contains information not within the concern of the message itself. Examples of things to include are folder paths, ids, testing information, etc.

We still support several native metadata options on some adapters, but all adapters support wrappers, including the API.

:::info [Wrapping]
When using this functionality, make sure you are wrapping the correct layer of your message. E.g. a list of objects can be wrapped, but a list of wrapped objects will fail.
:::

## How to start using wrappers

The first thing you want to do is add the [ConnXio.Interaction](/interaction/nuget/introduction) NuGet package to your project. This NuGet holds the `ConnxioJsonWrapper` class which can be used to wrap your message. If you can't use the NuGet you can use the following definition inside your app or code:

``` json
{
  "metadata": {"arbitrary_prop": "arbitrary_content"},
  "body": "YWRhc2Rhc2Q=",
  "isTestRun": false, //Only used for test runs
  "isLoadTest": false, //Only used for test runs
  "testRunId": null, //Only used for test runs
  "interchangeId": "guid"
}
```

* **metadata**: This property is used to add metadata to the `InboundMessageMetaData` property on the [Metadata](/integrations/metadata) dictionary object. Metadata is available through the entire CX pipeline and is extremely powerful.
* **body**: The actual message. Supply this value as a Base64 encoded byte array. CX will decode this property and use it as the message content through the CX pipeline.
* **isTestRun**: Used to denote that a message is part of a test run. This disables logging for the message and adds events to the portal. This option is not meant to be used outside of the [Testing](/connxio-portal/testing) framework.
* **isLoadTest**: Used to denote that a message is part of a load test run. This disables logging for the message. Read more about load testing here [here](/connxio-portal/testing).
* **testRunId**: Used in test runs. Not relevant for users.
* **interchangeId**: Sets the interchangeId of the message. There are several other ways to set this Id without using wrappers, but wrappers enables this option for all adapters - even those who do not support metadata natively.
