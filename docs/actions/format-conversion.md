---
sidebar_position: 60
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';

# Format conversion

The Format Conversion action converts message content from JSON to XML or from XML to JSON. Use it before an action that requires the message in a different format.

## Configure the action

Add a Format Conversion action to your integration and choose the conversion direction. The incoming message must match the source format: JSON for conversion to XML, or XML for conversion to JSON.

## General settings

<ActionGeneralSettings />

## Conversion settings

<PropertyReference properties={[
{
name: "Conversion format",
description: "Required. Choose JSON to XML or XML to JSON to match the incoming message and the format you want to produce.",
example: "JSON → XML",
},
{
name: "Base node",
description: "Optional. The root node to add when converting JSON to XML, or remove when converting XML to JSON. XML requires a single root element; use this setting when the content needs a root element added or removed during conversion.",
example: "rootNode",
},
]} />

## Example

To convert the following JSON to XML, choose **JSON to XML** and set **Base Convert Node** to `rootNode`.

```json
{
  "node1": "value1",
  "node2": "value2"
}
```

The converted XML includes the configured root element:

```xml
<rootNode>
  <node1>value1</node1>
  <node2>value2</node2>
</rootNode>
```

To convert this XML back to JSON without the surrounding `rootNode`, choose **XML to JSON** and set **Base node** to `rootNode`.
