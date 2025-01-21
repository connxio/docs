# Dataverse

The Dataverse adapter allows customers to create integrations with external Dataverse instances.  

The adapter currently supports retrieving and upserting data as either a transformation or an outbound step.

## Configuring the Dataverse Adapter

### Creating a Security Configuration

The first step is to create a Dataverse security configuration. This can be done on the `Security Configurations` page in the main navigation menu. Read more about security configurations [here](/connxio-portal/security-configurations).

Select the `Dataverse` security type and enter the credentials for your Dataverse environment. The security configuration can then be reused across multiple integrations if needed.

### Uploading a Schema

Navigate to the `Schemas` page in the main navigation menu to upload a new schema. This is a JSON file that describes how the Dataverse adapter should behave.

### Configuring the Adapter

The Dataverse adapter currently supports two operations:

- **GET**: Retrieve data from Dataverse.
- **UPSERT**: Add or update data in Dataverse.

When creating a new adapter, a popup with the adapter's input fields will appear. The fields vary depending on the selected operation.

Read more about the properties in each section below:

#### Core Settings

- **Variable name**: Data retrieved from Dataverse is stored in metadata datacollection under this key.
- **Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) containing the connection properties.
- **Schema**: The schema defining data behavior, such as input and output fields.
- **Operation**: The operation for the request (`GET` or `UPSERT`).

#### Additional GET-Specific Settings

- **Entity name**: The entity in Dataverse from which data is retrieved.
- **Filter**: Conditions used to narrow down the data returned from Dataverse (`'foo' eq 'bar'`).
- **Selected fields**: The columns to retrieve from Dataverse. Leave empty to retrieve all columns.

### Using the Adapter

The Dataverse adapter expects data to be in JSON format. The schema defines how fields in the JSON correspond to fields in Dataverse.

For example, consider the following snippet from a schema definition:

```json
{
    "attributeName": "my_attribute",
    "attributeDataType": "String",
    "dataFieldName": "myKey",
}
```
 
And the file content for the message containing a value for `myKey` like so:
 
```json
{
    "myKey": "foo"
}
```
 
The Dataverse adapter will then upsert a row with the value `foo` for the attribute `my_attribute` in dataverse when upserting data.
 
It is also possible to upsert multiple rows at once with the use of arrays:
 
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
 
This will upsert two rows in Dataverse in a single request.
 
 
#### Responses
 
`returnFields` can be defined in the schema to determine what to return when upserting a row to Dataverse.
 
```json
"returnFields": [
    "my_attribute"
],
```
 
The value for `my_attribute` will then be returned for every row that is upserted. The response is made available in datacollection in metadata under the variable name that was defined in the adapter settings. The response can be used later in the integration with the use of [CxMaL datacollection macro](/integrations/cxmal/macros/datacollection).