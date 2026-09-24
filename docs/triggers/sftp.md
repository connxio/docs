import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# FTP and SFTP

The FTP and SFTP triggers retrieve files from a server and send them into the Connxio pipeline. The settings below apply to both FTP and SFTP unless otherwise specified.

## Configure the trigger

Add an FTP or SFTP trigger to your integration and configure the settings below.

## General settings


<TriggerGeneralSettings showTriggerInterval />

## Connection settings

<PropertyReference properties={[
  {
    name: "Security configuration",
    description: <>Required. Select the <Link to="/connxio-portal/security-configurations/">security configuration</Link> containing the connection properties for your FTP or SFTP server. Use <strong>+</strong> to create a configuration.</>,
  },
  {
    name: "Directory",
    description: "Required. The directory to retrieve files from. Files are deleted after pickup unless a Processed files directory is configured.",
    example: "/my/directory",
  },
]} />

## SFTP settings

<PropertyReference properties={[
  {
    name: "Processed files directory",
    description: "The directory to move files to after pickup. When configured, files are moved here instead of being deleted.",
    example: "/foo/bar",
  },
  {
    name: "File mask restriction",
    description: <>A search pattern that selects files for pickup. Files that do not match are ignored. Uses <Link to="https://winscp.net/eng/docs/file_mask">WinSCP file mask syntax</Link>.</>,
    example: "foo_*.txt",
  },
  {
    name: "Pick limit",
    description: "The maximum number of files to retrieve per run. For example, a limit of 2 with a one-minute trigger interval retrieves up to two files per minute.",
  },
  {
    name: "Concurrent sessions",
    description: "Limits simultaneous pickup sessions on the server. When set to 1, a scheduled pickup waits until the previous session finishes. This does not change the connection count used by Batch Size.",
    example: "1",
  },
  {
    name: "Use recursive folder handling",
    description: "When enabled, retrieves files from the configured directory and all its subdirectories. When disabled, retrieves files only from the configured directory.",
  },
  {
    name: "Blacklist",
    description: <>Use <strong>Add blacklist regex</strong> to add C# regular expressions that exclude files from pickup. Each expression is matched against the full file path, in the order entered. For example, <code>files</code> excludes paths containing that text. Blacklist filtering runs before the pick limit is applied.</>,
  },
  {
    name: "Wrapper",
    description: <>Choose JSON, XML, or None to match the incoming message. A wrapper carries metadata around the message content. See <Link to="/interaction/wrappers/">Wrapper</Link> for details.</>,
  },
]} />

## Retry

If a scheduled pickup fails before the message is retrieved, Connxio retries every 60 seconds until pickup succeeds, even when the configured trigger interval is longer.

After pickup and deletion, Connxio cannot guarantee that a message can be returned to the external server. Failures at this stage use the catastrophic retry handling described in [Retry](../integrations/retry.md).

If a catastrophic failure prevents Connxio from reaching its internal failure system, files may be returned to an `Error` directory on the server. You can usually move these files back to the pickup directory. If this happens repeatedly, check your logs or contact support.

## Limitations

FTP and SFTP servers can interrupt connections or reject new connections when traffic exceeds their capacity. Connection limits and server performance vary, so configure the pick limit and concurrent sessions to suit your server.

Connxio provides these settings and retry handling to accommodate servers with limited capacity or unstable connections.
