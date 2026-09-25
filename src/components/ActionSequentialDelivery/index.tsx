import PropertyReference from "../PropertyReference";
import Heading from "@theme/Heading";

export default function ActionSequentialDelivery() {
  return (
    <>
      <p>Enable <strong>Sequential delivery</strong> to limit a correlation group to one message at a time. The next message is picked up after the current message is processed and the delivery delay has elapsed. This can reduce pressure on a shared receiving system.</p>
      <p>Delivery is sequential at this action, but the order in which messages arrive from earlier pipeline steps is not guaranteed.</p>
      <PropertyReference properties={[
{
name: "Correlation type",
description: "Choose Adapter, Security configuration, or Integration to determine which actions share sequential delivery. Adapter is the default.",
},
{
name: "Delivery delay",
description: "The delay after processing a message before picking up the next message in the correlation group.",
example: "0",
},
{
name: "Disable failure retry",
description: "Enable to disable failure retries for sequential delivery.",
},
{
name: "Retry on non-transient failures",
description: "Enable to retry failures that are not classified as temporary when using sequential delivery.",
},
{
name: "Failure retry interval (seconds)",
description: "The interval between failure retries for sequential delivery, in seconds.",
example: "60",
},
]} />

      <Heading as="h3" id="throttling">Correlation types</Heading>
      <ul>
        <li><strong>Adapter</strong>: Each action has its own delivery group and is throttled independently.</li>
        <li><strong>Security configuration</strong>: Actions using the same security configuration and this correlation type share a delivery group.</li>
        <li><strong>Integration</strong>: HTTP and GraphQL actions using this correlation type within the same integration share a delivery group.</li>
      </ul>
    </>
  );
}
