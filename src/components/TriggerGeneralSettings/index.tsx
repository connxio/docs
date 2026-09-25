import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import PropertyReference from "../PropertyReference";

type Props = {
  showTriggerInterval?: boolean;
};

export default function TriggerGeneralSettings({
  showTriggerInterval = false,
}: Props) {
  return (
    <>
      <PropertyReference
        properties={[
          {
            name: "Name",
            description:
              "The name used to identify the trigger in the integration.",
          },
          {
            name: "Enabled",
            description: "Enables or disables the trigger.",
          },
          {
            name: "Input format",
            description: "The format of the incoming message.",
            example: "json",
          },
          {
            name: "Input encoding",
            description: "The character encoding of the incoming message.",
            example: "utf-8",
          },
          {
            name: "Remove BOM",
            description:
              "Removes the byte order mark (BOM) from the incoming message.",
          },
        ]}
      />
      {showTriggerInterval && (
        <>
          <Heading as="h2" id="trigger-interval">
            Trigger interval
          </Heading>
          <p>
            Choose when Connxio retrieves data using cron expressions. For
            example, the expression <code>*/5 * * * *</code> runs every five
            minutes.
          </p>
          <p>
            See{" "}
            <Link to="/integrations/triggering-interval/">
              Triggering Interval
            </Link>{" "}
            for cron syntax and more examples.
          </p>
        </>
      )}
    </>
  );
}
