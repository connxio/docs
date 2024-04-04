
# Error pipe

Use the error pipe to handle errors during macro processing.

Supported error pipes are:
* Ignore
* remove
* fallback
* terminate

## Example: Ignore

Use this pipe to ignore the error and return the string with the unprocessed macro

#### Input
```
My name is: {file:names[-1] | error: ignore}
```

#### Output
```
My name is: {file:names[-1] | error: ignore}
```


## Example: Remove

Use this pipe to remove the macro if it fails

#### Input
```
My name is: {file:names[-1] | error: remove}
```

#### Output
```
My name is: 
```

## Example: Fallback

Use this pipe to return a fallback value if the macro should fail

#### Input
```
My name is: {file:names[-1] | error: fallback John M.}
```

#### Output
```
My name is: John M.
```

## Example: Terminate

Use this pipe to terminate the current message when the macro fails.

#### Input
```
My name is: {file:names[-1] | error: terminate}
```

Results in a terminated message for the integration.

