---
sidebar_position: 6
---

import PropertyReference from '@site/src/components/PropertyReference';

# Connection string

Store a connection string for an Azure Storage, Service Bus, or Event Grid adapter.

## Configure the connection

Create a security configuration with **Connection String** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
{
name: "Connection String",
description: "The connection string for the resource. For Service Bus, omit EntityPath and set the queue or topic name on the trigger or action.",
},
]} />
