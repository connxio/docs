# Email

Connxio lets customers send messages from the Connxio pipeline by configuring connections to email accounts. We currently support the SMTP protocol. This page details limitations of said protocol and how to configure and connect to an email account.

<details>
<summary>Limitations</summary>
<p>
There are some limitations to our Outbound Email Adapter, these include:

- It is not possible to send more or less the same content to more than 500 recipients within 24 hours.
- It is not possible to send more or less the same content to more than 2,500 recipients within 30 days.
- It is not possible to send email to more than 500 recipients within 24 hours.
- It is not possible to send email to more than 2,500 recipients within 30 days.

In addition to this SMTP allows the use of SSL and TLS. Of the two protocols, we recommend using TLS since this is the newer, more secure choice.
</p>
</details>

## Configuring the Email adapter

To configure Connxio to start processing your email messages select the Email option in "Outbound Connection" shape:

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="outbound connections"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

On creating a new adapter, a popup with the adapter's input fields will appear.
Email has 4 sections; Adapter name, Acknowledgement settings, Core settings and Advanced settings.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/outbound/outbound-sections-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/outbound-sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:

### Adaptername & Ack

- **Adapter Name**: The logical name of the adapter. This is shown in outbound adapter list in the subintegration view.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).

### Core Settings
<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="email core"
    sources={{
      light: useBaseUrl('/img/docs/outbound/email-core-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/email-core-dark.webp#dark-only'),
    }}
  />
</div>

- **Connection String Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **To**: Receiver addresses in a comma separated list.
- **Subject**: The email subject line.
- **Send Message Body**: When turned on the Connxio will be sent as a message body. Both this and Send Attachments can be active at the same time.
- **Send Attachments**: When turned on the Connxio message will be sent as an attachment. Both this and Send Message Body can be active at the same time.

### Advanced settings

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="email advanced"
    sources={{
      light: useBaseUrl('/img/docs/outbound/email-advanced-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/email-advanced-dark.webp#dark-only'),
    }}
  />
</div>

- **Duplicate Detection**: Terminate the message if the exact same has been processed any time within the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling back-off retry.
