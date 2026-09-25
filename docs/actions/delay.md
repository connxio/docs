---
sidebar_position: 80
---

import PropertyReference from '@site/src/components/PropertyReference';
import ActionGeneralSettings from '@site/src/components/ActionGeneralSettings';

# Delay

The Delay action pauses processing before the next action runs. Choose a fixed duration or a random duration within a configured range. The maximum delay is 300 seconds (5 minutes).

## Configure the action

Add a Delay action to your integration and place it before the action you want to delay. Configure the settings below.

## General settings

<ActionGeneralSettings />

## Delay settings

<PropertyReference properties={[
{
name: "Delay in seconds (max 300)",
description: "Required when Random is disabled. The number of seconds to wait before continuing, up to 300 seconds.",
example: "5",
},
{
name: "Random",
description: "Enable to choose a new random delay within the configured range each time the action runs. Leave disabled to use a fixed duration.",
},
{
name: "From (seconds)",
description: "Required when Random is enabled. The lower limit of the random delay.",
example: "5",
},
{
name: "To (seconds)",
description: "Required when Random is enabled. The upper limit of the random delay, up to 300 seconds. Set this at or above the lower limit.",
example: "15",
},
]} />

For example, set **From (seconds)** to `5` and **To (seconds)** to `15` to wait between 5 and 15 seconds each time the action runs.
