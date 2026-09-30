using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class Mapper : IConnxioMap
{
    public TransformationContext Map(TransformationContext context)
    {
        var content = context.Content;
        var metadata = context.MetaData;

        // Implement mapping logic here. You can modify the content and metadata as needed.

        return context;
    }
}
