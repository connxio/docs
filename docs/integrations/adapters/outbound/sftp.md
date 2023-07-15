# FTP and SFTP

Connxio lets customers receive messages from the Connxio pipeline via SFTP (there are very few differences between FTP and SFTP while configuring Connxio, when we write SFTP we mean both FTP and SFTP unless otherwise specified). This page details limitations of the SFTP protocol and how to configure and connect to a SFTP server.


<details>
    <summary>Limitations</summary>
    <p>
There are several limitations inherent to the SFTP protocol. First and foremost SFTP servers are notoriously bad at handling connections, this mens that Connxio has to handle constant connection interruptions. Another limitation is traffic. SFTP has problems with handling a lot of connections at the same time and will, in many circumstances, shut down completely when overwhelmed. All this culminates in a very unstable server connection which we handle in every way possible. We have used an enormous amount of resources to make our SFTP adapter as stable as possible since we know our customers have legacy systems that demands this protocol. We always recommend that you use other, more stable protocols if possible, but if you need to pick up SFTP files at some point we are very proud of our adapter, and it *does* represent the best possible solution for picking files from SFTP.
<br />
<br />
To handle these limitations in the best way possible for each individual server we have multiple advanced options that will be described below which tunes the connections such that you can use the setup that works best for you.
    </p>
</details>

## Configuring SFTP connections

To configure Connxio to start delivering your SFTP messages select the SFTP option in "Outbound Connections" shape:

![img](https://cmhpictsa.blob.core.windows.net/pictures/Outbound%20adapter%20menu.PNG?sv=2020-08-04&st=2021-11-08T12%3A31%3A58Z&se=2040-11-09T12%3A31%3A00Z&sr=b&sp=r&sig=a6JtbEkJT287%2BgNvJN3pR5fpONaBX6eyXHeDQS%2FD5cs%3D)


The following properties are used to configure the adapter:
- **Adapter Name**: The name of the adapter. Only used for UI purpouses.
- **Send Acknowledgement**: Is explained [here](/integrations/adapters/outbound/Acknowledgment).
- **SFTP Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **SFTP Directory**: The directory to pickup files in. Must include a leading forward slash.
- **Outbound Filename Pattern**: Uses variable replacement to generate file names, this is described in detail on the [variable replacement](/connxio-portal/variables/variable-replacement) page.
- **Duplicate Detection**: Attempts to terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling backoff retry.
