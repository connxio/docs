---
sidebar_position: 1
sidebar_label: Overview
slug: /integrations/security-configurations
---

import PropertyReference from '@site/src/components/PropertyReference';

# Security configurations

Security configurations store the credentials and connection details used by Connxio to connect to external systems. Reuse a configuration across integrations to manage connection details in one place. Connxio stores sensitive values in secure key storage, separate from the integration configuration.

## Create a security configuration

Open **Security Configurations** in the right-hand menu and select **Add new configuration**. Enter a name, choose a security type, and set **Subscription-specific configuration**. Fill in the connection settings for the selected type, then select **Save**.

## General settings

<PropertyReference properties={[
  {
    name: "Name",
    description: "The name shown when selecting the security configuration on an integration.",
  },
  {
    name: "Security Type",
    description: "The type of connection to configure. Select one of the types below to see its connection settings.",
  },
  {
    name: "Subscription-specific configuration",
    description: "Enable to configure different values for each subscription. Disable to use the same values across all subscriptions under the company.",
  },
]} />

## Security configuration types

<span id="http" />

<span id="archeo" />

<span id="sftp" />

<span id="ftp" />

<span id="connection-string" />

<span id="Databricks" />

<span id="azure-credential" />

<span id="Event-Hub" />

<span id="email" />

<span id="dataverse" />

<span id="dataverse-batch-limits" />

<PropertyReference properties={[
  {
    name: "HTTP",
    href: "/integrations/security-configurations/http/",
    description: "Authenticate HTTP/REST requests, data collection, and webhook logging.",
  },
  {
    name: "Archeo",
    href: "/integrations/security-configurations/archeo/",
    description: "Store the API key used for Archeo logging.",
  },
  {
    name: "SFTP",
    href: "/integrations/security-configurations/sftp/",
    description: "Store the connection details and credentials for an SFTP server. Set the folder path on the trigger or action.",
  },
  {
    name: "FTP",
    href: "/integrations/security-configurations/ftp/",
    description: "Store the connection details and credentials for an FTP server. Set the folder path on the trigger or action.",
  },
  {
    name: "Connection String",
    href: "/integrations/security-configurations/connection-string/",
    description: "Store a connection string for an Azure Storage, Service Bus, or Event Grid adapter.",
  },
  {
    name: "Databricks",
    href: "/integrations/security-configurations/databricks/",
    description: "Store the endpoint and bearer token for a Databricks Delta Sharing connection.",
  },
  {
    name: "Azure Credential",
    href: "/integrations/security-configurations/azure-credential/",
    description: "Store Entra ID application credentials used to access Azure resources.",
  },
  {
    name: "Event Hub",
    href: "/integrations/security-configurations/event-hub/",
    description: "Store the Event Hub connection and checkpoint storage settings used by an Event Hub trigger.",
  },
  {
    name: "Email",
    href: "/integrations/security-configurations/email/",
    description: "Store the server settings and credentials for an email connection.",
  },
  {
    name: "Dataverse",
    href: "/integrations/security-configurations/dataverse/",
    description: "Store the URL and application credentials for a Dataverse environment, along with limits for batched messages.",
  },
]} />
