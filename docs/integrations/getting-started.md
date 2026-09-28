---
sidebar_position: 1
title: "Getting started"
description: "Create your first Connxio integration using actions or the legacy subintegration editor."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Getting started

Choose **Actions** for the new editor or **Legacy** for the subintegration editor. To move an existing integration to actions, follow the [migration guide](./move-to-actions.md).

<Tabs defaultValue="actions" queryString="editor">
<TabItem value="actions" label="Actions">

An integration in Connxio is a flow of connected actions. A **trigger** brings a message into the integration, and **actions** describe what happens next: transform the content, call an API, store a file, or send the message to another system.

The visual editor lets you arrange these steps on a canvas and branch the flow where different systems need their own processing. You can prepare a message once, then send it to several destinations, or call an API and use its response in later actions.

## Find your way around the editor

The **Configuration** view brings together:

- **Integration settings** on the left: name, description, sender, receiver, logging, retry settings, and system settings.
- **The canvas**: a trigger and connected actions showing the processing paths. Use the **+** controls to add steps and the zoom controls and minimap to navigate larger flows.
- **Editor, Code, and Test** tabs: work visually, inspect the configuration, and test the flow.
- **Enabled** and **Update integration** controls at the top: control whether the integration is active and save changes to an existing integration.

For example, a flow can share preparation steps before sending to two destinations:

```text
API trigger
    │
Prettify
    │
Script
    ├── Azure Blob
    └── HTTP
```

With the actions enabled and connected to run after success, Connxio formats the incoming message, runs the script, and passes the resulting content to both destination actions. Each branch starts with the content available at the branching point and continues independently. One branch's changes do not become the other branch's input, and their completion order is not guaranteed.

## Build your first flow

Watch how to create an integration in the action editor:

<div style={{ textAlign: 'center' }}>
    <video controls playsInline preload="metadata" aria-label="Creating an integration" style={{ width: '95%', borderRadius: '12px', border: '1px solid #3fcdea' }}>
    
      <source src={useBaseUrl('/video/creating-an-integration.mp4')} type="video/mp4" />
      <a href={useBaseUrl('/video/creating-an-integration.mp4')}>Watch Creating an integration</a>
    </video>
</div>

### 1. Set up the integration and trigger

Create an integration and give it a name and description that explain its purpose. Set **Sender** and **Receiver** to identify the systems involved in logging.

Choose a [trigger](../triggers/index.mdx) for the source of your messages. For example, the [API trigger](../triggers/api.mdx) starts processing when you send data to the Connxio Messaging API. Configure the trigger's input format, encoding, and connection settings as needed.

Action based integrations support multiple triggers. To add another trigger, right-click an existing trigger on the canvas to access the option.

Create or select a [security configuration](./security-configurations/security-configurations.md) for connections that require credentials.

### 2. Add the processing steps

Use **+** below the trigger to add an action. Give each action a meaningful name so the flow is easy to follow when testing or investigating a failure.

For a JSON message, you could add [Prettify](../actions/prettify.md), then a [Script](../actions/script.md) that prepares the fields the receiving system expects. Each step receives the current message content from the preceding step.

### 3. Connect a destination

Add an [HTTP](../actions/http.md) action after the processing steps. Configure its method, URL, authorization, and request body. Enable **Use content as request body** when the endpoint should receive the current message content.

To also archive the prepared message, add an [Azure Blob](../actions/azure-storage/azure-blob.md) action as another branch after the same processing step. Both destination actions should depend on that step, rather than on each other.

An HTTP action can also collect response data or replace the current content with its response, depending on its settings. Connect further actions when you need to process that result.

### 4. Save and test

Save the integration, then use **Test** with a representative message. Check which actions succeeded, failed, or were skipped, and verify the content received by each destination. For an existing integration, use **Update integration** to save your changes.

Test any conditions and alternative paths as well as the successful path. Review the integration's **Enabled** setting when it is ready to receive messages.

## Decide when an action runs

Watch how to configure which outcomes an action runs after:

<div style={{ textAlign: 'center' }}>
    <video controls playsInline preload="metadata" aria-label="Configure run after" style={{ width: '95%', borderRadius: '12px', border: '1px solid #3fcdea' }}>
    
      <source src={useBaseUrl('/video/configure-run-after.mp4')} type="video/mp4" />
      <a href={useBaseUrl('/video/configure-run-after.mp4')}>Watch Configure run after</a>
    </video>
</div>

Connections carry execution rules. In the configuration, these are called `runAfter`: an action refers to a preceding action's ID and the outcomes it accepts.

| Outcome     | Meaning                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `Succeeded` | The preceding action completed successfully.                                                      |
| `Failed`    | The preceding action failed and execution was routed to a failure path.                           |
| `Skipped`   | The preceding action was disabled, its condition was false, or it produced a termination outcome. |

An action can accept more than one outcome from its predecessor. For example, this connection allows a step to continue after an optional preparation action either succeeds or is skipped:

```json
"runAfter": {
  "prepare-message": ["Succeeded", "Skipped"]
}
```

This is a configuration fragment; `prepare-message` must be the ID of the preceding action.

A **Condition** is a separate rule evaluated before the action runs. Use a [CxMaL expression](../cxmal/connxio-macro-language.md) to decide whether that action should execute for the current message. If the condition is false, the action is skipped and its content passes through unchanged. A successor configured only for `Succeeded` will not run after that skip.

Failure paths and [retry settings](./retry.md) serve different purposes. The transformation engine follows a `Failed` connection for a non-transient failure when a matching successor exists. Transient failures follow retry handling; a failure connection does not replace that behavior.

## Group steps with scopes

A [Scope](../actions/scope.md) groups related actions. Use it to apply a shared condition to a section of the flow or provide user defined properties to the actions inside it. After the final action inside the scope, processing can continue with actions connected after the scope.

Keep a scope as a single chain with one entry action. Multiple entry actions inside a scope are not currently supported. Likewise, keep parallel branches independent: the current execution engine does not synchronize them into a shared step that waits for both branches to finish.

Explore the [action reference](../actions/index.mdx) for the settings available on each step, or the [trigger reference](../triggers/index.mdx) to connect another message source.

</TabItem>
<TabItem value="legacy" label="Legacy">

This guide covers legacy integrations, where an integration has an inbound connection and one or more subintegrations containing transformations and an outbound connection.

To get started with Connxio and set up your first integration, follow the steps outlined below:

## Accessing the Connxio Web Portal

1. Open your web browser and navigate to the Connxio web portal login page.
2. Enter your login details provided by Evidi to access the portal.
3. Once logged in, you will be presented with the Connxio web portal dashboard.

## Creating Security Configurations

<details>
    <summary>What are security configurations?</summary>
    <p>
A security configuration in Connxio is a reusable set of credentials and settings that enables secure connections with external systems. It provides a centralized and protected way to store sensitive information, such as API keys and authentication details, ensuring the secure and confidential exchange of data during integrations.
<br />
<br />
[Read more about security configurations here.](../integrations/security-configurations/security-configurations.md)
    </p>
</details>

1. Once logged in, locate the "Security Configurations" section in the Connxio web portal's main menu and click on it.
2. Within the "Security Configurations" section, click on the "New Security Configuration" button to initiate the creation process.
3. Select the appropriate security configuration type based on your integration requirements, such as "Webhook", "SFTP", "FTP", "Connection String", "Email", or "Archeo".
4. Configure the necessary settings and credentials for the selected security configuration type, following the specific requirements for each type.

## Creating a New Integration

1. After creating the required security configurations, locate the "Integrations" section in the Connxio web portal's main menu and click on it.
2. Within the "Integrations" section, click on the "Add Integration" button to initiate the creation process.
3. Provide a suitable name and description for your integration. This will help you identify its purpose and functionality.
4. Enter a sender and receiver which helps you easily identify the systems involved in the integration.
5. Enter the file format of the input file, as well as the file encoding. ([Read more about encoding here](./encoding.md))

## Configuring the Inbound Adapter

<details>
    <summary>What is an adapter?</summary>
    <p>
An adapter serves as a bridge between systems, facilitating the transfer of data using various protocols. It enables seamless integration by providing standardized methods for sending and receiving information, allowing for efficient and flexible data exchange within the Connxio platform.
    </p>
</details>

1. On the configuration page, select the appropriate inbound adapter from the available list of supported adapters, such as API/Webhook, Azure Blob Storage, Email, etc.
2. Configure the necessary settings and security configuration for the selected inbound adapter.

## Configuring the Outbound Adapter

1. After configuring the inbound adapter, proceed to configure the outbound adapter.
2. Select the desired outbound adapter based on the requirements of the receiving system.
3. Configure the necessary settings and security configuration for the selected outbound adapter.

## Save and Test Your Integration

1. Once you have configured the adapters and associated security configurations, click on the "Save" button to save your integration settings.
2. Connxio will validate the settings and ensure they are correctly configured.
3. After saving, you can proceed to the "Test" tab and press the "Test integration" button to check if the integration behaves as expected.

Congratulations! You have successfully created your first integration in Connxio. You can now start leveraging the power of Connxio to seamlessly exchange data and files between systems.

Please note that this guide provides a high-level overview of the integration creation process.

</TabItem>
</Tabs>
