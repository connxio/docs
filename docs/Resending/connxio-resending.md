---
sidebar_position: 1
---

# Resending With ConnXio

Resending within CX was added in version 1.9.0 and replaces the old resending system. We will not be phasing out the current retry system wholesale but we do expect customers to start learning and using the new system to be able to handle errors themselves withing the subscription context. Please contact your CX representative if you have further questions.

## Overview

ConnXio will catch and persist all failures that occur in any integration flow. The purpose of this is to allow customers to be able to either resend these messages (if e.g. the receiver system experienced an outage), or delete the messages if resending is not appropriate.

When a failure has occurred it can be viewed in the Failures page in the ConnXio Portal.
![Failures page](https://i.imgur.com/bdF3Oy8.png#light-only)![Docusaurus themed image](https://i.imgur.com/qdbc01O.png#dark-only)
This page shows all integrations where failures have occurred. To view the specific failures, click the integration to open a new page where all failures can be viewed individually.

On this page you view the failures and when, why and where they failed. You can also click a failure to view additional details and see the message content.

![Failed integration page](https://i.imgur.com/roBF7aH.png#light-only)![Docusaurus themed image](https://i.imgur.com/gg3So7Q.png#dark-only)

## Resending and deleting messages

There are two options for resending or deleting messages. The process for each of them is the same.

You can use the "Select all messages" toggle to select all failed messages and resend them. If you only want to resend a specific subset of all failures, you can use the built-in search tool to scope down the result list to only those messages. You are able to filter messages by time, failure message, sender, receiver and failure origin.

![Failed integration page](https://i.imgur.com/ZWZozn1.png#light-only)![Docusaurus themed image](https://i.imgur.com/ZwHKhNo.png#dark-only)

When you have either selected all messages, or a subset of messages you can select to either Delete or Retry the messages. When you start a new job for either of those, a new card will appear on the page where you can track the status of the operation.

![Failed integration page](https://i.imgur.com/ZJN126C.png#light-only)![Docusaurus themed image](https://i.imgur.com/FoEwXRF.png#dark-only)
Note: You can only have one active job per integration at any one time.
