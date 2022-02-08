# Metadata

When the pipeline instance is created within CX upon data entering through an adapter, a context is implicitly created with the message. This context describes what type of message and what type of transformations said message will experience through CX. All of this information is compiled into an object we have called `metadata` which follows the message on its journey through the CX pipeline. The metadata object is used for various purposes internally in CX and it's also possible make CX include the object in log events. For Archeo we have a separate system for metadata that is displayed in its own section of the archeo log (see [Archeo](https://api.archeo.no/swagger/index.html) for further information), for other logging providers the metadata is included in the JSON as its own object.

The metadata object has the following contract:

```json
  {
    "userDefinedProperties": "Is filled with properties defined within code components",
    "outboundEndpoint": "the outbound endpoint if applicable",
    "outboundAdapter": "the outbound adapter name. Ie. SFTP, Rest, ++",
    "inboundEndpoint": "the inbound endpoint if applicable",
    "inboundAdapter": "the inbound adapter name. Ie. SFTP, Rest, ++",
    "outboundBlobName": "the name of the blob inside CX when handled in the outbound enige. This is used for debug purposes when cases are reported to the CX team",
    "transformationBlobName": "See outboundBlobName",
    "configCorrelationId": "The correlationId",
    "manualResendCount": "The number of times the message has been resent using the resend framework for manual resend by the customer",
    "dataCollection": "all data collected by data collection. Is shortened if too long.",
    "started": "0001-01-01T00:00:00", // When the pipeline in cx was started
    "outboundFileName": "the name of the file outbound if applicable",
    "inboundFileName": "the name of the file inbound if applicable",
    "interchangeId": "the interchangeId",
    "transactionType": "the transaction Type"
  }
```