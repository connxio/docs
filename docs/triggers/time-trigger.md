import PropertyReference from '@site/src/components/PropertyReference';
import Link from '@docusaurus/Link';

# Time Trigger

The Time Trigger starts an integration on a schedule without retrieving data from an external source. The configured content body becomes the message payload for subsequent actions.

## Configure the trigger

Add a Time Trigger to your integration and configure the settings below.

## Trigger interval

Choose when Connxio starts the integration using cron expressions. For example, the expression `*/5 * * * *` runs every five minutes.

See [Triggering Interval](../integrations/triggering-interval.md) for cron syntax and more examples.

## Content settings

<PropertyReference properties={[
  {
    name: "Content Body",
    description: "Required. The message payload used each time the integration is triggered. This content is passed to subsequent actions.",
  },
  {
    name: "Wrapper",
    description: <>Choose JSON, XML, or None to match the configured message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
  },
]} />
