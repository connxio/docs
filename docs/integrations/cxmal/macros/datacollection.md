# Datacollection

Used to access the data populated by [Data Collection](/integrations/transformation/data-collection).


## Example 1

#### Data

```json
"dataCollection": 
    [
        { "apiResponse": "{\"status\": 200, \"body\": { \"id\": 1, \"name\": \"John\" }}" }
    ]
```

#### Input

```
{datacollection:apiResponse}
```

#### Output

```
{\"status\": 200, \"body\": { \"id\": 1, \"name\": \"John\" }}
```

## Example 2: Access json value

The dataCollection macro supports the addition of `#json` to access json values.

#### Data
```json
"dataCollection": 
    [
        { "apiResponse": "{\"status\": 200, \"body\": { \"id\": 1, \"name\": \"John\" }}" }
    ]
```

#### Input
```
{datacollection#json:apiResponse.body.name}
```

#### Output
```
John
```
