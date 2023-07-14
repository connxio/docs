---
sidebar_position: 3
---

# Creating your first integration

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
<a href="/connxio-portal/security-configurations">Read more about security configurations here.</a>
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
4. Enter a sender and receiver which helps you easily indentify the systems involved in the integration.
5. Enter the file format of the input file, as well as the file encoding. ([Read more about encoding here](/integrations/encoding))

## Configuring the Inbound Adapter

<details>
    <summary>What is an adapter?</summary>
    <p>
An adapter serves as a bridge between systems, facilitating the transfer of data using various protocols. It enables seamless integration by providing standardized methods for sending and receiving information, allowing for efficient and flexible data exchange within the Connxio platform.
<br />
<br />
<a href="/integrations/adapters">Read more about adapters here.</a>
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

Please note that this guide provides a high-level overview of the integration creation process. For more detailed instructions and advanced configurations, [refer to the in-depth documentation found here](/integrations).