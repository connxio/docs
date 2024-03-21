# Email

Connxio lets customers provide messages to the Connxio pipeline by configuring connections to email accounts. We currently support POP3 and IMAP protocols. This page details limitations of email protocols and how to configure and connect to an email account.



<details>
    <summary>Limitations</summary>
    <p>
There are several limitations inherent to the POP3 and IMAP protocols, subsequently we do not recommend sending large volumes through email. Of the two protocols, we recommend using IMAP since this is the newer, more secure and faster choice. Be aware that we do not currently support searching or excluding emails from the pickup, as such all messages arriving in on the email server will be processed according to the configuration.
    </p>
</details>


## Configuring the Email adapter

To configure Connxio to start processing your email messages select the Email option in "Inbound Connection" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="Configuring inbound connection"
    sources={{
      light: useBaseUrl('/img/docs/inbound-connection-light.webp'),
      dark: useBaseUrl('/img/docs/inbound-connection-dark.webp#dark-only'),
    }}
  />
</div>

<br />
The following properties are used to configure the adapter:

- **Triggering interval**: Dictates when files are picked from the email account. You can choose between two types; Polling interval and Cron. Find out what's best suited for you [here](/integrations/triggering-interval).
- **Username**: The email username.
- **Password**: The email account password.
- **Host**: The server that hosts the email account.
- **Host Type**: The type of protocol used on the server.
- **Port**: The port for connecting to the server. IMAP typically uses port 993 over SSL.
- **Send Attachments**: When turned on attachments are treated as separate messages, ie. if a message is delivered to the server with two attachments Connxio will process each attachment as a separate message.
- **Send Message Body**: When turned on Connxio will process the message body as a single message through the pipeline.
- **Delete Messages**: POP3 will always delete messages as the protocol does not support changing the *read* property. IMAP will mark messages asa read by default. Turn this property on to make IMAP delete messages.
- **Use SSL**: Most hosts require SSL. Turn this on to make Connxio contact the host with SSL enabled.


## Retry

Since Connxio reaches out and picks up files when using the Email inbound adapter, retry is handled by the Connxio framework. If a fault happens when the trigger interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval/cron set to trigger hourly or event daily, Connxio will try to execute the configuration every minute until it succeeds. This does not happen if the message is already picked up however since Connxio cant be sure the message is possible to requeue on the external message. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
