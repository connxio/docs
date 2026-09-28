---
sidebar_position: 20
title: "Moving to actions"
description: "Plan, rebuild, and test an existing subintegration flow using triggers and actions."
---

# Moving to actions

This guide walks through rebuilding an existing subintegration flow with triggers and actions. Start with the [Getting started with actions](./getting-started.md?editor=actions) for a tour of the editor. The [Legacy tab](./getting-started.md?editor=legacy) covers integrations that use subintegrations.

## From subintegrations to actions

Previously, integrations were organized around an inbound connection and subintegrations, each with transformations and an outbound connection. The new model expresses the flow as individual actions and the connections between them.

| Previous concept                         | In an action based integration                                             |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| Inbound connection                       | A trigger defines how messages enter the flow.                             |
| Transformation steps                     | Actions process the message at the points where you need them.             |
| Outbound connection                      | An action sends or retrieves data and can have actions after it.           |
| Separate subintegrations                 | Branches define separate processing paths; scopes group related actions.   |
| A fixed sequence within a subintegration | Connections define which action runs next and which outcome it runs after. |

Sending is an explicit step: add an action such as HTTP, Azure Blob, or Service Bus wherever the flow needs to communicate with another system. Finishing a transformation at the end of a path does not automatically send its output anywhere.

## Current limitations and breaking changes

Review these differences before moving a legacy integration to actions:

### Handle file as binary

**Handle file as binary** (`handleAsBinaryFile`) is not yet supported for action based integrations. Keep integrations that depend on this setting on the legacy model until support is available.

### ACK messages {#acknowledgments-ack}

The legacy **Send ACK** feature and its ACK options are not supported for action based integrations. Existing ACK settings do not carry over as ACK behavior.

Instead, create branches that run after the relevant action's outcome:

- Use `runAfter: Succeeded` to prepare and send a positive ACK.
- Use `runAfter: Failed` to prepare and send a negative ACK.
- Include `Skipped` if the receiving system also needs a notification when a step is skipped.

Add actions in each branch to build the ACK content and send it through the required destination, such as HTTP or Service Bus. For example, the first action in a negative ACK branch can use:

```json
"runAfter": {
  "deliver-message": ["Failed"]
}
```

Here, `deliver-message` is the ID of the action whose failure the branch handles. Configure the ACK content and destination explicitly, and test both success and failure paths. Failure branches do not replace [retry handling](./retry.md) for transient errors.

The [ACK guide](./acknowledgment.md) describes the legacy feature.

## 1. Record the existing behavior

Before rebuilding the flow, record its inbound connection and each subintegration's transformations, their order, conditions, and destination. Keep representative input messages and expected outputs so you can compare the two flows.

Include the settings that affect processing: security configurations, formats and encodings, schedules, retries, logging, user defined properties, duplicate detection, and ACK messages where used.

## 2. Rebuild the processing paths

Create an action based integration and configure a trigger that matches the existing inbound connection. Carry over the relevant connection, input format, encoding, and scheduling settings.

For each subintegration:

1. Add the corresponding transformation actions in their original order.
2. Add an explicit destination action for its outbound connection.
3. Connect each step to the preceding action with the appropriate outcome rule.
4. Copy the operation settings and select the required security configurations.

For example, two subintegrations that each transform and deliver a message become two paths after the trigger:

```text
Trigger
    ├── Prepare for archive ── Azure Blob
    └── Prepare for API ────── HTTP
```

Keep destination-specific transformations on their own branches. Move preparation before the branch only when both destinations should receive that same prepared content.

Use a [Scope](../actions/scope.md) when a group needs a shared condition or user defined properties. A scope currently supports a single entry and a linear chain. Keep parallel paths outside that grouping, and do not connect them to a shared step that waits for both: the current engine does not synchronize branch completion.

## 3. Review conditions and continuation rules

An action's **Condition** decides whether it executes. Its successor's `runAfter` rule decides whether processing continues after the result.

- Use `Succeeded` for steps that require the preceding action to complete successfully.
- Include `Skipped` when the next step should also run after a disabled action or a condition that evaluates to false.
- Use `Failed` for a failure path, while retaining the appropriate [retry settings](./retry.md) for transient errors.

For example, if an optional preparation step can be skipped but delivery should still happen, the delivery action can accept both outcomes:

```json
"runAfter": {
  "prepare-message": ["Succeeded", "Skipped"]
}
```

Here, `prepare-message` is the preceding action's ID. Review termination steps too: a termination outcome is represented as `Skipped` in graph traversal, so a successor accepting that outcome can continue processing.

When transferring a subintegration-wide condition, consider applying it to a scope containing that path. Check the connections after the scope as well, so a skipped group continues or ends where you intend.

## How the configuration represents the flow

In Code view, the main building blocks are:

- `triggers`: the entry settings for incoming messages.
- `actions`: a dictionary of actions keyed by action ID. Each action has a type, name, enabled state, and settings for its operation.
- `runAfter`: connections to preceding actions and their accepted outcomes. Top-level actions with no dependencies are the starting actions.
- `scopeId`: the containing scope, when an action belongs to one.

These connections determine execution order. The order of entries in the action dictionary does not define a sequence.

## 4. Compare test results

Use the same representative messages in both flows and compare:

- The final content, format, encoding, and destination of each message.
- Paths where conditions are true or false, including disabled or optional steps.
- Error handling, retries, and any termination behavior.
- Metadata, logging, and any splitting, batching, or ACK behavior the integration uses.

Test against destinations where sending these messages is appropriate. Confirm each branch independently; branches start with the content at the split and can complete in any order.

## 5. Switch the message source

After validating the new flow, coordinate the switch so the legacy and action based integrations do not process the same incoming messages unintentionally. Disable the legacy integration as part of the switch, enable the new one, and update callers or source routing where needed. If you created a separate integration, check references to the legacy integration ID, including API callers and redirects.

Verify the first messages through the new flow and check the receiving systems. Keep the legacy configuration available until you have confirmed the replacement behaves as expected.
