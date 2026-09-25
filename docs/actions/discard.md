import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';

# Discard

The Discard action discards a message without sending it to an external system. Use it when testing an integration to inspect processing and logs without delivering messages to a receiving system.

## Configure the action

Add a Discard action to your integration where you would otherwise send the message to a receiving system. No connection settings are required.

## General settings

<ActionGeneralSettings />

## Logging

Use the integration's logging configuration to inspect how messages are processed during testing. See [Logging](../integrations/logging.md) for available log levels and configuration.

## Retry

See [Retry](../integrations/retry.md) for Connxio's retry configuration and message failure handling.
