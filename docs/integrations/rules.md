---
title: Rules
sidebar_position: 10
---

# Rules

Conditional rules can be applied to subintegrations and outbound connections. These rules determine whether each message in the integration should continue or not.

Use [CxMaL](/integrations/cxmal/connxio-macro-language) macros in your conditions to create expressive rules.

## Condition syntax

* `true` / `false`: Represents boolean values for true and false respectively.

* `>` / `<` / `>=` / `<=`: Comparison operators to evaluate numeric values.

* `==` / `is` / `eq`: Evaluates to true if left and right sides are equal.

* `!=` / `is not`: Evaluates to true if left and right sides are not equal.

* `&&` / `and`: Logical AND operator; evaluates to true if both left and right sides are true.

* `||` / `or`: Logical OR operator; evaluates to true if either left or right side is true.

* `()`: Parentheses can be used to create more complex conditions by altering the order of operations.

## Example: strings

Strings must be enclosed in single or double quotation marks.

```
'{filename}' == 'myFile'
```
or
```
"{filename}" == "myFile"
```

## Example: Check file content

Use the [CxMaL File Macro](/integrations/cxmal/macros/file.md) to create conditions based on whats in the file content of the message.

```
'{file:username}' == 'admin'
```


## Example: Using Parentheses

In this example, we use parentheses to ensure that the conditions `(true == true)` and `(5 != 10.5)` are evaluated separately and then combined using the logical AND operator `&&`. This allows for more precise control over the evaluation order and logic of the condition.
```
(true == true) && (5 != 10.5)
```

## Example: Check if array contains a value

Use the [CxMaL File Macro](/integrations/cxmal/macros/file.md) in conjunction with the [CxMaL Array Pipe](/integrations/cxmal/pipes/array.md) to check if an array contains a value.

```
{file:myArray | array: contains('John')} == true
```

* ```{file:myArray}``` Retrieves the array ```myArray``` from the file
* ```| array:contains('John')``` checks if the array contains the value 'John'.
* The condition evaluates to true if ```'John'``` is present in the array.