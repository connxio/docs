# Email Outbound Adapter

`This functionality is not in production. More information can be found on the` [functionality page](/Functionality)

ConnXio (CX) lets customers send messages from the CX pipeline by configuring connections to email accounts. We currently support the SMTP protocol. This page details limitations of said protocol and how to configure and connect to an email account.

## Limitations

There are some limitations to our Outbound Email Adapter, these include:

- It is not possible to send more or less the same content to more than 500 recipients within 24 hours.
- It is not possible to send more or less the same content to more than 2,500 recipients within 30 days.
- It is not possible to send email to more than 500 recipients within 24 hours.
- It is not possible to send email to more than 2,500 recipients within 30 days.

 In addition to this SMTP allows the use of SSL and TLS. Of the two protocols, we recommend using TLS since this is the newer, more secure choice.

## Configuring email connections

To configure CX to start processing your email messages select the Email option in "Outbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Email%20config.PNG?sv=2020-04-08&st=2021-11-03T09%3A18%3A05Z&se=2040-11-04T09%3A18%3A00Z&sr=b&sp=r&sig=EBWhGmnlgHWBK8tH5JmkqcRVkU7rlR9B9XrD0tDKEro%3D)

- **Email Security Configuration**: Reference to the [Security Configuration](/Security/Security-Configurations) that contains the relevant connection properties.
- **Receiver Addresses**: The email addresses that the CX message will be sent to.
- **Subject**: The password for the email address.
- **Outbound Filename Pattern**: The server that hosts the email account.
- **Send Attachments**: When turned on the CX message will be sent as an attachment. Both this and Send Message Body can be active at the same time.
- **Send Message Body**: When turned on the CX will be sent as a messagebody. Both this and Send Attachments can be active at the same time.
- **Use SSL**: Most hosts require SSL. Turn this on to make CX contact the host with SSL enabled.
- **Duplicate Detection**: Terminate the message if the exact same has been processed any time within the last five days.

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/Retry). This may change in the future as we are looking into enabling backoff retry.
