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

## Configuring the FTP and SFTP adapters

To configure Connxio to start delivering your SFTP messages select the SFTP option in "Outbound Connections" shape:

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

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
SFTP has 4 sections; Adapter name, Acknowledgement settings, Core settings and Advanced settings.

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
    alt="sftp core"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sftp-core-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sftp-core-dark.webp#dark-only'),
    }}
  />
</div>

- **SFTP Security Configuration**: Reference to the [Security Configuration](/connxio-portal/security-configurations) that contains the relevant connection properties.
- **SFTP Directory**: The directory to pickup files in. Must include a leading forward slash.

### Advanced settings

<div style={{maxWidth: '400px'}}>
  <ThemedImage
    alt="sftp advanced"
    sources={{
      light: useBaseUrl('/img/docs/outbound/sftp-advanced-light.webp'),
      dark: useBaseUrl('/img/docs/outbound/sftp-advanced-dark.webp#dark-only'),
    }}
  />
</div>

- **Outbound Filename Pattern**: Uses variable replacement to generate file names, this is described in detail on the [variable replacement](/connxio-portal/variables/variable-replacement) page.
- **Duplicate Detection**: Attempts to terminate the message if the exact same has been processed any time the last five days. Connxio does not guarantee that no duplicates will be sent.
- **Termination Status**: The status used for logged in when a duplicate is terminated. If left empty, the status will default to 'Terminated'

## Retry

Retry on all outbound adapters is currently handled by the linear retry described on the [Retry page](/integrations/retry). This may change in the future as we are looking into enabling backoff retry.
