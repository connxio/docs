# Encoding

Encoding is a complex and hazardous area of integration. When we talk about encoding in ConnXio (CX) we mean the actual character encoding used to compile the messages or files. A in depth overview of encoding can be found on [Wikipedia](https://en.wikipedia.org/wiki/Character_encoding). This page describes how CX handles encoding and potential pitfalls.

## How ConnXio handles encoding

In CX we handle encoding by transforming all text to utf-8. We do this by leveraging the internal library for .net which converts characters between character sets. This means that we support all encoding sets that uses characters included in utf-8 (a complete list can be found here; <https://www.charset.org/utf-8>). The utf-8 character set is very large and encompasses most scenario's, if you want CX to process files that have characters outside utf-8 you can contact us for more information or help.\
The actual encoding process used by CX when handling files looks like this:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Encoding%20diagram.png?sv=2020-08-04&st=2021-11-25T13%3A06%3A15Z&se=2040-11-26T13%3A06%3A00Z&sr=b&sp=r&sig=Pk4UavUnTU2cN%2Be1p%2Be6qgOd5y6%2FMM2AbRlIF1foMzQ%3D)

The example above has configured Ascii as the inbound encoding and Iso 8859-1 as the outbound encoding.

## Potential pitfalls

To avoid pitfalls please refer to the following list and adhere to it as much as possible:

1. Be sure to check the actual encoding of your inbound file. If the encoding is configured wrong the error may be almost impossible to detect until production systems suddenly start to store garbled data.
2. Check that the outbound encoding support all characters from the inbound encoding. The content will be garbled if a character is not present in the outbound set. As such *inbound encoding must be larger that the outbound*.
3. If you have very large incoming sets check that they are nor larger than utf-8.
4. Do tests with uncommon characters before deploying an integration to into production.