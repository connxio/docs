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
The following properties are used to configure the adapter:

- **Polling Interval in Seconds**:Polling interval dictates when files are picked from the SFTP account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds.
- **SFTP Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **Directory**: he directory to pickup files in. Files will be deleted after pickup unless CopyMoveFolder is set.
- **CopyMoveFolder**: Specifies a folder to move files to after pickup and disables deletion of files on pickup if set. This is mainly used to keep track of picked up files and can also be used to facilitate separate flows and other integrations.
- **File Mask**: Specifies a search patter for files. This uses the WinScp syntax, read more about it in [the documentation there](https://winscp.net/eng/docs/file_mask). All files not matching the set pattern will be ignored.
- **Concurrent SFTP Connections**: Limitations the number of concurrent connections to the FTP/SFTP server. This does not effect the connection count on Batch Size. But will prevent the connection from being re-established on the timer while the previous connection is active. Ie. if Connxio polling interval triggers (set to 60 seconds) and there are 10 000 files on the server. Connxio will start picking files but will not finish before the polling interval triggers again. If this property is set to 1 the next connection will be blocked until the former operation finishes.
- **File Pick Rate**: The number of files to be picked from the catalog per adapter run. If this option is set to 2 and polling interval is set to 1 min. The adapter will pick 2 files/min.
- **File Pick Sorting Method**: The Sorting method specifies how the adapter sorts the files in the directory when picking them. Be aware that on text, numbers must be padded with zeroes on two digits or more.
- **Use Recursive Folder Handling**: Files will be picked from all sub folders in the current directory. Files inside the top level will be picked as well. Default behavior with this option turned off is that the engine ignores folders entirely and picks files only.
- **Add Blacklist Match**: Press this button to add a match field to the blacklist. Each field can contain a single regex which will be matched against the entire file path on the server in the order written. If you are looking for a file called file.xml the path could look something like this: `/Temp/cmh/testenvironment/files/Inbound/file.xml`. A valid regex to exclude could be `files` which would exclude all paths that have the file string in it. We follow the C# rules for regex. Blacklisting runs before file pick rate is calculated.
- **Batch Size**: The number of files per batch. If set to 100 and 400 msgs are dropped on server, 4 connections with 100 files will be created when Connxio starts processing messages. Be aware that SFTP and FTP are usually severely limited on resources so the batch size should be set to a high number depending on how many files there are at peak load. 1000 is usually a good starting number, _decrease_ this number to speed up the picking process.
- **Use Static Ip**: Forces Connxio to run SFTP traffic on static Ip. This uses a separately hosted functionality that limits parallelization and can effect performance on high traffic scenarios.
- **Lock On Folder**: Decides if a connection should lock on folder in SFTP server or the whole server (false means that the lock is applied on the whole server). If you have multiple inbound configs on one server this **must** be enabled.
- **Perform Duplicate Detection**: Turns on duplicate detection. This does not give a guarantee for no duplicates but detects duplicates on inbound pickup only. The detection works by MD5 hashing the file contents and creating a unique id with the generated hash combined with the name of the file. This is not 100% foolproof but should work in 99% of cases. The detection is costly and should only be turned on if absolutely necessary. Be aware that addition costs may be incurred by turning this on depending on your price plan.
- **Terminate On Duplicate Detection**: If the duplicate detection system finds a duplicate this parameter decides if the message should be sent through the system, or terminated. If the file is terminated it's moved to a sub-folder called _duplicates_ on the same area where the file was picked up from.

## Leasing

The (S)ftp inbound adapter uses leasing to ensure that only one process is picking from the server at any one time. This prevents deadlocks and race conditions towards files on the SFTP area. By default the leasing is set to the _polling interval_, which means that the thread processing the SFTP files is the sole worker for the same duration as the interval between polling. This is usually very effective as you ensure that only one process contacts the resource for every time you poll against it.

If you have a server with a lot of messages arriving continually however, this can cause problems. This is because you probably want the process from Connxio to poll every minute to pick up files as fast as possible, but since new files are arriving constantly you cant guarantee that the process will finish before the minute mark which causes a new process to be created after the leasing has run out. This in turn causes multiple processes from Connxio to process the same files at the same time. This doesn't cause duplicates but _can_ cause race condition where already picked files are processed by both threads at the same time.

![img](https://cmhpictsa.blob.core.windows.net/pictures/Sftp%20inbound%20process%20lock.png?sv=2021-04-10&st=2022-12-01T07%3A54%3A23Z&se=2040-12-02T07%3A54%3A00Z&sr=b&sp=r&sig=YBfEB8vwE2PXr1tA0T%2BoE7sA8Z6swBtKJjVeLfL7PAE%3D)

To solve this problem we have added the _Use Process Lock_ option which lets you lock the process for the time the process takes to complete. This can cause the _polling interval_ to become erratic as a new process is not allowed to start before the first one finishes. This will prevent race conditions when long running processes on constantly filling servers are causing problems. It's up to you as customers to enable this when needed as it depends on the server and load.

## Retry

Since Connxio reaches out and pick up files when using the SFTP inbound adapter, retry is handled by the Connxio framework. If a fault happens when the polling interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, Connxio will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however, since Connxio cant be sure the message is possible to requeue on the external server. The message will be sent to catastrophic retry as described in the [Retry Page](/integrations/retry) when fault happen after message pickup and deletion.

It is worth noting that if a catastrophic failure should occur where we cant reach our internal failure system files may be added back to the SFTP server in an "Error" directory. If you see files in such a directory you can usually just put them back into the normal directory. If this keeps happening however, please check you logging provider or contact us directly.
