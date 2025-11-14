---
sidebar_position: 70
---

# Prettify Content

Connxio supports prettifying message content in XML and JSON. As JSON data is often output without line breaks to save space, it can be extremely difficult to actually read and make sense of it. This feature hopes to solve the problem by formatting and beautifying the JSON data so that it is easy to read and debug by human beings.

## Adding prettify to content

Add the shape from the transformation shape menu and move it to the correct place in the pipeline. Prettify should probably be the last step unless you are debugging.

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
