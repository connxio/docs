# FTP and SFTP

Connxio lets customers provide messages to the Connxio pipeline by supplying files via SFTP (there are very few differences between FTP and SFTP while configuring Connxio, when we write SFTP we mean both FTP and SFTP unless otherwise specified). This page details limitations of the SFTP protocol and how to configure and connect to a SFTP server.

<details>
    <summary>Limitations</summary>
    <p>
There are several limitations inherent to the SFTP protocol. First and foremost SFTP servers are notoriously bad at handling connections, this mens that Connxio has to handle constant connection interruptions. Another limitation is traffic. SFTP has large problems with handling a lot of connections at the same time and will, in many circumstances, shut down completely when overwhelmed. All this culminates in a very unstable server connection which we handle in every way possible. We have used an enormous amount of resources to make our SFTP adapter as stable as possible since we know our customers have legacy systems that demands this protocol. We always recommend that you use other, more stable protocols if possible, but if you need to pick up SFTP files at some point we are very proud of our adapter, and it does represent the best possible solution for picking files from SFTP.
<br />
<br />
To handle these limitations in the best way possible for each individual server we have multiple advanced options that will be described below which tunes the connections such that you can use the setup that works best for you.
</p>
</details>

## Configuring the FTP and SFTP adapters

To configure Connxio to start processing your FTP/SFTP messages select the FTP or SFTP option in "Inbound Connection" shape:

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
On creating a new adapter, a popup with the adapter's input fields will appear.
(S)FTP has 4 sections; Data Pickup Interval, Core Settings, Advanced Settings and Wrapper.

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="properties"
    sources={{
      light: useBaseUrl('/img/docs/inbound/sections-light.webp'),
      dark: useBaseUrl('/img/docs/inbound/sections-dark.webp#dark-only'),
    }}
  />
</div>

Read more about the properties in each section below:
- **Data Pickup Interval**:
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/trigger-interval-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/trigger-interval-dark.webp#dark-only'),
      }}
    />
  </div>
  
  - **Triggering interval**: Dictates when files are picked from the Azure Storage account. You can choose between two types; Polling interval and Cron. Find out what's best suited for you [here](/integrations/triggering-interval).

- **Core Settings**: 
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/sftp-core-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/sftp-core-dark.webp#dark-only'),
      }}
    />
  </div>  
  - **SFTP Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
  - **Directory**: he directory to pickup files in. Files will be deleted after pickup unless CopyMoveFolder is set.

- **Advanced settings**:

  <div style={{maxWidth: '400px'}}>
      <ThemedImage
        alt="advanced settings"
        sources={{
          light: useBaseUrl('/img/docs/inbound/sftp-advanced-light.webp'),
          dark: useBaseUrl('/img/docs/inbound/sftp-advanced-dark.webp#dark-only'),
        }}
      />
    </div>

  - **CopyMoveFolder**: Specifies a folder to move files to after pickup and disables deletion of files on pickup if set. This is mainly used to keep track of picked up files and can also be used to facilitate separate flows and other integrations.
  - **File Mask**: Specifies a search patter for files. This uses the WinScp syntax, read more about it in [the documentation there](https://winscp.net/eng/docs/file_mask). All files not matching the set pattern will be ignored.
  - **Concurrent SFTP Connections**: Limitations the number of concurrent connections to the FTP/SFTP server. This does not effect the connection count on Batch Size. But will prevent the connection from being re-established on the timer while the previous connection is active. Ie. if Connxio polling interval triggers (set to 60 seconds) and there are 10 000 files on the server. Connxio will start picking files but will not finish before the polling interval triggers again. If this property is set to 1 the next connection will be blocked until the former operation finishes.
  - **File Pick Rate**: The number of files to be picked from the catalog per adapter run. If this option is set to 2 and polling interval is set to 1 min. The adapter will pick 2 files/min.
  - **Use Recursive Folder Handling**: Files will be picked from all sub folders in the current directory. Files inside the top level will be picked as well. Default behavior with this option turned off is that the engine ignores folders entirely and picks files only.
  - **Add Blacklist Match**: Press this button to add a match field to the blacklist. Each field can contain a single regex which will be matched against the entire file path on the server in the order written. If you are looking for a file called file.xml the path could look something like this: `/Temp/cmh/testenvironment/files/Inbound/file.xml`. A valid regex to exclude could be `files` which would exclude all paths that have the file string in it. We follow the C# rules for regex. Blacklisting runs before file pick rate is calculated.

- **Wrapper**:
  <div style={{maxWidth: '400px'}}>
    <ThemedImage
      alt="data pickup interval"
      sources={{
        light: useBaseUrl('/img/docs/inbound/wrapper-light.webp'),
        dark: useBaseUrl('/img/docs/inbound/wrapper-dark.webp#dark-only'),
      }}
    />
  </div>

  - **WrapperType**: Choose between Json, XML or None.
  - **Might be Wrapped**: A wrapper is essentially just a shell around the actual message content that contains information not within the concern of the message itself. Read more about wrappers [here](/interaction/wrappers).


## Retry

Since Connxio reaches out and pick up files when using the SFTP inbound adapter, retry is handled by the Connxio framework. If a fault happens when the trigger interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval/cron set to trigger hourly or event daily, Connxio will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however, since Connxio cant be sure the message is possible to requeue on the external server. The message will be sent to catastrophic retry as described in the [Retry Page](/integrations/retry) when fault happen after message pickup and deletion.

It is worth noting that if a catastrophic failure should occur where we cant reach our internal failure system files may be added back to the SFTP server in an "Error" directory. If you see files in such a directory you can usually just put them back into the normal directory. If this keeps happening however, please check you logging provider or contact us directly.
