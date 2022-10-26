# Outbound Discard Adapter

`This functionality is not in production. More information can be found on the` [functionality page](/Functionality)

ConnXio (CX) lets customers send messages from the CX and discard them for testing purposes. This is great tool for debugging and logging your messages as they get processed by the CX pipeline.

## Limitations

The Discard adapter serves only one purpose. Any potential limitations would be a result of the logging systems used.

## Using the Discard adapter

The Discard adapter requires no configuration to use as the messages are simply null and void. To use the Discard adapter select the Discard option in the "Outbound Connection" shape.

`image goes here`

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/Retry). This may change in the future as we are looking into enabling backoff retry.
