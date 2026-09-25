---
sidebar_position: 100
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Azure Blob

The Azure Blob action retrieves or writes content in Azure Blob Storage. Choose **Get** to collect blob content for later actions, or **Upsert** to create or replace a blob with the current message content.

## Configure the action

Add an Azure Blob action to your integration, select the storage account and container, and choose the operation to perform.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "Container Name",
description: "Required. The container to retrieve blobs from or write blobs to.",
example: "messages",
},
{
name: "Operation",
description: "Required. Choose Get to retrieve a blob or Upsert to create a blob or replace an existing blob with the same name.",
},
]} />

## Get settings

Select **Get** to retrieve blob content and store it as collected data for later actions.

<PropertyReference idPrefix="get" properties={[
{
name: "Blob name",
description: <>Required. The name of the blob to retrieve. Use <Link to="/cxmal/connxio-macro-language/">CxMaL</Link> macros to build the name dynamically.</>,
example: "{filename}",
},
{
name: "Variable name",
description: <>Required. The name used to access the retrieved content in the metadata's DataCollection values. Reference it using the <Link to="/cxmal/macros/datacollection/">data collection macro</Link> or a <Link to="/integrations/code-components/">code component</Link>.</>,
example: "CustomerData",
},
]} />

## Upsert settings

Select **Upsert** to write the current message content to Blob Storage.

<PropertyReference idPrefix="upsert" properties={[
{
name: "Blob name",
description: <>The name of the blob to write. Use <Link to="/cxmal/connxio-macro-language/">CxMaL</Link> macros to build a dynamic name from message content or metadata.</>,
example: "{filename}",
},
{
name: "Create the container if not exists",
description: "Enable to create the destination container if it does not exist. When disabled, the container must already exist.",
},
{
name: "New interchange ID",
description: "Enable to remove the interchange ID from the action-specific metadata so that a new ID is generated when the message re-enters Connxio.",
},
]} />

## Duplicate detection

<ActionDuplicateDetection />

## Retry

The Get operation uses backoff retry. See [Retry](../../integrations/retry.md) for Connxio's retry configuration and message failure handling.

## Retrieval considerations

Keep retrieved blobs small to reduce processing time. For enrichment, aim for blobs below 1 MB, and below 100 KB for best performance. The transformation timeout is 10 minutes; large or slow retrievals can delay processing or cause it to fail.

A blob is retrieved each time the Get action runs. Parallel message processing can produce many simultaneous requests, so ensure the storage account can handle the expected traffic and account for storage usage costs.

If retrieval fails after retries, the message is sent to failure handling.
