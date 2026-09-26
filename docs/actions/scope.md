---
sidebar_position: 50
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';

# Scope

The Scope action groups other actions into a container. Use it to organize a section of the pipeline, apply a shared condition to a group of actions, or attach user defined properties that all actions inside the scope inherit.

## Configure the action

Add a Scope action to your integration, then drag the actions you want to group into it. Connxio runs the first action placed inside the scope; that action's `RunAfter` chain determines how the rest of the actions inside the scope run. A scope with no actions inside it is skipped and processing continues with the next action after the scope.

## General settings

<ActionGeneralSettings />

The scope's own **Condition** and **Output format** apply only to entering the scope. Actions inside the scope evaluate their own conditions and inherit output format from the scope unless they set their own.

## User defined properties

Define key/value pairs that are added to the message metadata when the scope is entered, and made available to every action inside the scope, including messages produced by splitting or batching within it.

<PropertyReference properties={[
{
name: "Key",
description: "The property name added to the message metadata.",
example: "Test",
},
{
name: "Value",
description: "The property value. Supports CxMaL expressions.",
example: "test",
},
]} />

Use **Add property** to add a row, and the trash icon to remove one.

A property is only added if no property with the same key already exists on the message, so an inner scope can't override a property set by an outer scope. When processing leaves the scope, its user defined properties are removed from the message metadata; they don't leak into actions that run after the scope.

## Limitations

A scope currently runs a single entry action; branching to multiple entry actions inside a scope isn't supported.
