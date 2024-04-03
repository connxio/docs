
# User-defined properties

Access the user-defined properties key/value set. This set is populated from within code mapping. Use the key set from within the code mapping to select the corresponding value. If the value is JSON parsable you can add the "#json" suffix to target JSON nodes.



## Example

#### Input
```
{userdefinedproperties#json:myjson.name} says {userdefinedproperties:message}
```

#### Output

```
John says hello
```

