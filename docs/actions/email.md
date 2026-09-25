import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Email

The Email action sends message content from the Connxio pipeline to one or more recipients using SMTP. Send the content as the email body, as an attachment, or both.

## Configure the action

Add an Email action to your integration and configure the settings below.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
{
name: "Security configuration",
description: <>Required. Select the <Link to="/integrations/security-configurations/">security configuration</Link> containing the SMTP connection properties for your email account. Use <strong>+</strong> to create a configuration.</>,
},
]} />

## Email settings

<PropertyReference properties={[
{
name: "Receivers (comma separated)",
description: "Required. The email addresses to send the message to. Provide at least one address and separate multiple addresses with commas.",
example: "orders@example.com,archive@example.com",
},
{
name: "Subject",
description: "The subject line of the email.",
example: "Order confirmation",
},
{
name: "Send file as message body",
description: "Enable to use the Connxio message content as the email body. Can be enabled together with Send file as attachment.",
},
{
name: "Send file as attachment",
description: "Enable to send the Connxio message content as an attachment. Can be enabled together with Send file as message body.",
},
{
name: "File name",
description: <>The name of the attachment when Send file as attachment is enabled. Use <Link to="/cxmal/connxio-macro-language/">CxMaL</Link> macros to build a dynamic file name.</>,
example: "{filename}",
},
]} />

## Duplicate detection

<ActionDuplicateDetection />

## Limitations

The Email action supports SMTP. Use TLS for a secure connection to the email server.

You can send email to a maximum of 500 recipients within 24 hours and 2,500 recipients within 30 days. These limits also apply when sending the same or similar content.

## Retry

See [Retry](../integrations/retry.md) for Connxio's retry configuration and message failure handling.
