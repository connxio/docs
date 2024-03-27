
# Date macro

Returns the current UTC datetime as a string, with methods to add time or change Cst time zone.

## Methods supported

* `SetCstZone(cstZone)`
* `AddSeconds(secondsToAdd)`
* `AddMinutes(minutesToAdd)`
* `AddHours(houresToAdd)`
* `AddDays(daysToAdd)`
* `AddMonths(monthsToAdd)`
* `AddYears(yearsToAdd)`


## Example

#### Input
```cxmal
{date}
```

#### Output
```
2024-03-27T09:30:46.8926251Z
```

## Example: Add time 

#### Input
```cxmal
Current date: {date} - Future date: {date.AddDays(10)}
```

#### Output
```
Current date: 2024-03-27T09:36:57.7310356Z - Future date: 2024-04-06T09:36:57.7316166Z
```

## Example: Chain methods

You can chain methods if you need to use more than one.

#### Input
```cxmal
Current date: {date} - Future date: {date.AddDays(10).AddMonths(1)}
```

#### Output
```
Current date: 2024-03-27T09:41:46.4407240Z - Future date: 2024-05-06T09:41:46.4413590Z
```


## Example: Change Cst time zone

#### Input
```cxmal
UTC: {date} - CET: {date.SetCstZone(Central Europe Standard Time)}
```

#### Output
```
UTC: 2024-03-27T09:44:03.1401250Z - CET: 2024-03-27T10:44:03.1407082
```

## Example: Format the output

You can use the [Date pipe](/integrations/cxmal/pipes/date) to format the output.

#### Input
```cxmal
```

#### Output
```
```
