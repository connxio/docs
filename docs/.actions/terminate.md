---
sidebar_position: 90
---

# Terminate

Connxio supports Termination functionality that enables halting messages based on specified conditions.

## Adding Termination based on a condition

Add the Terminate shape from the transformation shape menu.

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

Next, populate the properties with appropriate values.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/terminate-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/terminate-dark.webp#dark-only'),
    }}
  />
</div>

Specify the conditions for when message processing should be terminated. The message is terminated when the condition is evaluated to `true`. A simple check based on the contents of a file can be done like so:

```
'{file:status}' == 'error'
```

Read more on how to define conditions [here](/integrations/rules.md)

Select a [LogLevel](/integrations/logging.md#log-levels) to specify when to log.

Choose a status. This is used in logs to specify the status of the message. Ie, Success, Warning, Error.

Description is the message that is logged when a termination happens.
