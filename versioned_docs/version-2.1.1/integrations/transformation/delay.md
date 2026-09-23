---
sidebar_position: 80
---

# Delay

Connxio supports delaying the execution of an action for a specified period.

Delay can be added in two different ways. A predetermined duration, or a random duration with a lower and upper limit.

`Note`: Max delay time is 300 seconds (5 minutes)

## Adding Delay to an Integration

Follow these steps to add delay to your integration.

Add the Delay shape from the transformation shape menu.

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/transformations-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/transformations-dark.webp#dark-only'),
    }}
  />
</div>

Position the Delay shape before the action you wish to delay, and configure the delay duration as needed.

Specify the delay duration in seconds to delay the execution of the next action for a predetermined amount of time.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/delay-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/delay-dark.webp#dark-only'),
    }}
  />
</div>

Enable the `Random` option to specify a lower and upper limit for the delay. The delay duration will then get randomized within the specified limits each time the shape is executed.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/delay-random-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/delay-random-dark.webp#dark-only'),
    }}
  />
</div>
