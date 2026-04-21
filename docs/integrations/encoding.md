---
sidebar_position: 5
---

# Encoding

Connxio converts files to UTF-8 by default unless the file is marked as binary. When configuring an integration, you can specify the file's original encoding, such as UTF-8, ASCII, or ISO 8859-1. You can also define the outbound encoding Connxio should use before sending the file. If no encoding is specified, Connxio assumes UTF-8.

Keep the following in mind when using UTF-8 conversion in Connxio:

- **Character Compatibility**: Converting files to UTF-8 ensures compatibility with a wide range of systems and applications that typically support UTF-8 encoding.
- **Lossless Encoding**: When the original encoding is explicitly provided, Connxio attempts to convert the file without any loss of data or characters during the encoding process.
- **Character Set Limitations**: UTF-8 is widely supported, but some character sets or non-Unicode characters may not be fully preserved during conversion. Verify compatibility for any special character sets. [A complete list of the characters included in UTF-8 can be found here](https://www.charset.org/utf-8).
- **Outbound Encoding Considerations**: Set the outbound encoding based on the requirements of the receiving system to ensure the content is interpreted correctly.

Understanding how Connxio handles encoding helps you maintain data consistency across integrations.

## Binary File Flag

If a file contains binary data or requires non-text encoding, enable the Binary File Flag to prevent automatic UTF-8 conversion and preserve file integrity. When this flag is enabled, you do not need to set an encoding format. After the integration completes, files are passed in the following ways.

:::warning
Transformations are not supported when this flag is enabled.
:::

- **Azure Storage**: The content is sent as **byte arrays** containing **Base64-encoded strings**. To simplify conversion back to the original format, set the Message Outbound Format to a text type such as `.txt`. When fetching files handled as binary, fetch them as strings, convert them from Base64 to a byte array, and write the array to a stream.
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
- **Rest Adapter**: The payload can be received as `application/octet-stream`. See the [REST page](/integrations/adapters/outbound/rest/#receive-content-as-bytes). You may still need to convert it from a Base64 string.

- **(S)FTP**: See Azure Storage
- **Service Bus**: The payload is sent to the outbound Service Bus as a **Base64 string**.
- **Email**: The file is added as an attachment or message body as a **Base64 string** represented as a **byte array**.

:::note
Depending on the file content, handling may require more or less work. Some files may be viewable without additional processing.
:::
