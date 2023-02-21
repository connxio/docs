# ConnXio Changelog

## 1.9.3 (2023-02-21)

> This is the next planned release for ConnXio and is currently under development. This notice will be removed when the features are available in production

#### :rocket: New Features

- `Table storage adapter`
  - added new table adapter type to Azure Storage adapter
- `Queue storage adapter`
  - added new queue adapter type to Azure Storage adapter
- `Auto complete on variable injection`
  - the UI for integrations will help users add Variable Replacement with an autocomplete drop-down

#### :bug: Bug Fix

- `Timeout on process lock`
  - Added timeout to process lock (15 min)
- `Performance logging fix`
  - Removed specific information from one log in inbound that caused massive storage issues on metrics

#### :nail_care: Polish

- `Added delta and paging to Rest inbound adapter`
  - added new functionality that lets you specify start time for delta time on getting data from external endpoint. Also added paging in the form of continuation token and top skip.

### :sparkles: Under Development

> This section details customer facing tasks we are currently working on. These are primarily long running tasks which will not be coming in the next release but are planned for future releases and is mostly meant as a way to keep track of what is currently high priority. There are no guarantee that the functionality ever reaches production.

- `New Inbound engine`
  - Work has started on a totally new architecture for the Inbound CX Engine which handles all inbound adapters. This new architecture will add performance, continuous fetch from Queues and cron expressions for polling adapters.
  - The new architecture uses Microsoft Orleans and adds both separation and scaling beyond what was possible in the old engine.
  - The IP's for CX will change when the new engine is deployed. We will be sending e-mails and warning way in advance for all affected customers.
- `New Mapping Engine`
  - Mapping is being moved into a new engine. This will add better security and lets us manage mappings in a more streamlined way.
- `New queue handling between engines`
  - All engines including Transformation, Splitting, Logging and Batching are being upgraded to .net 6 and are being rewritten to use a new mode of transport between engines.
  - This enabled better performance and a more robust engine.

## 1.9.2 (2023-01-17)

#### :rocket: New Features

- `Environment variables`
  - many of you have requested environment variables to enable switching between environments without having to hold the variables outside CX. This new functionality adds a new menu option called Environment Variables.

#### :bug: Bug Fix

- `HotFix (23.01.23):Fixed management API not returning tuned off integrations`
  - management api was throwing 400 on non enabled integrations from get endpoint. Fixed to return all integrations
- `HotFix (23.01.23):Fixed management API not returning non api integrations`
  - management api was throwing 400 on non api and event-grid integrations. Fixed to return all integrations
- `HotFix (23.01.23):Fixed management API translating env vars`
  - management api was translating environment variables when it should be returning the non translated value.

#### :nail_care: Polish

- `Added process lock to inbound adapters`
  - added new option for locking on process for inbound adapters with locking functionality. This affects Azure Storage, Rest and (S)ftp adapters.
- `Added filepath to metadata for (S)FTP`
  - The filepath field contains the full path including the filename to the file

## 1.9.1 (2022-12-06)

#### :rocket: New Features

- `Api-key (Hotfix: 08.12.22)`
  - enabled Api Key for management api
  - work to make Api Keys opt-in has started
- `Variable replacement for sender and receiver`
  - you can now use variable replacement functionality for sender and receiver fields
  - added *fallback* keyword error pipe to handle fallback on required properties like sender and receiver
- `Two-factor login`
  - you can now enable MFA authentication on the user settings page. This is disabled by default. Email is used for code retrieval. App is considered for implementation.
- `Service bus queue adapter`
  - added new queue adapter type to service bus adapter
- `Storage queue adapter`
  - added new queue adapter type to Azure Storage adapter

#### :bug: Bug Fix

- `Hotfix (30.11.22): SFTP retry`
  - fixed "WinScp not found" error on outbound Sftp adapter for Sftp and Ftp
- `Hotfix (08.12.22): Fixed API not accepting query requests`
  - Api did not accept request after deployment. This was caused by a mismatch of model packages withing the NuGet tree.
- `Hotfix (08.12.22): Fixed outbound REST not adding headers on binary file`
  - Api did not add headers when "Handle As Binary File" was checked for integration. Also added the "application/octet-stream" header when sending as binary.

#### :nail_care: Polish

- `Added new transformation interface to Ack functionality`
  - Ack functionality now uses the new mapping specification

## 1.9.0 (2022-11-15)

#### :rocket: New Features

- `Error broker and Customer failure handling`
  - added new error-broker engine that handles error persistance and indexing
  - added customer facing UI called _Failures_ which exposes functionality for resending of failed messages
- `Backoff retry`
  - enabled previously created functionality for backoff retry and circuit breaker pattern which ties into error brokerage and error persistance
  - added customer facing UI panel inside integration details page which lets customers configure retry per integration
- `Api-key`
  - added restrictions to integrations UI that forces customers to upgrade to using api-key on already existing api integrations on save
  - implemented api-key inside api and ensured verification starting now
  - added customer facing api-key UI which lets customers limit access to webhook, management and messaging endpoints on the CX api by limiting api key access
- `Email outbound adapter`
  - added new email outbound adapter for customer use. Messaging limits apply.
- `Discard Endpoint`
  - added discard endpoint which lets customers discard integration output when testing
- `Data Collection`
  - added rule engine sourced from _outbound rest_ adapter, used to react to http codes on http communication

#### :bug: Bug Fix

- `Audit`
  - fixed sorting not using date as date but as string
- `Outbound SFTP`
  - Added retry to "Cannot find WinScp exe. Stopping execution" exceptions

#### :nail_care: Polish

- `Code components`
  - added automatic suggestion of "next" version number on new code component upload
- `Audit`
  - spruced up UI to conform to new standard

#### :memo: Documentation

- `Changelog`
  - added changelog 😉


