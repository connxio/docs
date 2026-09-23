---
title: "Testing"
sidebar_position: 4
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Testing Your Integrations with Connxio

Connxio provides powerful testing features to ensure the smooth operation of your integrations. You can create test groups and execute test runs. This documentation will guide you through using these testing features effectively. Tests will count towards your subscription usage.

## Test Groups

Test groups allow you to group together different integration configurations and send files between systems for testing. To create a test group, follow these steps:

1. Log in to the Connxio web portal and navigate to the "Testing" section.
2. Click on the "Create your first test group" button to initiate the creation process.

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="create test group"
        sources={{
        light: useBaseUrl('/img/docs/testing/create-light.webp'),
        dark: useBaseUrl('/img/docs/testing/create-dark.webp#dark-only'),
        }}
    />
</div>

3. Provide a name for your test group to identify its purpose.
4. Add the desired integration configurations to the test group from the list on the left hand side.

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="edit test group"
        sources={{
        light: useBaseUrl('/img/docs/testing/edit-light.webp'),
        dark: useBaseUrl('/img/docs/testing/edit-dark.webp#dark-only'),
        }}
    />
</div>

5. Click the _Save_ button.
6. When the test group has been saved, two buttons appear on the test group; _Test file_ and _Assert_

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="saved test group"
        sources={{
        light: useBaseUrl('/img/docs/testing/saved-group-light.webp'),
        dark: useBaseUrl('/img/docs/testing/saved-group-dark.webp#dark-only'),
        }}
    />
</div>

7. On clicking _Test file_ you can upload an input file or insert the text directly that will be used for testing. This can be done for each integration or toggle the _Apply to all_. Save any changes made.

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="upload files"
        sources={{
        light: useBaseUrl('/img/docs/testing/upload-light.webp'),
        dark: useBaseUrl('/img/docs/testing/upload-dark.webp#dark-only'),
        }}
    />
</div>

8. Connxio also allows you to set test conditions for the test group. Click on the _Assert_ button to set the conditions using the [CxMAL StatusEvent macro](/integrations/cxmal/macros/statusevent). Using this macro, you can perform negative and positive assertions on the test run, check for specific error codes, and more.

<!-- TODO: Add link to error codes -->

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="start test run"
        sources={{
        light: useBaseUrl('/img/docs/testing/assert_light.webp'),
        dark: useBaseUrl('/img/docs/testing/assert_dark.webp#dark-only'),
        }}
    />
</div>

In this scenario the test is expected to fail, but using CxMAL we can assert that the error code is 600. This will allow the test to pass.

9. Once the configurations and input files are set, click on "Start test run" to begin the test. You need to create an API key to start a test run that includes integrations with the API inbound type.

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="start test run"
        sources={{
        light: useBaseUrl('/img/docs/testing/start-testrun-light.webp'),
        dark: useBaseUrl('/img/docs/testing/start-testrun-dark.webp#dark-only'),
        }}
    />
</div>

## Test Runs

Test runs execute the defined integration configurations within a test group and provide valuable insights into the status of each integration. When viewing the test group overview, the latest test run will be displayed as the test group's status. To view historical test runs, click the "History" button to the left of the "Start Test Run" button.

To view the status of a test run, first expand the test group by clicking somewhere on the row. You will now see a list of the integrations in the test group, as well as the status for each of them.

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="status test run"
        sources={{
        light: useBaseUrl('/img/docs/testing/status-run-light.webp'),
        dark: useBaseUrl('/img/docs/testing/status-run-dark.webp#dark-only'),
        }}
    />
</div>

## Test Details

Users can easily access and view detailed run details for each test run performed using Connxio's testing framework. By clicking an integration a test group's expanded panel, users can retrieve comprehensive information about the test run, including the status, duration, start time, and any associated errors or failures. These run details offer valuable insights into the execution and outcome of the test, enabling users to effectively analyze and troubleshoot any issues encountered during the testing process.

<div style={{maxWidth: '800px', marginBottom: '1rem'}}>
    <ThemedImage
        alt="status test run"
        sources={{
        light: useBaseUrl('/img/docs/testing/detailed-run-light.webp'),
        dark: useBaseUrl('/img/docs/testing/detailed-run-dark.webp#dark-only'),
        }}
    />
    </div>

:::caution Note
Please note that when using Connxio's testing features, all messages generated during testing will count towards your subscription usage.

**Important**: We strongly recommend closely monitoring your testing activities and considering the potential cost implications before initiating extensive testing.

We advise all customers to review the pricing details and usage limits outlined in their Connxio subscription plan. By using the testing features judiciously and monitoring testing activities, you can optimize your usage and effectively manage subscription costs.
:::

<!-- ## Load Testing

Load testing allows you to assess the performance and scalability of your integrations. To start a load test, follow these steps:

1. When initiating a test run, enable the "Load test" flag.
2. Enter the desired number of messages Connxio should send during the load test.
3. The number of messages will be evenly divided among each integration in the test group.

Congratulations! You now know how to utilize Connxio's testing features to verify the functionality, performance, and scalability of your integrations. Regular testing ensures the reliability and efficiency of your integration workflows. -->
