import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Azure Table

The Azure Table action writes data from the Connxio pipeline to an Azure Storage table.

## Configure the action

Add an Azure Table action to your integration and configure the settings below.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Table name",
description: "Required. The table to write data to.",
example: "Orders",
},
]} />

## Duplicate detection

<ActionDuplicateDetection />

## Retry

See [Retry](../../integrations/retry.md) for Connxio's retry configuration and message failure handling.
