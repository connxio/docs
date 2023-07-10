---
sidebar_position: 4
---

# Encoding

In Connxio, all files are internally converted to UTF-8 encoding by default, unless a flag is enabled to designate the file as binary. When configuring an integration, users have the option to specify the original encoding of the file using a text string such as UTF-8, ASCII, or ISO 8859-1. Additionally, users can define the expected outbound encoding which Connxio will convert the file to before sending. If no encoding is provided, Connxio assumes the file to be UTF-8 encoded.

Users should be aware of the following regarding the repercussions of file conversion to UTF-8 in Connxio:

- **Character Compatibility**: Converting files to UTF-8 ensures compatibility with a wide range of systems and applications that typically support UTF-8 encoding.
- **Lossless Encoding**: When the original encoding is explicitly provided, Connxio attempts to convert the file without any loss of data or characters during the encoding process.
- **Character Set Limitations**: While UTF-8 is a versatile and widely supported encoding, it's important to note that certain character sets or non-Unicode characters may not be fully preserved during the conversion process. Users should verify compatibility for specific character sets. [A complete list of the characters included in UTF-8 can be found here](https://www.charset.org/utf-8).
- **Outbound Encoding Considerations**: Users should carefully define the expected outbound encoding based on the requirements of the receiving system to ensure seamless data transfer and proper interpretation of the characters.
- **Binary File Flag**: For files that are binary or require non-textual encoding, users should enable the appropriate flag to prevent automatic UTF-8 conversion and ensure the file's integrity. Transformations are not supported when this flag is enabled.

By understanding Connxio's default UTF-8 conversion and considering the implications of encoding changes, users can effectively manage data consistency and compatibility within their integrations.