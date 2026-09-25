import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Azure File Share

The Azure File Share action writes message content from the Connxio pipeline to files in an Azure Storage file share.

## Configure the action

Add an Azure File Share action to your integration and configure the settings below.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the connection properties for your Azure Storage account. Use <strong>+</strong> to create a configuration.</>,
},
{
name: "File share name",
description: "Required. The file share to write files to.",
example: "outgoing-files",
},
{
name: "Directory",
description: "Optional. The destination directory within the file share. Leave empty to use the root directory.",
example: "orders",
},
]} />

## Advanced settings

<PropertyReference properties={[
{
name: "File name",
description: <>The name of the file to write. Use <Link to="/cxmal/connxio-macro-language/">CxMaL</Link> macros to build a dynamic file name from message content or metadata.</>,
example: "{filename}",
},
]} />

## Duplicate detection

<ActionDuplicateDetection />

## Retry

See [Retry](../../integrations/retry.md) for Connxio's retry configuration and message failure handling.
