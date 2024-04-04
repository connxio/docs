
# File macro


The file macro can be used to access the filecontent of an integration if it contains JSON or XML syntax. The macro uses JSONPath expressions to specify the JSON node. 

## Example 1: JSON

#### Filecontent
```json
{
    "user1": {
        "name": "Alice",
        "scores": [7, 5, 3, 8, 2, 9, 4]
    },
    "user2": {
        "name": "Bob",
        "scores": [1, 6, 2, 5, 3, 7, 4]
    }
}
```

Input:
```
{file:user1.name}'s score: {file:user1.scores[1]}
```

Output:
```
Alice's score: 5
```

## Example 2: XML

#### Filecontent
```xml
<note>
    <to>You</to>
    <from>Me</from>
    <heading>Integration</heading>
    <body>Use ConnXio!</body>
</note>
```

#### Input
```
{file:note.body}
```

#### Output
```
Use ConnXio!
```