---
title: "Testing"
sidebar_position: 7
---

# Testing Your Integrations with Connxio

Connxio provides powerful testing features to ensure the smooth operation of your integrations. You can create test groups, execute test runs, and even perform load testing to verify the performance of your systems. This documentation will guide you through using these testing features effectively.

:::caution Note
Please note that when using Connxio's testing features, all messages generated during testing will count towards your subscription usage. 

**Important**: Load testing, which simulates high message volumes, can lead to increased usage and associated charges. We strongly recommend closely monitoring your testing activities and considering the potential cost implications before initiating load tests or extensive testing.

We advise all customers to review the pricing details and usage limits outlined in their Connxio subscription plan. By using the testing features judiciously and monitoring testing activities, you can optimize your usage and effectively manage subscription costs.
:::

## Test Groups

Test groups allow you to group together different integration configurations and send files between systems for testing. To create a test group, follow these steps:

1. Log in to the Connxio web portal and navigate to the "Testing" section.
2. Click on the "New Test Group" button to initiate the creation process.
3. Provide a name and description for your test group to identify its purpose.
4. Add the desired integration configurations to the test group.
5. For each integration, upload an input file that will be used for testing.
![Start test run options](/img/docs/start-test-run-light.webp#light-only)![Start test run options](/img/docs/start-test-run-dark.webp#dark-only)
6. If any of the integrations in the test group has the API adapter configured as the inbound adapter, you must also select an [API Key](/connxio-portal/apikey) which will be used when sending the file to the Connxio API.
7. Once the configurations and input files are set, click on "Start test run" to begin the test.

## Test Runs

Test runs execute the defined integration configurations within a test group and provide valuable insights into the status of each integration. When viewing the test group overview, the latest test run will be displayed as the test group's status. To view historical test runs, click the "History" button.

To view the status of a test run, first expand the test group by clicking somewhere on the row. You will now see a list of the integrations in the test group, as well as the status for each of them.

![Test group status](/img/docs/test-group-status-light.webp#light-only)![Test group status](/img/docs/test-group-status-dark.webp#dark-only)

## Test Details
Users can easily access and view detailed run details for each test run performed using Connxio's testing framework. By clicking an integration a test group's expanded panel, users can retrieve comprehensive information about the test run, including the status, duration, start time, and any associated errors or failures. These run details offer valuable insights into the execution and outcome of the test, enabling users to effectively analyze and troubleshoot any issues encountered during the testing process.

![Detailed test status](/img/docs/test-details-light.webp#light-only)![Detailed test status](/img/docs/test-details-dark.webp#dark-only)

## Load Testing

Load testing allows you to assess the performance and scalability of your integrations. To start a load test, follow these steps:

1. When initiating a test run, enable the "Load test" flag.
2. Enter the desired number of messages Connxio should send during the load test.
3. The number of messages will be evenly divided among each integration in the test group.

Congratulations! You now know how to utilize Connxio's testing features to verify the functionality, performance, and scalability of your integrations. Regular testing ensures the reliability and efficiency of your integration workflows.

