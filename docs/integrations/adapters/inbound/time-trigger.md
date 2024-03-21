# Time Trigger

The Time Trigger adapter initiates a workflow or integration flow without requiring the retrieval of files from external sources. Instead, it operates based on a predefined trigger interval. The content body serves as the payload for the integration process, ensuring continuity through subsequent stages such as transformation and outbound adapters.

## Configuring the Time Trigger adapter

To configure Connxio to initiate a workflow select the Time Trigger option in "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-time-trigger-light.webp#light-only'),
      dark: useBaseUrl('/img/docs/inbound-time-trigger-dark.webp#dark-only'),
    }}
  />
</div>

The following properties are used to configure the adapter:
- **Triggering interval**: Specifies the frequency at which the workflow is triggered. Read more about the triggering interval [here](/integrations/triggering-interval).
- **Content Body**: Defines the payload used for the integration process.