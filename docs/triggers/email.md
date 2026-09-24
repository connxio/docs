import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Email

The Email trigger retrieves messages from an email account using POP3 or IMAP and sends their bodies or attachments into the Connxio pipeline.

## Configure the trigger

Add an Email trigger to your integration and configure the settings below.

## General settings


<TriggerGeneralSettings showTriggerInterval />

## Connection settings

<PropertyReference properties={[
  {
    name: "Security configuration",
    description: <>Required. Select the <Link to="/connxio-portal/security-configurations/">security configuration</Link> containing the connection properties for your email account. Use <strong>+</strong> to create a configuration.</>,
  },
]} />

## Email settings

<PropertyReference properties={[
  {
    name: "Send message body",
    description: "When enabled, Connxio processes the email body as a single message through the pipeline.",
  },
  {
    name: "Send attachments",
    description: "When enabled, Connxio processes each attachment as a separate message. For example, an email with two attachments produces two attachment messages.",
  },
  {
    name: "Delete messages",
    description: "For IMAP, enable this to delete messages after pickup. When disabled, Connxio marks messages as read. For POP3, Connxio always deletes messages after pickup because the protocol does not support marking them as read.",
  },
  {
    name: "Wrapper",
    description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
  },
]} />
