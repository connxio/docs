# Splitting

- [Splitting](#splitting)
  - [Limits](#limits)
  - [Testing and best practices](#testing-and-best-practices)

ConnXio (CX) gives customers the ability to split messages into smaller units. We do this by running the content through a [Code Component](/Transformation/Code%20Components.md) that defines how the file should be split and then sends the smaller units through the pipeline as new messages. This page describes how to utilize the splitting functionality.

## Limits

There are very few limits to splitting the only one being that we support files up to `100mb` only. However, you can split files into any amount of messages, and process them in any shape or form in further transformations. After the splitting is run all files will be handled as a unique message inside CX which means they will generate separate [logs](/Logging.md), [resend-events](/Resending.md) and errors.

>Splitting can generate enormous amounts of traffic. Be sure that you test your receiving systems thoroughly before you send production level loads.

## Testing and best practices

Splitting requires special care when testing since it can generate millions of messages in a short amount of time. CX has a heavily tuned splitting algorithm that utilizes parallelization to generate messages in a rate of about 4000 per second at full capacity. This means that we recommend the following test pipeline:

1. Test you integration with a single file that splits into 2 messages.
2. Add 2 files with 200 messages.
3. Test 2 files with progressively larger loads (we recommend multiplying by 10 at a time) until you reach production level.

Obviously you can ignore steps that are unrealistic for production level load, ie. if you are estimating a load of 10 messages a day you can go straight to testing with production load levels. We do ask that you test for **peak load traffic** multiplied by 2. This adds stability for unexpected scenario's as well a prepares the receiving system for future load.\
 The reason for this recommended testing pipeline is that testing generates traffic which is payable, and we do not want our customers to incur costs for failed test runs caused by non-tested code and bad setup.
