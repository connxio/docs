---
    title: "Code Components"
---

# Code components

ConnXio (CX) uses C# code to transform data at multiple points through the CX pipeline. This page describes how to create a *code component* for transformation, where you can use it and what possibilities open up to you by using it. See [splitting](/Transformation/Splitting) and [batching](/Transformation/Batching) for information on code components within those processes.

## What is a code component?

A code component is essentially C# code compiled into a dll file. We use reflection to run these files in a sandbox where we supply the message content and other variables and use the output for further processing.

## Creating a component

The easiest way to create you own code component is to start by opening Visual Studio and creating a new [console project](https://docs.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2019). Use .net core 3.1 or .net standard 2.1 for new components. We do have some backwards compatibility, and if you cant get your code to work feel free to contact us.

After you create the project and open it you need to create a file called **Initialize** and paste this code inside:

```csharp
/// <summary>
/// The method name must be Map but you can add as many files and other methods that you want, and call them inside Map. But you must use this signature and return a string.
/// </summary>
/// <param name="message">The message content as it is currently. This changes as the engine runs trough different transformations</param>
/// <param name="dataCollection">The data collection properties you have collected earlier in the transformation pipeline</param>
/// <param name="userDefinedProperties">The user defined properties that are transferred with the message metadata. Put variables here to access them later outside message content.</param>
/// <returns>A string of the transformed message</returns>
public string Map(string message, Dictionary<string, string> dataCollection, Dictionary<string, string> userDefinedProperties)
{
    //Add error handling as necessary, this will give better error messages in the logs
    if (message == null)
        throw new ArgumentException("Message field is null");

    //You can use newtonsoft and other basic nuget packages. Contact the CX team if you need a non supported package.
    dynamic obj = JsonConvert.DeserializeObject(message);
    obj.Prop = "Done";
    
    //Add data to user properties if needed
    userDefinedProperties("INeedThisLater", obj.prop);

    //Use collected data as needed
    obj.Prop2 = dataCollection["MyCollectedData"];

    //Return string representation of the message to propagate through pipeline
    return JsonConvert.SerializeObject(obj);
}
```

>`NOTE: JsonConvert requires Newtonsoft version 12.0.3 or older.`

The code above adds examples of the most basic functionality provided by code components and is an boiler plate for most transformations. We would recommend adding a method to yor project to run the Map method with sample input. This can be done either in the Program.cs of a console project or through a Unit test or some other means, this is all subjective preference. An example of a the unit test method is featured below:

```csharp
public class CodeComponentTest
{
    public Initialize Mapper { get; set; }

    [SetUp]
    public void Setup()
    {
        Mapper = new Initialize();
    }

    [Test]
    public void Test_Map_Invoice()
    {
        string testDataColContentAsString = GetTestDataColContentString();
        string testContentAsString = GetTestContentString();

        Dictionary<string, string> dataCol = new Dictionary<string, string>();
        dataCol.Add("invoice", testDataColContentAsString);

        var mappedContent = Mapper.Map(testContentAsString, dataCol, new Dictionary<string, string>());
    }

    private string GetTestDataColContentString()
    => File.ReadAllText(@"TestFiles/Invoice/Test_Invoice_Multiline.txt");

    private string GetTestContentString()
    => File.ReadAllText(@"TestFiles/Invoice/Partitioned_Id.txt");
}
```

After writing and testing your component you need to create the dll file itself. The easiest way to do this is simply by building you code (which it should have done automatically by now). You will find you dll file inside a folder looking something like this: `...\MyProject\bin\Debug\netcoreapp3.1\bin\MyProject.dll`.

### Termination

You can terminate a message by throwing a 'NotImplementedException' from you transformation code component. This does not work on splitting and batching variants. The exception type is fairly mismatched as far as termination of messages but it's one of the only exception types that exists in the base C# system, package that is never thrown by the code itself. This is the reason we chose to use this exact exception. We might amend this with our own exceptions in the future.

You can supply the termination error message with a set of code words to influence the behavior of the termination process. The pipeline is always terminated but the code word controls the logging associated with it. You supply these code words in the following way:

```csharp
//The code word before the pipe (|) is used to select the action while the text after the pipe is used as the log event message sent via the [logging events functionality](/Logging).
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

## Uploading your component

CX supports both internal and external component upload locations. If you want to use external upload management the only real requirement is that the raw component dll is available on a REST GET request at the endpoint you specify in your integration configuration like shown below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Code%20Mapping%20Self%20hosted.PNG?sv=2020-04-08&st=2021-10-20T11%3A20%3A16Z&se=2040-10-21T11%3A20%3A00Z&sr=b&sp=r&sig=iwI0j%2Fyh8iCN48%2BrktJaxgGrqXqA9DmOl5sT2HHCyMU%3D)

Internal upload management can be done in the *Code Components* view inside the ConnXio Portal. Choose *Upload new component* and fill in the necessary fields like so:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Internal%20code%20mapping.PNG?sv=2020-04-08&st=2021-10-20T11%3A25%3A22Z&se=2040-10-21T11%3A25%3A00Z&sr=b&sp=r&sig=xPBSb9XGhTGJvEuCQBVEttFnvsXigrtdyKzwmbgFWzk%3D)

**Name:** The name of the map that you can reference in the component list.\
**Type:** The type of map. Read more about types [here].\
**Description:** A description of your map.\
**Version:** The version of the map. You can deprecate and manage maps by version in the component view.

## Using the component

To use the component you have created you enter the [Integrations](/Integrations/creating-integrations) menu and either select or create your integration. Use the [transformation](/Transformation/code-components#using-the-component) menu to add a code component shape as seen below.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Code%20mapping%20add%20tranformation.png?sv=2020-04-08&st=2021-10-21T11%3A01%3A19Z&se=2040-10-22T11%3A01%3A00Z&sr=b&sp=r&sig=7sKZFsU0p1B4EJDZowq6aAL8GDtkm2tkpbw94JjzTlo%3D)

After you add the shape you need to select your component in the code component window. If you use internal upload the input will look something like shown below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Code%20Mapping%20select%20mapping.PNG?sv=2020-04-08&st=2021-10-21T11%3A05%3A02Z&se=2040-10-22T11%3A05%3A00Z&sr=b&sp=r&sig=8ViYt9AB%2B5blz8GJvbT4rsuHNXfZsWN%2Fj8IxhjdEteM%3D)

If you use external upload you select the SasUsi option and paste your URI in the input field there.

## Caching

All components are cached for 30 seconds when loaded into the service. Keep this in mind when doing rapid changes to component code.
