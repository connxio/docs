
# Statusevent macro

Used to access data stored in statusevent. This object is used under [Testing](/connxio-portal/testing.md) to store various data. Use this macro in test assertions to create powerfull tests of your integrations.


The following is the data available in the StatusEvent object, all of which can be retrieved with the statusevent macro.

```csharp
public record StatusEvent
{
    public StatusEventResult StatusEventResult { get; set; }
    public StatusEventOriginType StatusEventOriginType { get; set; }
    public string? Message { get; set; }
    public ErrorInfo? Error { get; set; }
    public MetaData.MetaData? Metadata { get; set; }
    public string? ConfigCorrelationId { get; set; }
    public string? SubIntegrationId { get; set; }
    public string? ActionId { get; set; }
    public DateTime EventTime { get; set; }
    public bool IsTestRun { get; set; }
    public bool IsLoadTest { get; set; }
}

public record ErrorInfo
{
    public string? ErrorName { get; set; }
    public int ErrorCode { get; set; }
    public int? HttpStatusCode { get; set; }
    public string? ExceptionName { get; set; }
}
```

The [Metadata](/integrations/metadata.md) object is also available in this macro, but its recommended to use the [Metadata macro](/integrations/cxmal/macros/metadata.md) instead to access Metadata values.

## Example

#### Input
```
{statusevent:Error.errorCode}
```

#### Output
```
551
```