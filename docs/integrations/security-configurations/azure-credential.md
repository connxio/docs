---
sidebar_position: 8
---

import PropertyReference from '@site/src/components/PropertyReference';

# Azure Credential

Store Entra ID application credentials used to access Azure resources.

## Configure the connection

Create a security configuration with **Azure Credential** as the security type. Set its name and subscription scope using the [general settings](./security-configurations.md#general-settings), then fill in the properties below.

## Connection settings

<PropertyReference properties={[
  {
    name: "Account Name",
    description: "The name of the Storage Account connected to your Entra ID enterprise application.",
  },
  {
    name: "Tenant ID",
    description: "The ID of the tenant containing your Entra ID enterprise application.",
  },
  {
    name: "Client ID",
    description: "The client ID of your Entra ID enterprise application.",
  },
  {
    name: "Client Secret",
    description: "The client secret of your Entra ID enterprise application.",
  },
]} />

See Microsoft’s [Azure Storage authorization documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory) for details about access through Entra ID.
