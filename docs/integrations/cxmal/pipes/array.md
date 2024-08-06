
# Array pipe

The array pipe supports the following methods

contains(value) <br />
contains(variable == value)

notContains(value) <br />
notContains(variable == value)

## Example: array contains value

File content:
```json
"myArray": [ 5, 13, 36 ]
```

#### Input
```
{file:myArray | array contains(13)}
```

#### Output
```
true
```

## Example: array does not contain value

File content:
```json
"myArray": [ "John", "Mike", "Lisa" ]
```

#### Input
```
{file:myArray | array notContains('Joe')}
```

#### Output
```
true
```

## Example: array of objects contains value

File content:
```json
"myArray": 
    [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "Mike"
        }
    ]
```

#### Input
```
{file:myArray | array contains(id == 1)}
```

#### Output
```
true
```

## Example: array of objects does not contain value

File content:
```json
"myArray": 
    [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "Mike"
        }
    ]
```

#### Input
```
{file:myArray | array notContains(name == 'Lisa')}
```

#### Output
```
true
```