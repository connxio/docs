---
title: Connxio Macro Language
sidebar_position: 1
---

import PropertyReference from '@site/src/components/PropertyReference';

# Connxio Macro Language

Connxio Macro Language (CxMaL) is a domain-specific language designed for accessing and manipulating data within integrations running on the Connxio platform.

At various stages through Connxio you can use CxMaL to access metadata and message content to enrich everything from URL's to file names and logging options.


### Quick reference

Choose a macro to open its full reference. Each example shows the expression and the value it produces.

<PropertyReference idPrefix="macro" properties={[
  {
    "name": "filename",
    "href": "/cxmal/macros/filename",
    "description": "Returns the file name without its extension, or an empty string when no file name is available.",
    "samples": [
      {
        "label": "File name",
        "value": "myfilename.txt"
      },
      {
        "label": "Expression",
        "value": "http://www.myapi.com/{filename}"
      },
      {
        "label": "Result",
        "value": "http://www.myapi.com/myfilename"
      }
    ]
  },
  {
    "name": "guid",
    "href": "/cxmal/macros/guid",
    "description": "Generates a random GUID.",
    "samples": [
      {
        "label": "Expression",
        "value": "http://www.myapi.com/{guid}"
      },
      {
        "label": "Example result",
        "value": "http://www.myapi.com/4ec6cc49-6d66-4a2a-b0ac-c5ab942cbdab"
      }
    ]
  },
  {
    "name": "interchange",
    "href": "/cxmal/macros/interchange",
    "description": "Returns the interchange ID, either generated as a GUID when the message enters Connxio or supplied by the customer.",
    "samples": [
      {
        "label": "Interchange ID",
        "value": "myid-1"
      },
      {
        "label": "Expression",
        "value": "http://www.myapi.com/{interchange}"
      },
      {
        "label": "Result",
        "value": "http://www.myapi.com/myid-1"
      }
    ]
  },
  {
    "name": "file",
    "href": "/cxmal/macros/file",
    "description": "Reads a value from JSON or XML using a dot-separated path. JSON paths also support bracket syntax for array indexes.",
    "samples": [
      {
        "label": "JSON source",
        "value": "{\"node1\":{\"array\":[{}, {\"element2\":\"Value2\"}]}}"
      },
      {
        "label": "JSON expression",
        "value": "http://www.myapi.com/{file:node1.array[1].element2}"
      },
      {
        "label": "JSON result",
        "value": "http://www.myapi.com/Value2"
      },
      {
        "label": "XML source",
        "value": "<note><heading>integration</heading></note>"
      },
      {
        "label": "XML expression",
        "value": "http://www.myapi.com/{file:note.heading}"
      },
      {
        "label": "XML result",
        "value": "http://www.myapi.com/integration"
      }
    ]
  },
  {
    "name": "metadata",
    "href": "/cxmal/macros/metadata",
    "description": "Reads a field from the message metadata using the same path syntax as JSON files.",
    "samples": [
      {
        "label": "Expression",
        "value": "http://www.myapi.com/{metadata:InboundFileName}"
      },
      {
        "label": "Example result",
        "value": "http://www.myapi.com/filename"
      }
    ]
  },
  {
    "name": "statusevent",
    "href": "/cxmal/macros/statusevent",
    "description": "Reads a field from the status event object using the same path syntax as JSON files. Open the macro reference for the status event structure.",
    "samples": [
      {
        "label": "Expression",
        "value": "http://www.myapi.com/error?code={statusevent:error.errorcode}"
      },
      {
        "label": "Example result",
        "value": "http://www.myapi.com/error?code=551"
      }
    ]
  },
  {
    "name": "datacollection",
    "href": "/cxmal/macros/datacollection",
    "description": "Reads a key from the data collection populated by the data collection transformation. Add #json to read nodes from a JSON value.",
    "samples": [
      {
        "label": "Value stored under mykey",
        "value": "{\"node1\":{\"array\":[{}, {\"element1\":\"value1\"}]}}"
      },
      {
        "label": "Expression",
        "value": "http://www.myapi.com/{datacollection#json:mykey.node1.array[1].element1}"
      },
      {
        "label": "Result",
        "value": "http://www.myapi.com/value1"
      }
    ]
  },
  {
    "name": "userdefinedproperties",
    "href": "/cxmal/macros/userdefinedproperties",
    "description": "Reads a key from the user-defined properties populated by code mapping. Add #json to read nodes from a JSON value.",
    "samples": [
      {
        "label": "Value stored under mykey",
        "value": "{\"node1\":{\"array\":[{}, {\"element1\":\"value1\"}]}}"
      },
      {
        "label": "Expression",
        "value": "http://www.myapi.com/{userdefinedproperties#json:mykey.node1.array[1].element1}"
      },
      {
        "label": "Result",
        "value": "http://www.myapi.com/value1"
      }
    ]
  },
  {
    "name": "date",
    "href": "/cxmal/macros/date",
    "description": "Returns the current UTC date and time. Chain methods to change the time zone or add time, and use the date pipe to format the result.",
    "samples": [
      {
        "label": "Supported methods",
        "value": "SetCstZone(cstZone)\nAddSeconds(secondsToAdd)\nAddMinutes(minutesToAdd)\nAddHours(hoursToAdd)\nAddDays(daysToAdd)\nAddMonths(monthsToAdd)\nAddYears(yearsToAdd)"
      },
      {
        "label": "Expression",
        "value": "http://www.myapi.com/getbydate?date={date.SetCstZone(Central Europe Standard Time).AddDays(1)}"
      },
      {
        "label": "Example result",
        "value": "http://www.myapi.com/getbydate?date=2022-06-11T10:33:19.6029842"
      }
    ]
  }
]} />

For the full metadata structure, see [Metadata](../integrations/metadata.md). Key/value sets are populated by [data collection](../actions/data-collection.md) and [code mapping](../actions/code-components.md).

### Pipes

Pipes act on the output of a macro, for example to format a value or handle an error. Add `|` after the macro statement, followed by the pipe action.

<PropertyReference idPrefix="pipe" properties={[
  {
    "name": "date",
    "href": "/cxmal/pipes/date",
    "description": "Formats the macro output as a date using standard or custom .NET date and time format strings.",
    "samples": [
      {
        "label": "Macro output",
        "value": "2022-06-11T12:15:55.9695313"
      },
      {
        "label": "Pipe",
        "value": "| date: dd.MM.yyyy HH.mm.ss"
      },
      {
        "label": "Result",
        "value": "11.06.2022 12.15.55"
      }
    ]
  },
  {
    "name": "string",
    "href": "/cxmal/pipes/string",
    "description": "Converts text to lowercase with toLower or uppercase with toUpper.",
    "samples": [
      {
        "label": "Macro output",
        "value": "My Output String"
      },
      {
        "label": "Pipe",
        "value": "| string: toUpper"
      },
      {
        "label": "Result",
        "value": "MY OUTPUT STRING"
      }
    ]
  },
  {
    "name": "array",
    "href": "/cxmal/pipes/array",
    "description": "Checks whether an array contains a value with contains, or does not contain it with notContains.",
    "samples": [
      {
        "label": "JSON source",
        "value": "{\"myArray\":[5,13,36]}"
      },
      {
        "label": "Expression",
        "value": "{file:myArray | array: contains(5)}"
      },
      {
        "label": "Result",
        "value": "true"
      }
    ]
  }
]} />

The date pipe accepts [standard](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings) and [custom](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings) .NET date and time formats.

#### Error handling with pipes

Only the first matching error handling pipe runs when an error occurs. Once it runs, all remaining pipes are skipped.

<PropertyReference idPrefix="pipe" properties={[
  {
    "name": "error",
    "href": "/cxmal/pipes/error",
    "description": "Handles any error during macro execution. Runs only when an error occurs.",
    "samples": [
      {
        "label": "Ignore — leave the macro untouched",
        "value": "| error: ignore"
      },
      {
        "label": "Remove — remove the failing macro",
        "value": "| error: remove"
      },
      {
        "label": "Terminate — stop processing the message",
        "value": "| error: terminate"
      },
      {
        "label": "Fallback — return My value",
        "value": "| error: fallback My value"
      }
    ]
  },
  {
    "name": "null",
    "href": "/cxmal/pipes/null",
    "description": "Handles null reference errors only. Other errors do not trigger this pipe.",
    "samples": [
      {
        "label": "Ignore — leave the macro untouched",
        "value": "| null: ignore"
      },
      {
        "label": "Remove — remove the failing macro",
        "value": "| null: remove"
      },
      {
        "label": "Terminate — stop processing the message",
        "value": "| null: terminate"
      },
      {
        "label": "Fallback — return My value",
        "value": "| null: fallback My value"
      }
    ]
  }
]} />

### Pipe chaining

The following example uses three pipes. These pipes are executed in order, depending on the result of the macro.

```
{file:myVariable | null: fallback myDefaultValue | error: terminate | string: toUpper}
```

* If `myVariable` resolved to null, then the null pipe would trigger. The final result would become `myDefaultValue`.

* If there was an error reading the file, then the null pipe would not trigger. The next pipe here is the error pipe, which would then trigger and cause that specific message in the integration to stop.

* If no error occurred, then the value in `myVariable` would be retrieved. The last pipe would then trigger and execute the `string: toUpper` method on the macro result.


## Use cases

CxMaL can be used in various ways to simulate orchestration or to dynamically change endpoints or addresses. Following is a list of where CxMaL can be used:

### Inbound adapters

#### REST Fetch

You can use CxMaL on the [HTTP trigger](../triggers/http.md) URL field like shown below.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Http%20Inbound%20Variable%20Incection.PNG?sv=2020-04-08&st=2021-09-19T11%3A02%3A00Z&se=2037-10-20T11%3A02%3A00Z&sr=b&sp=r&sig=rfVbo%2BwsjzX7XfQqp09vLfCqutI3riI1X1a0oEgOjsQ%3D)

However, since most of the macros don't make sense so early in the pipeline, only metadata actually works. An example can be seen above.

### Data collection

[Data collection](../actions/data-collection.md) supports all forms of CxMaL. Below you can see a pretty complex example that calculates the route based on the file and the InterchangeId.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Datacollection%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-19T11%3A12%3A00Z&se=2040-10-20T11%3A12%3A00Z&sr=b&sp=r&sig=2gUVxSSnsXFWskM5v9tr56kzv4OG6iBdmG9v%2FYG3r1c%3D)

### Logging

You can use CxMaL to change the log events to use custom values. The following fields support CxMaL:

- The webhook URL
- Transaction Tag

![img](https://cmhpictsa.blob.core.windows.net/pictures/Logging%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-19T11%3A39%3A00Z&se=2040-10-20T11%3A39%3A00Z&sr=b&sp=r&sig=IhzISXiKkcu5SWfEr3Wa0ShXRtMrTuKsMv0U7NhzPFE%3D)

### Outbound adapters

#### Azure Storage

Blob and azure file outbound adapters support CxMaL on the outbound blob and file name:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-20T08%3A21%3A00Z&se=2040-10-21T08%3A21%3A00Z&sr=b&sp=r&sig=d%2FLLapJMSUoE0botbQz02jlv46IaHwqxL4gaN5YMeWI%3D)

#### REST Push

This functions the same way as the [outbound REST adapter](#rest-fetch), but on outbound you have access to all file and data-collection variables as well.

#### SFTP Push

CxMaL can be used on the output file name like this:

![img](https://cmhpictsa.blob.core.windows.net/pictures/SFTP%20out%20variable%20replacement.PNG?sv=2020-04-08&st=2021-09-20T08%3A28%3A00Z&se=2040-10-21T08%3A28%3A00Z&sr=b&sp=r&sig=AH%2FsrgpSvKhMF2FWhM%2FxylxjgEr69trGsnwGW43as1w%3D)
