import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Azure Table

The Azure Table trigger retrieves rows from an Azure Storage table and sends them into the Connxio pipeline.

## Configure the trigger

Add an Azure Table trigger to your integration and configure the settings below.

## General settings


<TriggerGeneralSettings showTriggerInterval />

## Connection settings

<PropertyReference properties={[
  {
    name: "Security configuration",
    description: <>Required. Select the <Link to="/connxio-portal/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
  },
  {
    name: "Table name",
    description: "Required. The table to retrieve rows from.",
  },
]} />

## Advanced settings

<PropertyReference properties={[
  {
    name: "Pick limit",
    description: "Optional. The maximum number of rows to retrieve per pickup. Use this to limit the load on receiving services.",
  },
  {
    name: "Query filter type",
    description: <>Select the type of query filter to apply when retrieving rows. Use <strong>None</strong> to retrieve rows without a query filter.</>,
  },
  {
    name: "Wrapper",
    description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
  },
]} />

## Retry

If a scheduled pickup fails before the message is retrieved, Connxio retries every 60 seconds until pickup succeeds, even when the configured trigger interval is longer.

After pickup, Connxio cannot guarantee that a message can be returned to external storage. Failures at this stage use the catastrophic retry handling described in [Retry](../integrations/retry.md).
