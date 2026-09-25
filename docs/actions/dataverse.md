import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';
import ActionDuplicateDetection from '@site/src/components/ActionDuplicateDetection';
import Link from '@docusaurus/Link';

# Dataverse

The Dataverse action retrieves or writes data in a Dataverse environment. Choose **Get** to retrieve records, or **Upsert** to create or update records using a schema that maps message fields to Dataverse attributes.

## Configure the action

Add a Dataverse action to your integration, select a Dataverse security configuration, and choose the operation to perform. For Upsert, upload a JSON schema through the portal's **Schemas** page or use **+** beside the schema selector.

## General settings

<ActionGeneralSettings showOutputEncoding />

## Connection settings

<PropertyReference properties={[
  {
    name: "Variable name",
    description: <>Required. The key used to store retrieved data or the Upsert response in metadata data collection. Access it later using the <Link to="/cxmal/macros/datacollection/">data collection macro</Link>.</>,
    example: "DataverseResult",
  },
  {
    name: "Security configuration",
    description: <>Required. Select a <Link to="/integrations/security-configurations/#dataverse">Dataverse security configuration</Link> containing the connection properties for your environment. Use <strong>+</strong> to create a configuration.</>,
  },
  {
    name: "Operation",
    description: "Required. Choose Get to retrieve records or Upsert to create or update records.",
  },
]} />

## Get settings

Select **Get** to configure the records and fields to retrieve.

<PropertyReference properties={[
  {
    name: "Entity name",
    description: "Required. The Dataverse entity to retrieve records from.",
  },
  {
    name: "Filter",
    description: "Optional. Conditions used to narrow down the records returned from Dataverse.",
  },
  {
    name: "Selected fields",
    description: <>The columns to retrieve. Enter a field name and press <strong>Enter</strong> to add it. Leave empty to retrieve all columns.</>,
  },
]} />

## Upsert settings

Select **Upsert** to create or update records from JSON message content.

<PropertyReference properties={[
  {
    name: "Schema",
    description: <>Required. Select the schema defining how JSON message fields map to Dataverse attributes and which fields to return. Use <strong>+</strong> to create a schema.</>,
  },
  {
    name: "Batch messages",
    description: <>Enable to queue messages and send them to Dataverse in batches. Batch limits and scheduling are configured in the <Link to="/integrations/security-configurations/#dataverse-batch-limits">Dataverse security configuration</Link> and shared across integrations using that configuration.</>,
  },
]} />

### Batching

Batch messages to control the rate of delivery to Dataverse. A lower maximum batch size reduces the number of messages sent at once and the load on the receiving environment.

## Duplicate detection

<ActionDuplicateDetection />

## Schema mapping

The Upsert operation expects JSON message content. The schema defines how fields in the JSON correspond to Dataverse attributes. For example, the following fragment maps `myKey` to the string attribute `my_attribute`:

```json
{
  "attributeName": "my_attribute",
  "attributeDataType": "String",
  "dataFieldName": "myKey"
}
```

With this mapping, the following message upserts a record with `foo` as the value of `my_attribute`:

```json
{
  "myKey": "foo"
}
```

Use an array to upsert multiple records in a single request:

```json
[
  {
    "myKey": "foo"
  },
  {
    "myKey": "bar"
  }
]
```

### Responses

Define `returnFields` in the schema to select the values returned for each upserted record. For example, include this property in the schema:

```json
{
  "returnFields": [
    "my_attribute"
  ]
}
```

The response is stored in metadata data collection under the configured **Variable name**. Use the [data collection macro](../cxmal/macros/datacollection.md) to access it in later actions.
