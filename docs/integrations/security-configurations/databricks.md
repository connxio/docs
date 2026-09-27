---
sidebar_position: 7
---

import PropertyReference from '@site/src/components/PropertyReference';

# Databricks

Store the endpoint and bearer token for a Databricks Delta Sharing connection.

## Configure the connection

Create a security configuration with **Databricks** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Bearer token",
    description: "The long-lived bearer token defined in the config.share file.",
  },
  {
    name: "Endpoint",
    description: "The endpoint defined in the config.share file.",
  },
]} />
