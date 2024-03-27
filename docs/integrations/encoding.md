---
sidebar_position: 5
---

# Encoding

In Connxio, all files are internally converted to UTF-8 encoding by default, unless a flag is enabled to designate the file as binary. When configuring an integration, users have the option to specify the original encoding of the file using a text string such as UTF-8, ASCII, or ISO 8859-1. Additionally, users can define the expected outbound encoding which Connxio will convert the file to before sending. If no encoding is provided, Connxio assumes the file to be UTF-8 encoded.

Users should be aware of the following regarding the repercussions of file conversion to UTF-8 in Connxio:

- **Character Compatibility**: Converting files to UTF-8 ensures compatibility with a wide range of systems and applications that typically support UTF-8 encoding.
- **Lossless Encoding**: When the original encoding is explicitly provided, Connxio attempts to convert the file without any loss of data or characters during the encoding process.
- **Character Set Limitations**: While UTF-8 is a versatile and widely supported encoding format, it's important to note that certain character sets, or non-Unicode characters, may not be fully preserved during the conversion process. Users should verify compatibility for specific character sets. [A complete list of the characters included in UTF-8 can be found here](https://www.charset.org/utf-8).
- **Outbound Encoding Considerations**: Users should carefully define the expected outbound encoding based on the requirements of the receiving system to ensure seamless data transfer and proper interpretation of the characters.

By understanding Connxio's default UTF-8 conversion and considering the implications of encoding changes, users can effectively manage data consistency and compatibility within their integrations.

## Binary File Flag 
Files that contain binary data or require non-textual encoding, users should enable the appropriate flag to prevent automatic UTF-8 conversion and ensure the file's integrity. Users do not need to set encoding formats when using the Binary File Flag. Upon the completion of the integration, files will be passed in multiple ways.

:::warning
Transformations are not supported when this flag is enabled.
:::

- **Azure Storage**: The content will be sent as **Byte Arrays** containing **Base64 Encoded Strings**. To ease conversion back to the file's original format, set the Message Outbound Format to a text-type like .txt. When fetching files that used Binary handling, fetch them as strings, convert them from Base64 to a Byte Array and finally write the array to a Stream.
Example:
```csharp
// fetch your data then convert
byte[] converted = Convert.FromBase64String(data);
using (var file = new FileStream(filePath, FileMode.Create))
{
    file.Write(converted, 0, Convert.ToInt32(converted.Length));
    file.Flush();
}
```
- **Rest Adapter**: The payload can be received as `application/octet-stream`. See the [REST page](/integrations/adapters/outbound/rest/#receive-content-as-bytes). You may still need to make a conversion from Base64 string.

- **(S)FTP**: See Azure Storage
- **Service Bus**: The payload is sent as a **Base64 string** to the outbound Service Bus.
- **Email**: The file will be added as an attachment or massage body as a **Base64 string** represented as a **Byte Array**.

:::note 
Depending on the content of the binary file, more or less work will be needed to handle them. Some files will be perfectly viewable without additional handling.
:::