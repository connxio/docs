using Newtonsoft.Json;
using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class Batcher : IConnxioBatch
{
    public TransformationContext Batch(IEnumerable<TransformationContext> transformationContexts)
    {
        var messages = new List<dynamic>();
        foreach (var context in transformationContexts)
        {
            var content = context.Content;
            var metadata = context.MetaData;

            // Implement your batching logic here. You can modify the content and metadata as needed.
        }

        // Create new transformation context
        var batchResult = new TransformationContext
        {
            Content = JsonConvert.SerializeObject(messages),
            MetaData = transformationContexts.First().MetaData.Copy()
        };
        return batchResult;
    }
}
