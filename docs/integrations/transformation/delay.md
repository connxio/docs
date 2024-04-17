---
sidebar_position: 8
---

# Delay

Connxio supports delaying the execution of an action for a specified period.

Delay can be added in two different ways. A predetermined duration, or a random duration with a lower and upper limit.

`Note`: Max delay time is 300 seconds (5 minutes)

## Adding Delay to an Integration

Follow these steps to add delay to your integration.

Add the Delay shape from the transformation shape menu. 

![delay shape](/img/docs/delay-shape-light.webp#light-only)![delay shape](/img/docs/delay-shape-dark.webp#dark-only)

Position the Delay shape before the action you wish to delay, and configure the delay duration as needed.

Specify the delay duration in seconds to delay the execution of the next action for a predetermined amount of time.

![Set delay ammount](/img/docs/delay-properties-light.webp#light-only)![Set delay ammount](/img/docs/delay-properties-dark.webp#dark-only)

Enable the `Random` option to specify a lower and upper limit for the delay. The delay duration will then get randomized within the specified limits each time the shape is executed.

![Set random delay ammount](/img/docs/delay-properties-random-light.webp#light-only)![Set random delay ammount](/img/docs/delay-properties-random-dark.webp#dark-only)
