# Email Inbound Adapter

- [Email Inbound Adapter](#email-inbound-adapter)
  - [Limitations](#limitations)
  - [Configuring email connections](#configuring-email-connections)
  - [Polling interval](#polling-interval)
  - [Retry](#retry)

ConnXio (CX) lets customers provide messages to the CX pipeline by configuring connections to email accounts. We currently support POP3 and IMAP protocols. This page details limitations of email protocols and how to configure and connect to an email account.

## Limitations

There are several limitations inherent to the POP3 and IMAP protocols, subsequently we do not recommend sending large volumes through email. Of the two protocols, we recommend using IMAP since this is the newer, more secure and faster choice. Be aware that we do not currently support searching or excluding emails from the pickup, as such all messages arriving in on the email server will be processed according to the configuration.

## Configuring email connections

To configure CX to start processing your email messages select the Email option in "Inbound Connection" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D)

A new window pops up. Add data as seen below:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Email%20config.PNG?sv=2020-04-08&st=2021-11-03T09%3A18%3A05Z&se=2040-11-04T09%3A18%3A00Z&sr=b&sp=r&sig=EBWhGmnlgHWBK8tH5JmkqcRVkU7rlR9B9XrD0tDKEro%3D)

- **Username**: The email username.
- **Password**: The email account password.
- **Host**: The server that hosts the email account.
- **Host Type**: The type of protocol used on the server.
- **Port**: The port for connecting to the server. IMAP typically uses port 993 over SSL.
- **Send Attachments**: When turned on attachments are treated as separate messages, ie. if a message is delivered to the server with two attachments CX will process each attachment as a separate message.
- **Send Message Body**: When turned on CX will process the message body as a single message through the pipeline.
- **Delete Messages**: POP3 will always delete messages as the protocol does not support changing the *read* property. IMAP will mark messages asa read by default. Turn this property on to make IMAP delete messages.
- **Use SSL**: Most hosts require SSL. Turn this on to make CX contact the host with SSL enabled.

## Polling interval

`needs picture`
Polling interval dictates when files are picked from the Azure Storage account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds.

## Retry

Since CX reaches out and picks up files when using the Email inbound adapter, retry is handled by the CX framework. If a fault happens when the [polling interval](#polling-interval) hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, CX will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however since CX cant be sure the message is possible to requeue on the external message. The message will then be sent to catastrophic retry as described in the [Retry Page](/Documentation/Retry.md).
