---
sidebar_position: 6
---

# Format Conversion

Connxio supports quick conversion between XML and JSON, we call this feature *format conversion*. This is a simple way to transform message content to and from pre determined formats in an easy to configure way. We are looking into adding more formats, please contact us if you have suggestions.

## Configuring Convert Format
To configure Connxio to use format conversion as a transformation, select the Convert Format in the "Transformations" shape:

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

On creating a new transformation, a popup with the transformation's input fields will appear. 

Read more about the properties below:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="transformations"
    sources={{
      light: useBaseUrl('/img/docs/transformations/convertformat-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/convertformat-dark.webp#dark-only'),
    }}
  />
</div>

- **Convert To Format**: The format to convert to. Original content must be in opposite format for this to work, ie. to convert to JSON you need XML original content and vice versa.
- **Base Convert Node**: If set, a root node with the given name will be added to, or removed from the file depending on the conversion. When converting to XML, the root will be added. When converting from XML, the root node will be removed. This available as an option because XML requires a root node to be valid, opposed to JSON who does not.

In the example above, the following JSON becomes the XML below:

```json
"node1": "value1",
"node2": "Value2"
```

```xml
<rootNode>
    <node1>value1</node1>
    <node2>value2</node1>
</rootNode>
```
