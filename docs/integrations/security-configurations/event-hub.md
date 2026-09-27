---
sidebar_position: 9
---

import PropertyReference from '@site/src/components/PropertyReference';

# Event Hub

Store the Event Hub connection and checkpoint storage settings used by an Event Hub trigger.

## Configure the connection

Create a security configuration with **Event Hub** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Event hub name",
    description: "The name of the Event Hub.",
  },
  {
    name: "Event hub connection string",
    description: "The connection string for the Event Hub.",
  },
  {
    name: "Consumer group",
    description: "The consumer group to listen to.",
  },
  {
    name: "Checkpoint storage connection string",
    description: "The connection string for the storage account that maintains Event Hub checkpoints. Checkpoint storage is required for stable transfer.",
  },
  {
    name: "Checkpoint storage container",
    description: "The container used to store Event Hub checkpoints.",
  },
]} />
