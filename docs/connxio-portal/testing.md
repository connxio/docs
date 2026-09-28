---
title: "Testing"
sidebar_position: 4
---

# Testing

Use **Testing** in the Connxio Portal to run integrations with test input, check expected outcomes, and inspect processing results. Test groups collect the integrations you want to test together, while test runs record the results of each execution.

:::info Subscription usage
Messages generated during testing count toward your subscription usage.
:::

## Create a test group {#test-groups}

1. Open **Testing** in the portal.
2. Select **Create your first test group** when creating your first group.
3. Give the group a name that describes what it tests.
4. Add integrations from the list on the left.
5. Select **Save**.

After saving, use **Test file** to configure input and **Assert** to define the expected outcome.

### Set the test input

1. Select **Test file**.
2. Upload an input file or enter the message content directly.
3. Set input for each integration, or use **Apply to all** to use the same input across the group.
4. Save your changes.

### Define assertions

Select **Assert** to configure conditions using the [CxMaL StatusEvent macro](../cxmal/macros/statusevent.md). Assertions let you check successful processing, expected failures, or specific error codes.

For example, a test can expect an integration to reject invalid input. An assertion that checks the expected error code allows that test to pass when the intended failure occurs.

### Start a test run

Once the integrations, input, and assertions are configured, select **Start test run**.

A test run containing integrations with an API trigger requires an [API key](./apikeys.mdx).

## Review test runs {#test-runs}

The test group overview displays the result of the latest run. Expand a group's row to see the integrations it contains and the status of each one.

Select **History**, beside **Start test run**, to review earlier runs. Select an integration in an expanded test group to open its run details.

## Inspect test details {#test-details}

Use the run details to review the outcome and investigate errors. Follow the integration flow, inspect the available message content, and review the events that explain the result.

- Review the run's status, start time, and duration.
- Follow the processing steps to locate where a failure occurred.
- Use the download controls to download the message content available for a step.
- Open **Logs** to review processing events, status events, assertion results, and error messages. Expand entries to inspect their details.
- Select **Open integration** to return to the integration configuration.

For example, a trigger can complete successfully while a later action fails an assertion. Review the failed step and its log entries to understand which condition was not met.

## Investigate a failed test

1. Open the failed integration's run details.
2. Review the error and assertion results to identify the affected step.
3. Inspect the test input and any available content from that step.
4. Update the integration, test input, or assertion as appropriate.
5. Start another test run and compare its result with the previous run in **History**.
