# Environment Variables

Environment variables provide a flexible and secure way to store and manage configuration settings for your integrations. By using environment variables, you can set a default value that will be used in all subscriptions, but also have the ability to override that value with a subscription-specific value. This allows for easy configuration of integrations in each subscription without the need to hard-code information such as API endpoints, etc. By using environment variables, you can also easily update and manage these settings, ensuring your integrations are always up-to-date

## Defining Environment Variables

To create an Environment Variable, navigate to the menu item with the same name. From here, click on the '+' symbol on the top-right hand side of the page. An Environment Variable has three types of parameters:

- **Name:** The name of the variable. If you want to group several variables, use '.' notation. For example, if you have two variables named 'Customer.ApiUrl' and 'Customer.ApiKey', they will both be grouped under 'Customer' and will show as 'ApiUrl' and 'ApiKey'. When referring to these variables later, you'll still have to refer to them as 'Customer.ApiUrl' and so on.
- **Default Value:** This is the default value of the variable. If no Subscription Value is set, this is the value that the variable will output in all subscriptions.
- **Subscription Value:** Here you define the specific value for all subscriptions. You can define specific values for one or more subscriptions. Subscriptions where this value is not set will fall back to using the Default Value.

![Environment variables](/img/docs/env-vars-light.webp#light-only)![Environment variables](/img/docs/env-vars-dark.webp#dark-only)

## Using Environment Variables

Once the environment variable is set, you can reference it in your code by using the macro
```
{env:[MY-VARIABLE]}
```

For example, if you have an environment variable named "Customer.ApiUrl" you can refer to it in your integration by using the macro:
```
{env:Customer.ApiUrl}
```

If a subscription-specific value is set for an environment variable, the macro will be replaced with that value when the integration is running within that subscription's context. If no subscription-specific value is set, the default value will be used instead.

:::caution
When referencing an Environment Variable, do not use whitespaces in between the '{' and '}' and the macro text.
:::