# Discard

Connxio lets customers send messages from the Connxio and discard them for testing purposes. This is great tool for debugging and logging your messages as they get processed by the Connxio pipeline.

## Using the Discard adapter

The Discard adapter requires no configuration to use as the messages are simply null and void. To use the Discard adapter select the Discard option in the "Outbound Connection" shape.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling back-off retry.
