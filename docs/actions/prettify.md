---
sidebar_position: 70
---

import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';

# Prettify

The Prettify action formats JSON or XML message content with indentation and line breaks to make it easier to read and debug.

## Configure the action

Add a Prettify action to your integration. Place it after actions that modify the content and before the action that sends it to the receiving system. For debugging, place it where you want to inspect the formatted content.

## General settings

<ActionGeneralSettings />

## Supported content

The message content must be JSON or XML. Prettifying adds formatting whitespace, which increases the message size.
