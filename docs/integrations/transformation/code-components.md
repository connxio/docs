---
    title: "Code Components"
    sidebar_position: 2
---

# Code components

Connxio uses C# code to transform data at multiple points through the Connxio pipeline. This page describes how to create a *code component* for transformation, where you can use it and what possibilities open up to you by using it. See [splitting](/integrations/transformation/splitting) and [batching](/integrations/transformation/batching) for information on code components within those processes.

## What is a code component?

A code component is essentially C# code compiled into a dll file. We use reflection to run these files in a sandbox where we supply the message content and other variables and use the output for further processing.

## Creating a component

The easiest way to create you own code component is to start by opening Visual Studio and creating a new [console project](https://docs.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2019) or a [class library](https://docs.microsoft.com/en-us/dotnet/core/tutorials/library-with-visual-studio?pivots=dotnet-core-3-1). Use .net 8 for new components. We do have some backwards compatibility, and if you cant get your code to work feel free to contact us.

:::warning NuGet Packages
We have historically used the **Communicate.ConnXio.Transformation** package for transformation. This package is depricated and should be replaced by the **Connxio.Transformation** Package.
:::

After you create the project, navigate to "Manage nuGet packages" and download the nuget named [Communicate.Transformation](https://www.nuget.org/packages/Communicate.ConnXio.Transformation), and then create a file and paste this code inside:

```csharp
/// <summary>
/// The class containg the mapping code must implement the interface "IConnXioMap". This interface contains the definition of the method "Map" which is where the mapping code goes. 
/// The interface implementation with the Map method is the only mandatory code, but you can add as many files and other methods that you want, and call them from inside the Map method.
/// </summary>
public class MyFirstConnXioMap : IConnxioMap
{
    /// <summary>
    /// The method called from the engine when a mapping is executed.
    /// </summary>
    /// <param name="transformationContext">The object containing the message content as it is currently and metadata relevant for the current context</param>
    /// <returns>An instance of TransformationContext. You can return the same instance as the one received in as input parameter, after making some chacges as in the example, or create a brand new one</returns>
    public TransformationContext Map(TransformationContext transformationContext)
    {
        //Add error handling as necessary, this will give better error messages in the logs
        if (transformationContext.Content == null)
            throw new ArgumentException("Content field is null");

        //You can use newtonsoft and other basic nuget packages. Contact the Connxio team if you need a non supported package.
        dynamic obj = JsonConvert.DeserializeObject(transformationContext.Content);
        obj.Prop = "Done";

        //Add data to user properties if needed
        transformationContext.MetaData.UserDefinedProperties.Add("INeedThisLater", obj.prop);

        //Use collected data as needed
        obj.Prop2 = transformationContext.MetaData.DataCollection["MyCollectedData"];

        //Replace the original content with a string representation of the object "obj"
        transformationContext.Content = JsonConvert.SerializeObject(obj);

        //Return the updated transformationContext
        return transformationContext;
    }
}
```

The test project below uses NUnit to test the DLL. The following NuGet packages are required to run the tests (versions are just for reference, latest version is usually the best bet):

```xml
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.3.1" />
<PackageReference Include="NUnit" Version="3.13.3" />
<PackageReference Include="NUnit3TestAdapter" Version="4.2.1" />`
```

The code above adds examples of the most basic functionality provided by code components and is an boiler plate for most transformations. We would recommend adding a method to yor project to run the Map method with sample input. This can be done either in the Program.cs of a console project or through a Unit test or some other means, this is all subjective preference. An example of a the unit test method is featured below:

```csharp
public class CodeComponentTest
{
    public MyFirstConnXioMap Mapper { get; set; }

    [SetUp]
    public void Setup()
    {
        Mapper = new MyFirstConnXioMap();
    }

    [Test]
    public void Test_Map_Invoice()
    {
        string testDataColContentAsString = GetTestDataColContentString();
        string testContentAsString = GetTestContentString();

        Dictionary<string, string> dataCol = new Dictionary<string, string>();
        dataCol.Add("invoice", testDataColContentAsString);

        ContextMetaData contextMetaData = new ContextMetaData
        {
            DataCollection = dataCol
        };

        TransformationContext transformationContext = new TransformationContext
        {
            Content = testContentAsString,
            MetaData = contextMetaData
        };            

        var mappedContent = Mapper.Map(transformationContext);
    }

    private string GetTestDataColContentString()
    => File.ReadAllText(@"TestFiles/Invoice/Test_Invoice_Multiline.txt");

    private string GetTestContentString()
    => File.ReadAllText(@"TestFiles/Invoice/Partitioned_Id.txt");
}
```

After writing and testing your component you need to create the dll file itself. The easiest way to do this is simply by building you code (which it should have done automatically by now). You will find you dll file inside a folder looking something like this: `...\MyProject\bin\Debug\net8.0\bin\MyProject.dll`.

## Zipped Code Components

The standard code components do not support NuGet packages beyond the standard installed System packages. We've made an exception for some packages, but self-made or exotic packages will not work. To solve this issue we've added a new type of code component that runs in its own environment. We call this new type of code component Zip Components.

Zip Components are a little different from the standard Code Components and subsequently require a few special changes to your project to work.

:::warning Warning!
If you don't need any special NuGets outside the ones supported by the Standard Code Components, we still recommend using the Standard version. It's faster and easier for CX to handle. Only use Zip Components when you need the NuGet functionality.
:::

### Requirements

#### Step 1

Make a standard Code Component as usual with the [guide](#creating-a-component) above.

#### Step 2

Edit the *.csproj* that contains the component and change the `PackageReference` for the `Connxio.Transformation` NuGet package so it looks like this:

```xml
<PackageReference Include="Connxio.Transformation" Version="0.1.6">
  <ExcludeAssets>runtime</ExcludeAssets>
</PackageReference>
```

The `<ExcludeAssets>runtime</ExcludeAssets>` line is the important one here. It stops the Code Component from creating versioning collisions with the host function inside CX.

#### Step 3

Still in the same *.csproj* add `<EnableDynamicLoading>true</EnableDynamicLoading>` to the `<PropertyGroup>` tag like so:

```xml
<PropertyGroup>
  <TargetFramework>net8.0</TargetFramework>
  <ImplicitUsings>enable</ImplicitUsings>
  <Nullable>enable</Nullable>
  <EnableDynamicLoading>true</EnableDynamicLoading>
</PropertyGroup>
```

Your *.csproj* file should look something like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">

	<PropertyGroup>
		<TargetFramework>net8.0</TargetFramework>
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

Add whatever NuGet packages you want to your Code Component and add whatever code you need. Remember that Code Components do not support external calls.

#### Step 5

Build the project and zip the result. The whole bin folder, usually located at `"../MyCodeComponentSolution\MyCodeComponentProject\bin\Debug\net8.0"`, should be compressed into the zip. Note that its *just* the bottom level contents (the files) and not the `"net8.0"` folder itself that should be included.

>Note: If you want to check that the archive is made correctly you can confirm that when unzipped the archive unzips all the files into the folder its placed in.

Name the zip whatever you want as long as it has the .zip file extension.

#### Step 6

When the code component is zipped and ready for testing, you upload it exactly as described in the [Uploading your component](#uploading-your-component) section. The upload dialog and drag-and-drop both support .dll and .zip files and will recognize which type you are uploading based on the filetype.

>Note: Other compressed filetypes like .rar or .7z are not supported at this time.

### Step 7

Before confirming the upload check that the code component has the Zip tag added to it at the top, below the name.

Also remember to fill in the `DLL file name` field after selecting your file. This field should point to the main .dll file in your zip (the file used as the main .dll in standard Code Components). Use the whole filename e.g. `MyCodeComponent.dll`

### Step 8

You are now ready to use the Zip Code Component.

We are looking into simplifying the process by offering a ready made project inside Visual Studio, but this is currently not implemented.

If you don't need any special NuGets outside the ones supported by the Standard Code Component, we recommend using the Standard version. It's still faster and easier for CX to handle. Only use Zip Components when you need the NuGet functionality.

## Termination

You can terminate a message by throwing a 'NotImplementedException' from you transformation code component. This does not work on splitting and batching variants. The exception type is fairly mismatched as far as termination of messages but it's one of the only exception types that exists in the base C# system, package that is never thrown by the code itself. This is the reason we chose to use this exact exception. We might amend this with our own exceptions in the future.

You can supply the termination error message with a set of code words to influence the behavior of the termination process. The pipeline is always terminated but the code word controls the logging associated with it. You supply these code words in the following way:

```csharp
//The code word before the pipe (|) is used to select the action while the text after the pipe is used as the log event message sent via the [logging events functionality](/integrations/logging).
throw new NotImplementedException("Warning|Pipeline terminated with warning");
```

We support the following options on termination:

| Code word | Action |
|---|---|
| Success| | The termination is logged as a success with the minimum log level.|
| Warning | The termination is logged as a warning with the minimum log level. |
| Error | The termination is logged as an error with the none log level. |
| Loglevel:None | The termination is logged with the terminated status but with the none log level instead of the default minimum level.|
| Loglevel:Never| | The termination is not logged at all.|
| *Default behavior* | The termination is logged with the terminated status on the minimum log level with the message: "Transaction terminated by code map" |

## Configuring Code mapping

To configure Connxio to use code mapping as a transformation, select the Code mapping in the "Transformations" shape:

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

On creating a new transformation, a popup with the transformation's input fields will appear. Read more below on how 
the Code mapping transformation works.

### Uploading your component

Connxio supports both internal and external component upload locations. 
If you want to use external upload management the only real requirement is that the raw component dll is available on a REST GET request at the endpoint you specify in your integration configuration like shown below:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/codemap-self-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/codemap-self-dark.webp#dark-only'),
    }}
  />
</div>

Internal upload management can be done in the *Code Components* page. You can access this either by clicking the "+" button in the codemapping transformation as seen above, or by navigating via the menu on the left-hand side where "Code Components" is one of the options as seen below. From there you can create a new code component or edit existing components.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/codecomp-menu-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/codecomp-menu-dark.webp#dark-only'),
    }}
  />
</div>

When creating a new code component, these are the fields to be filled in:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/codecomp-create-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/codecomp-create-dark.webp#dark-only'),
    }}
  />
</div>

**Name:** The name of the map that you can reference in the component list.\
**Type:** The type of map. Read more about types [here].\
**Description:** A description of your map.\
**Version:** The version of the map. You can deprecate and manage maps by version in the component view.

### Using the component

If you use internal upload you can choose the code map component you've created from the drop down list as shown below:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/transformations/codemap-codecomp-light.webp'),
      dark: useBaseUrl('/img/docs/transformations/codemap-codecomp-dark.webp#dark-only'),
    }}
  />
</div>

If you use external upload you paste your URI in the *Code Map Component Uri* input field.

## Caching

All components are cached for 30 seconds when loaded into the service. Keep this in mind when doing rapid changes to component code.
