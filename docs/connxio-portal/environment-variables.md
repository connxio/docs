import PropertyReference from '@site/src/components/PropertyReference';

# Environment variables

Environment variables store values that can be reused across integrations, such as API endpoints. Define a default value for all subscriptions and override it for individual subscriptions when needed.

Use the **Environment variables** page to create and edit variables, organize them into groups, and see which integrations use them.

## Create a variable {#defining-environment-variables}

1. Open **Environment variables** in the portal.
2. Select **+** below the variable list.
3. Enter a **Name**. Use dots to group related variables, such as `Customer.ApiUrl`.
4. Enable **Secret** if the variable holds a sensitive value.
5. Enter a **Default value** and any subscription-specific values under **Subscription Values**.

### Variable settings

<PropertyReference properties={[
  {
    name: 'Name',
    description: 'The name used to reference the variable. Names are case-insensitive. Use dot notation to organize related variables into logical sections.',
    example: 'Customer.ApiUrl',
  },
  {
    name: 'Secret',
    description: 'Mark the variable as a secret for sensitive values, such as an API key.',
  },
  {
    name: 'Default value',
    description: 'The value used when no subscription-specific value is set.',
    example: 'https://api.example.com',
  },
  {
    name: 'Subscription Values',
    description: 'Override the default value for individual subscriptions. Each field is labeled with its subscription name. Subscriptions without an override use the default value.',
  },
]} />

## Organize variables

The list on the left groups variable names by their dot-separated sections. For example, `Customer.ApiUrl` and `Customer.ApiKey` appear under **Customer** as **ApiUrl** and **ApiKey**.

Expand a group to browse its variables, then select a variable to edit it. When referencing a grouped variable, use its full name, including the section: `Customer.ApiUrl`.

Names are case-insensitive, so changing capitalization does not create a distinct variable name.

## Use a variable {#using-environment-variables}

Reference a variable in an integration field that supports [CxMaL](../cxmal/connxio-macro-language.md) using the `env` macro:

```text
{env:Customer.ApiUrl}
```

Replace `Customer.ApiUrl` with the full variable name. Do not add spaces between the braces and the macro text.

Connxio resolves the value for the subscription in which the integration runs:

1. Use the subscription-specific value if one is set.
2. Otherwise, use the default value.

For example, configure `Customer.ApiUrl` with a default value and an override for a test subscription:

| Subscription | Configured override | Resolved value |
| --- | --- | --- |
| Test | `https://test-api.example.com` | `https://test-api.example.com` |
| Production | None | `https://api.example.com` (the default) |

Both integrations use the same expression, `{env:Customer.ApiUrl}`, while each receives the value for its subscription.

## Review where a variable is used

Select a variable to see its usage below the variable list. The summary shows how many integrations and subscriptions use it. Integrations are grouped by subscription, with a link beside each integration to open it.

Review these references before changing a value or renaming a variable. A shared value can affect several integrations; references use the variable's full name.

## Delete a variable

1. Select the variable in the list.
2. Review its usage and update integrations that still reference it.
3. Select **Delete variable**.
