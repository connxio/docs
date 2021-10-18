# Variable Replacement

At various stages through ConnXio (CX) you can use the *variable replacement* functionality to access metadata and message content to enrich everything from URL's to file names and logging options. This page details where and how to use variable replacement.

## Query language

Variable replacement uses a simple query language to function. The following table contains all available keywords (more may be added later):

*Example JSON file:*

```json
{ 
    "node1": 
    { 
        array: 
        [ 
            {"element1": "Value1"},
            {"element2": "Value2"}
        ],
        "ParentElement": "ParentValue"
    } 
}    
```

*Example XML file:*

```xml
<note>
    <to>You</to>
    <from>Me</from>
    <heading>Integration</heading>
    <body>Use ConnXio!</body>
</note>
```

Metadata is explained [here](Metadata.md) but for reference we have copied the structure here:

```csharp
public class MetaData
{
    public string InterchangeId { get; set; }
    public string InboundFileName { get; set; } = "filename";
    public string OutboundFileName { get; set; }
    public DateTime Started { get; set; }
    public Dictionary<string, string> DataCollection { get; set; }
    public Dictionary<string, string> UserDefinedProperties { get; set; }
    public string ConfigCorrelatioId { get; set; }
    public string TransformationBlobName { get; set; }
    public string OutboundBlobName { get; set; }
    public string InboundAdapter { get; set; }
    public string InboundEndpoint { get; set; }
    public string OutboundAdapter { get; set; }
    public string OutboundEndpoint { get; set; }
    public string TransactionType { get; set; }
    public int ManualResendCount { get; set; }
}
```

### Quick reference

| Keyword | Description | Variable value | Usage |
| --- | --- | --- | --- |
| filename | Replaced with the name of the file if available, if not then defaults to empty string. Does not include the extension. | myfilename.txt | `http://www.myapi.com/{filename}` becomes `http://www.myapi.com/myfilename` |
| guid | Replaced with totally random GUID | 4ec6cc49-6d66-4a2a-b0ac-c5ab942cbdab | `http://www.myapi.com/{guid}` becomes `http://www.myapi.com/4ec6cc49-6d66-4a2a-b0ac-c5ab942cbdab` |
| interchange | Replaced with the interchange id that is either generated as a guid when the message hits CX or specified by the customer on entry | myid-1 | `http://www.myapi.com/{interchange}` becomes `http://www.myapi.com/myid-1` |
| file | Searches the file for the hierarchy specified after the "file:" keyword e.g. "{file:rootNode.secondsNode.thirdNode}". This works for JSON and XML. In json you can also specify arrays using the bracket syntax like this; "file:rootNode.array[0].node}" | See example json and xml above | JSON: `http://www.myapi.com/{file:node1.array[1].element2}` becomes `http://www.myapi.com/Value2}` <br/> <br/> XML: `http://www.myapi.com/{file:note.heading}` becomes `http://www.myapi.com/integration`
| metadata | accesses metadata, which is essentially a JSON object which can be accessed in the same way as JSON files as described above e.g. {metadata:rootNode.secondsNode.thirdNode}. | See *Metadata* structure above | `http://www.myapi.com/{metadata:InboundFileName}` becomes `http://www.myapi.com/filename` |
