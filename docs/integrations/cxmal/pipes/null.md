
# Null pipe

Use the null pipe to handle null reference errors during macro processing.

Supported pipe actions are:
* Ignore
* remove
* fallback
* terminate

## Example: Ignore

Use this pipe to ignore the error and return the string with the unprocessed macro

#### Input
```
My name is: {file:names[-1] | null: ignore}
```

#### Output
```
My name is: {file:names[-1] | null: ignore}
```


## Example: Remove

Use this pipe to remove the macro if it resolves to null

#### Input
```
My name is: {file:names[-1] | null: remove}
```

#### Output
```
My name is: 
```

## Example: Fallback

Use this pipe to return a fallback value if the macro would resolve to a null value

#### Input
```
My name is: {file:names[1] | null: fallback John M.}
```

#### Output
```
My name is: John M.
```

## Example: Terminate

Use this pipe to terminate the current message when the macro would resolve to a null value.

#### Input
```
My name is: {file:names[1] | null: terminate}
```

Results in a terminated message for the integration.

