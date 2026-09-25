---
title: "Code components"
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RequiredNugetPackage from '../\_shared/RequiredNugetPackage.mdx';

# Code components

Connxio uses C# code components to transform data at multiple points in the pipeline. This page explains how to create, test, package, and upload them. To run a component in an integration, configure a [Code transformation action](../actions/code-components.md). Use the Map, Split, and Batch tabs below to choose the interface and example for your component type.

## What is a code component?

A code component is C# code compiled into a DLL. Connxio runs it in a sandbox, provides message content and metadata, and uses the returned output in the next pipeline step.

## Creating a component

Create a new [console project](https://docs.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2019) or [class library](https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library?pivots=vscode) in Visual Studio, or use the .NET CLI:

```powershell
dotnet new console -n MyCodeComponent
#OR
dotnet new classlib -n MyCodeComponent
```

We recommend .NET 10.0, but older versions may work as well.

<RequiredNugetPackage />

<hr style={{marginTop: '3rem', marginBottom: '2rem'}} />

<Tabs centered>
<TabItem value="map" label="Map" default>

### Map component {#map-component}

Implement `IConnxioMap` to transform one message into one output message. Use this component with the [Code transformation action](../actions/code-components.md).

```csharp
using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class MyFirstConnxioMap : IConnxioMap
{
    /// <summary>
    /// The method called from the engine when a mapping is executed.
    /// </summary>
    /// <param name="transformationContext">The object containing the message content as it is currently and metadata relevant for the current context</param>
    /// <returns>An instance of TransformationContext. You can return the same instance as the one received in as input parameter, after making some changes as in the example, or create a brand new one</returns>
    public TransformationContext Map(TransformationContext transformationContext)
    {
        //Add error handling as necessary, this will give better error messages in the logs
        if (transformationContext.Content == null)
            throw new ArgumentException("Content field is null");

        //You can use newtonsoft and other basic nuget packages. Contact the Connxio team if you need a non supported package.
        dynamic obj = JsonConvert.DeserializeObject(transformationContext.Content) ?? throw new ArgumentException("Content is not a valid JSON");
        obj.Prop = "Done";

        //Add data to user properties if needed
        transformationContext.MetaData.UserDefinedProperties.Add("INeedThisLater", (string)obj.Prop);

        //Use collected data as needed
        obj.Prop2 = transformationContext.MetaData.DataCollection.GetValueOrDefault("MyCollectedData", "No data collected");

        //Replace the original content with a string representation of the object "obj"
        transformationContext.Content = JsonConvert.SerializeObject(obj);

        //Return the updated transformationContext
        return transformationContext;
    }
}
```

</TabItem>
<TabItem value="split" label="Split">

### Split component {#split-component}

Implement `IConnxioSplit` to turn one input message into multiple output messages. Use this component with the [Splitting action](../actions/splitting.md).

This example creates one output message for each entry in `Cities`, copying the input metadata to each output.

```csharp
using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class MyFirstSplitter : IConnxioSplit
{
    public IEnumerable<TransformationContext> Split(TransformationContext transformationContext)
    {
        // Create object from byte array
        dynamic inboundMessage = JsonConvert.DeserializeObject<dynamic>(transformationContext.Content) ?? throw new ArgumentException("Failed to deserialize inbound message.");

        //Create list that holds new messages
        var output = new List<TransformationContext>();

        //Add elements to list
        foreach (var city in inboundMessage.Cities)
        {
            var outboundMessage = new
            {
                CityName = city.CityName,
                Comment = city.Comment,
                Id = inboundMessage.Id
            };

            output.Add(new TransformationContext
            {
                Content = JsonConvert.SerializeObject(outboundMessage),
                MetaData = transformationContext.MetaData.Copy()
            });
        }

        //Return splitted messages
        return output;
    }
}
```

Test `Split` with sample content and verify the number of output messages, their content, and their metadata. Start with a message containing two cities before testing larger inputs.

When uploading, select the splitting component type.

</TabItem>
<TabItem value="batch" label="Batch">

### Batch component {#batch-component}

Implement `IConnxioBatch` to combine multiple input messages into one output message. Use this component with the [Batching action](../actions/batching.md).

This example combines the input messages' `Value` fields into a `Values` list and copies the first message's type and metadata. It expects a non-empty batch whose messages contain `Type` and `Value` fields.

```csharp
using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class MyFirstBatcher : IConnxioBatch
{
    public TransformationContext Batch(IEnumerable<TransformationContext> transformationContexts)
    {
        var msgIns = new List<dynamic>();

        foreach (var transformationContext in transformationContexts)
        {
            msgIns.Add(JsonConvert.DeserializeObject<dynamic>(transformationContext.Content));
        }

        //Create new outbound message
        var message = new
        {
            Type = msgIns[0].Type,
            Values = new List<dynamic>()
        };

        foreach (var msg in msgIns)
        {
            message.Values.Add(msg.Value);
        }

        // Create new transformation context and set content and metadata
        var outTransformationContext = new TransformationContext
        {
            Content = JsonConvert.SerializeObject(message),
            MetaData = transformationContexts.First().MetaData.Copy()
        };

        //Return batched message
        return outTransformationContext;
    }
}
```

Test `Batch` with several sample messages and verify that the output contains all expected values and the intended metadata.

When uploading, select the batching component type.

</TabItem>
</Tabs>

After writing and testing your component, build the project to generate the DLL. Typical output path: `...\MyProject\bin\Debug\net10.0\bin\MyProject.dll`.

## Zipped Code Components

Standard code components support system packages and a limited set of additional NuGet packages. For custom or unsupported dependencies, use Zip Components, which run in their own environment.

:::warning Warning!
Use the standard component type unless you specifically need unsupported NuGet dependencies. It is faster and easier to manage.
:::

### Requirements

#### Step 1

Create a standard code component first by following [Creating a component](#creating-a-component).

#### Step 2

Edit the component `.csproj` and change the `Connxio.Transformation` reference to:

```xml
<PackageReference Include="Connxio.Transformation" Version="0.1.6">
  <ExcludeAssets>runtime</ExcludeAssets>
</PackageReference>
```

`<ExcludeAssets>runtime</ExcludeAssets>` prevents runtime version collisions with the host function in Connxio.

Currently, this is required for:

- Newtonsoft.Json

#### Step 3

In the same `.csproj`, add `<EnableDynamicLoading>true</EnableDynamicLoading>` in `<PropertyGroup>`:

```xml
<PropertyGroup>
  <TargetFramework>net10.0</TargetFramework>
  <ImplicitUsings>enable</ImplicitUsings>
  <Nullable>enable</Nullable>
  <EnableDynamicLoading>true</EnableDynamicLoading>
</PropertyGroup>
```

Example `.csproj`:

```xml
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<TargetFramework>net10.0</TargetFramework>
		<ImplicitUsings>enable</ImplicitUsings>
		<Nullable>enable</Nullable>
		<EnableDynamicLoading>true</EnableDynamicLoading>
	</PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Connxio.Transformation" Version="0.1.6">
			<ExcludeAssets>runtime</ExcludeAssets>
		</PackageReference>
	</ItemGroup>

</Project>
```

#### Step 4

Add the NuGet packages and code you need. Code Components do not support external calls.

#### Step 5

Build the project and zip the result. Compress the contents of the output folder (usually `"../MyCodeComponentSolution\MyCodeComponentProject\bin\Debug\net10.0"`), not the `"net10.0"` folder itself.

> Note: Verify the archive by unzipping it. Files should extract directly into the destination folder.

Name the archive as needed, as long as it has the `.zip` extension.

#### Step 6

When the component is ready, upload it as described in [Uploading your component](#uploading-your-component). The upload dialog supports both `.dll` and `.zip` and detects type from file extension.

> Note: Other compressed filetypes like .rar or .7z are not supported at this time.

#### Step 7

Fill in `DLL file name` after selecting your file. It must point to the main DLL inside the zip, for example `MyCodeComponent.dll`.

#### Step 8

You are now ready to use the Zip Component.

## Termination

You can terminate a message by throwing `TransformationTerminatedException` from your transformation code component. This also works for splitting and batching variants.

```csharp
public class TransformationTerminatedException : Exception
{
    public ConnXioLogLevel LogLevel { get; set; }
    public ConnXioLogStatus Status { get; set; }
    public string? CustomStatus { get; set; }
    public int? FailureReturnStatusCode { get; set; } = 400;
}

public enum ConnXioLogStatus
{
    Error,
    Success,
    Warning,
    Terminated
}
public enum ConnXioLogLevel
{
    None,
    Minimum,
    Standard,
    Verbose,
    Never
}
```

Exception properties:

- **LogLevel:** This is the Connxio loglevel described in the [logging](../integrations/logging.md) documentation.
- **Status**: This is the logging status described in the [logging](../integrations/logging.md) documentation.
- **CustomStatus**: A custom description for the termination or failure.
- **FailureReturnStatusCode**: Return failure code. Only used on API inbound synchronous transform result mapping.

### Using FailureReturnStatusCode

Example using `FailureReturnStatusCode`:

```csharp
public class MyCodeMap : IConnxioMap
{
    public TransformationContext Map(TransformationContext transformationContext)
    {

        if (transformationContext.Content == null)
            throw new ArgumentException("Content field is null");

        // Each subintegration will have a FinalSynchronousMessageResponse
        IEnumerable<FinalSynchronousMessageResponse> subintResponses = JsonConvert.DeserializeObject<IEnumerable<FinalSynchronousMessageResponse>>(transformationContext.Content);

        // Just get the first one in this example. Production code should handle multiples.
        int statuscode = subintResponses.First().SynchronousMessageResponses.First().MetaData.OutboundRestResponse.StatusCode;

        //Create method to screen for failure codes
        if (isFailureCode(statuscode))
            throw new TransformationTerminatedException("Operation failed", failureReturnStatusCode: statuscode);

        // The data in transformationContext.Content will be your new API response.
        transformationContext.Content = "Operation success";

        return transformationContext;
    }
}
```

In [API inbound synchronous response mapping](../triggers/api.mdx#customizing-the-response), this enables graceful failure return codes.

Default status is `400` for failures and `200` for success. Overriding success codes is not supported.

## Uploading your component

Open **Code Components** from the portal's left-side menu, or use **+** beside the component selector in a Code transformation action. Create a component and provide the following details:

- **Name**: The name used to identify the component in the component list.
- **Type**: The component type. Choose the type that matches its interface: mapping, splitting, or batching.
- **Description**: A description of what the component does.
- **Version**: The component version. Manage or deprecate versions from the component view.

Upload the compiled `.dll` or `.zip` file. The portal detects the package type from the file extension. For a ZIP component, provide the main DLL file name, including its `.dll` extension.

You can also host a DLL or ZIP at an HTTP GET endpoint and configure the action to use its URI. See [External code components](../actions/code-components.md#external-code-components) for the action settings.

## Use the component

Add a [Code transformation action](../actions/code-components.md) to your integration and select the uploaded component, or configure its external URI. For other component types, see [Splitting](../actions/splitting.md) and [Batching](../actions/batching.md).
