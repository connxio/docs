
# String pipe

Use the string pipe to transform a macro output to lowercase or uppercase.

## Example: toUpper

Filename is `MyFile.txt`

#### Input
```
{filename | string: toUpper}
```

#### Output
```
MYFILE
```

## Example: toLower

Filename is `MyFile.txt`

#### Input
```
{filename | string: toLower}
```

#### Output
```
myfile
```