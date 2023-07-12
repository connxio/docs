# Email

Connxio (CX) lets customers provide messages to the CX pipeline by configuring connections to email accounts. We currently support POP3 and IMAP protocols. This page details limitations of email protocols and how to configure and connect to an email account.

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

## Leasing

The Email inbound adapter uses leasing to ensure that only one process is picking from the server at any one time. This prevents deadlocks and race conditions towards files on the Email area. By default the leasing is set to the *polling interval*, which means that the thread processing the Email files is the sole worker for the same duration as the interval between polling. This is usually very effective as you ensure that only one process contacts the resource for every time you poll against it.

If you have a server with a lot of messages arriving continually however, this can cause problems. This is because you probably want the process from CX to poll every minute to pick up files as fast as possible, but since new files are arriving constantly you cant guarantee that the process will finish before the minute mark which causes a new process to be created after the leasing has run out. This in turn causes multiple processes from CX to process the same files at the same time. This doesn't cause duplicates but *can* cause race condition where already picked files are processed by both threads at the same time.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Sftp%20inbound%20process%20lock.png?sv=2021-04-10&st=2022-12-01T07%3A54%3A23Z&se=2040-12-02T07%3A54%3A00Z&sr=b&sp=r&sig=YBfEB8vwE2PXr1tA0T%2BoE7sA8Z6swBtKJjVeLfL7PAE%3D)

To solve this problem we have added the *Use Process Lock* option which lets you lock the process for the time the process takes to complete. This can cause the *polling interval* to become erratic as a new process is not allowed to start before the first one finishes. This will prevent race conditions when long running processes on constantly filling servers are causing problems. It's up to you as customers to enable this when needed as it depends on the server and load.

## Retry

Since CX reaches out and picks up files when using the Email inbound adapter, retry is handled by the CX framework. If a fault happens when the polling interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, CX will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however since CX cant be sure the message is possible to requeue on the external message. The message will then be sent to catastrophic retry as described in the [Retry Page](/integrations/retry).
