import PropertyReference from '@site/src/components/PropertyReference';
import TriggerGeneralSettings from '@site/src/components/TriggerGeneralSettings';
import Link from '@docusaurus/Link';

# Event Streams

Event Streams let multiple integrations consume events from a shared source. Connxio reads the source once and makes its events available to each consumer integration.

## Configure a consumer

Open or create an integration, click **Add Trigger**, and select **Event Stream**. Configure the settings below, then add the actions that process the events.

## General settings


<TriggerGeneralSettings />

## Consumer settings

<PropertyReference properties={[
{
name: "Integration",
description: "Required. The event stream source this integration consumes events from.",
},
{
name: "Filters",
description: <>Inclusive filters written as <Link to="/cxmal/connxio-macro-language/">CxMaL</Link> boolean expressions. Use them to select which events the consumer processes. Filters support all CxMaL functionality, including file content and metadata access.</>,
},
]} />

You can create multiple consumer integrations for the same event stream, each with its own filters and actions.

## Create an event stream

Configure a trigger for your external source, then right-click the trigger and select **Convert to event stream**. Connxio removes other actions configured on the source. Click **Save** or **Create** to save the event stream.
