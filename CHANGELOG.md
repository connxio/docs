# ConnXio Changelog

## 1.9.1 (Q1 2023)

> This is the next planned release for ConnXio and is currently under development. This notice will be removed when the features are available in production

#### :rocket: New Features

- `Api-key`
  - enabled Api Key for management api
  - work to make Api Keys opt-in has started
- `Table storage adapter`
  - added new table adapter type to Azure Storage adapter

#### :bug: Bug Fix

- Nothing yet ;)

#### :nail_care: Polish

- `Added process lock to inbound adapters`
  - added new option for locking on process for inbound adapters with locking functionality. This affects Azure Storage, Rest and (S)ftp adapters.
- `Added filepath to metadata for (S)FTP`
  - The filepath field contains the full path including the filename to the file

## 1.9.1 (2022-12-06)

#### :rocket: New Features

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

- `Hotfix: SFTP retry`
  - fixed "WinScp not found" error on outbound Sftp adapter for Sftp and Ftp

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


