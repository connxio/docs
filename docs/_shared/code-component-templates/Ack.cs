using Connxio.NuGet.Public.Transformation.Interfaces;
using Connxio.NuGet.Public.Transformation.Models;

public class Ack : IConnxioAck
{
    public TransformationContext Map(TransformationContext context, bool success)
    {
        var content = context.Content;
        var metadata = context.MetaData;

        // Implement ACK logic here. You can modify the content and metadata as needed.
        if (success)
        {
            // Handle successful acknowledgment
        }
        else
        {
            // Handle failed acknowledgment
        }

        return context;
    }
}
