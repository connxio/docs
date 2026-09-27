---
sidebar_position: 11
---

import PropertyReference from '@site/src/components/PropertyReference';

# Dataverse

Store the URL and application credentials for a Dataverse environment, along with limits for batched messages.

## Configure the connection

Create a security configuration with **Dataverse** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "URL",
    description: "The URL of the Dataverse instance.",
  },
  {
    name: "Client Id",
    description: "The client ID used to connect to the Dataverse instance.",
  },
  {
    name: "Client secret",
    description: "The client secret used to connect to the Dataverse instance.",
  },
]} />

## Dataverse batch limits

These settings apply when batching is enabled on a Dataverse action. They are shared across integrations using this security configuration.

<PropertyReference properties={[
  {
    name: "Max Batch Size",
    description: "The maximum number of messages processed per interval.",
  },
  {
    name: "Batch interval in seconds",
    description: "The number of seconds to wait before processing the next batch.",
  },
  {
    name: "Max concurrent processors",
    description: "The maximum number of concurrent processors. Processing scales up based on the message count.",
  },
]} />
