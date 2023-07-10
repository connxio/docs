# Format Conversion

Connxio (CX) supports quick conversion between XML and JSON, we call this feature *format conversion*. This is a simple way to transform message content to and from pre determined formats in an easy to configure way. We are looking into adding more formats, please contact us if you have suggestions.

## Setting up a conversion

To start using format conversion all you need to do is add the shape in your transformation shape and fill out 2 potential fields. An example can be found below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Format%20convert%20menu.PNG?sv=2020-04-08&st=2021-10-26T11%3A21%3A32Z&se=2040-10-27T11%3A21%3A00Z&sr=b&sp=r&sig=TVnFjS4f4ZHllOYaWkqvL%2BKu0%2FvM4Wdw9WYidJik8OM%3D)

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
