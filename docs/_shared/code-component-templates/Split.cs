using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class Splitter : IConnxioSplit
{
    public IEnumerable<TransformationContext> Split(TransformationContext context)
    {
        var content = context.Content;
        var metadata = context.MetaData;

        var output = new List<TransformationContext>();
        // Add logic to split the content into multiple TransformationContext objects
        return output;
    }
}
