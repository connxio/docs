---
sidebar_position: 90
---

import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import PropertyReference from '@site/src/components/PropertyReference';
import Link from '@docusaurus/Link';

# Terminate

The Terminate action stops processing a message when a condition evaluates to `true`. Use it to stop messages based on their content and record a description and status in the logs.

## Configure the action

Add a Terminate action to your integration and place it before the actions you want to prevent from running. Configure the condition and logging settings below.

## General settings

<ActionGeneralSettings />

## Termination condition

Set **Condition** to the expression that determines when to stop processing. When the condition evaluates to `true`, the message is terminated. When it evaluates to `false`, processing continues to the next action.

For example, use the following condition to terminate a message when its `status` field contains `error`:

```text
'{file:status}' == 'error'
```

See [CxMaL](../cxmal/connxio-macro-language.md) for macros that access message content and metadata, and [Rules](../integrations/rules.md) for condition syntax and more examples.

## Logging settings

<PropertyReference properties={[
  {
    name: "Description",
    description: "The message to log when processing is terminated.",
    example: "Message terminated because its status is error.",
  },
  {
    name: "Status",
    description: "The status recorded in the termination log, such as Success, Warning, or Error.",
    example: "Error",
  },
  {
    name: "Log Level",
    description: <>The log level used for the termination entry. See <Link to="/integrations/logging/#log-levels">Log levels</Link> for the available levels and how they control logging.</>,
    example: "Standard",
  },
]} />
