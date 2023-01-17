# Variable Replacement

At various stages through ConnXio (CX) you can use the *variable replacement* functionality to access metadata and message content to enrich everything from URL's to file names and logging options. This page details where and how to use variable replacement.

## Query language

Variable replacement uses a simple query language to function. The following table contains all available keywords (more may be added later):

*Example JSON file:*

```json
{ 
    "node1": 
    { 
        "array": 
        [ 
            {"element1": "Value1"},
            {"element2": "Value2"}
        ],
        "parentElement": "ParentValue"
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

Metadata is explained [here](/Metadata) but for reference we have copied the structure here:

```csharp
public class MetaData
{
    public string InterchangeId { get; set; }
    public string InboundFileName { get; set; } = "filename";
    public string OutboundFileName { get; set; }
    public DateTime Started { get; set; }
    public Dictionary<string, string> DataCollection { get; set; }
    public Dictionary<string, string> UserDefinedProperties { get; set; }
    public string ConfigCorrelationId { get; set; }
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
| filename | Replaced with the name of the file if available, if not then defaults to empty string. Does not include the extension. | myfilename.txt | `http://www.myapi.com/{filename}` <br/>  becomes `http://www.myapi.com/myfilename` |
| guid | Replaced with totally random GUID | 4ec6cc49-6d66-4a2a-b0ac-c5ab942cbdab | `http://www.myapi.com/{guid}` <br/>  becomes `http://www.myapi.com/4ec6cc49-6d66-4a2a-b0ac-c5ab942cbdab` |
| interchange | Replaced with the interchange id that is either generated as a guid when the message hits CX or specified by the customer on entry | myid-1 | `http://www.myapi.com/{interchange}` <br/> becomes `http://www.myapi.com/myid-1` |
| file | Searches the file for the hierarchy specified after the "file:" keyword e.g. "{file:rootNode.secondsNode.thirdNode}". This works for JSON and XML. In json you can also specify arrays using the bracket syntax like this; "file:rootNode.array[0].node}" | See example json and xml above | JSON: `http://www.myapi.com/{file:node1.array[1].element2}` <br/>  becomes `http://www.myapi.com/Value2` <br/> <br/> XML: `http://www.myapi.com/{file:note.heading}` <br/>  becomes `http://www.myapi.com/integration`
| metadata | Accesses metadata, which is essentially a JSON object which can be accessed in the same way as JSON files as described above e.g. {metadata:rootNode.secondNode.thirdNode}. | See *Metadata* structure above | `http://www.myapi.com/{metadata:InboundFileName}` <br/>  becomes `http://www.myapi.com/filename` |
| datacollection, datacollection#json | Access the data collection key/value set. This set is populated by the [datacollection transformation](/Transformation/Data-Collection). Use the key set in the configured data collection to select the corresponding value. If the value is JSON parsable you can add the "#json" suffix to target JSON nodes. | Key is "mykey" and value is the example JSON file above. | `http://www.myapi.com/{datacollection#json:mykey.node1.array[1].element1}` becomes `http://www.myapi.com/value1` |
| userdefinedproperties, userdefinedproperties#json | Access the user-defined properties key/value set. This set is populated from within [code mapping](/Transformation/code-components). Use the key set from within the code mapping to select the corresponding value. If the value is JSON parsable you can add the "#json" suffix to target JSON nodes. | Key is "mykey" and value is the example JSON file above. | `http://www.myapi.com/{userdefinedproperties#json:mykey.node1.array[1].element1}` becomes `http://www.myapi.com/value1` |
| date | Replaced with the current UTC datetime. This macro also support several methods: <br /> SetCstZone(string cstZone) <br /> AddSeconds(int secondsToAdd) <br /> AddMinutes(int minutesToAdd) <br /> AddHours(int houresToAdd) <br /> AddDays(int daysToAdd) <br /> AddMonths(monthsToAdd) <br /> AddYears(int yearsToAdd). <br /><br /><code>Tips: Use the [date pipe](#pipes) in order to format the output date.</code> | 2022-06-10T08:24:35.2408329Z | `http://www.myapi.com/getbydate?date={date.SetCstZone(Central Europe Standard Time).AddDays(1)}` <br/>  becomes `http://www.myapi.com/getbydate?date=2022-06-11T10:33:19.6029842` |

### Pipes

The pipes are used to perform some kind of action based on the output of the macro statement, like formatting or error handling. To use a pipe operator, add an '|' after the macro statement followed by the desired pipe action.

| Keyword | Description | Usage |
| --- | --- | --- |
| date | Formats the value output from the macro statement as a date. The date pipe accepts all [standard](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings) and [custom](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings) date and time formats strings | Macro output value: <code>2022-06-11T12:15:55.9695313</code> <br /> pipe <code>\| date: dd.MM.yyyy HH.mm.ss</code> <br /> becomes <code>11.06.2022 12.15.55</code> |
| string | Formats sting values. Supported operator are: <br /> toLower <br /> toUpper| Macro output value: <code>My Output String</code> <br /> pipe <code>\| string: toUpper</code> <br /> becomes <code>MY OUTPUT STRING</code> |
| error | Used as a kind of error handling when using variable replacement. If a macro statement would fail for some reason the variable replacement default behaver is to leave the statement untouched in the output. By using the error pipe you are enabled to control the outcome of a replacement failure. | <code> \| error: ignore</code>: Ignores the macro statement and leaves it untouched. <br /> <code>\| error: remove</code>: Removes the failing macro statement. <br /> <code>\| error: terminate</code>: Terminates the integration process. |
| error: fallback | To fallback to a deafult value when a macro fails, use fallback as a secondary keyword in combination with the error keyword.  | <code>\| error: fallback My default value</code> will yield the result <code> My default value</code> if the macro statement fails.| 

## Use cases

Variable replacement can be used in various ways to simulate orchestration or to dynamically change endpoints or addresses. Following is a list of where variable replacement can be used:

### Inbound adapters

#### REST Fetch

You can use variable replacement on the [inbound REST adapter](/Adapters/Inbound/Rest) URL field like shown below.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Http%20Inbound%20Variable%20Incection.PNG?sv=2020-04-08&st=2021-09-19T11%3A02%3A00Z&se=2037-10-20T11%3A02%3A00Z&sr=b&sp=r&sig=rfVbo%2BwsjzX7XfQqp09vLfCqutI3riI1X1a0oEgOjsQ%3D)

However, since most of the variables don't make sense so early in the pipeline, only metadata actually works. An example can be seen above.

### Data collection

[Data collection](/Transformation/Data-Collection) supports all forms of variable replacement. Below you can see a pretty complex example that calculates the route based on the file and the [InterchangeId](/Core-Concepts).

![img](https://cmhpictsa.blob.core.windows.net/pictures/Datacollection%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-19T11%3A12%3A00Z&se=2040-10-20T11%3A12%3A00Z&sr=b&sp=r&sig=2gUVxSSnsXFWskM5v9tr56kzv4OG6iBdmG9v%2FYG3r1c%3D)

### Logging

You can use variable replacement to change the log events to use custom values. The following fields support variable replacement:

- The webhook URL
- Transaction Tag

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-19T11%3A39%3A00Z&se=2040-10-20T11%3A39%3A00Z&sr=b&sp=r&sig=IhzISXiKkcu5SWfEr3Wa0ShXRtMrTuKsMv0U7NhzPFE%3D)

### Outbound adapters

#### Azure Storage

Blob and azure file outbound adapters support variable replacement on the outbound blob and file name:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-20T08%3A21%3A00Z&se=2040-10-21T08%3A21%3A00Z&sr=b&sp=r&sig=d%2FLLapJMSUoE0botbQz02jlv46IaHwqxL4gaN5YMeWI%3D)

#### REST Push

This functions the same way as the [outbound REST adapter](#rest-fetch), but on outbound you have access to all file and data-collection variables as well.

#### SFTP Push

Variable replacement can be used on the output file name like this:

![img](https://cmhpictsa.blob.core.windows.net/pictures/SFTP%20out%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-20T08%3A28%3A00Z&se=2040-10-21T08%3A28%3A00Z&sr=b&sp=r&sig=AH%2FsrgpSvKhMF2FWhM%2FxylxjgEr69trGsnwGW43as1w%3D)
