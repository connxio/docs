import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import PropertyReference from "../PropertyReference";
import CollapsibleSection from "../CollapsibleSection";

type Props = {
  /** Enable only for actions that transfer data to a separate system. */
  showOutputEncoding?: boolean;
  showTriggerInterval?: boolean;
};

export default function ActionGeneralSettings({
  showOutputEncoding = false,
  showTriggerInterval = false,
}: Props) {
  return (
    <>
      <CollapsibleSection
        storageKey="action-general-settings"
        title="General settings"
      >
        <PropertyReference
          properties={[
            {
              name: "Name",
              description:
                "The name used to identify the action in the integration.",
            },
            {
              name: "Enabled",
              description: "Enables or disables the action.",
            },
            {
              name: "Condition",
              description: (
                <>
                  Optional. A <Link to="/cxmal/connxio-macro-language/">CxMaL</Link>{" "}
                  expression that must evaluate to true for the action to run. Leave
                  empty to run the action without a condition.
                </>
              ),
              example: "1 == 1",
            },
            {
              name: "Output format",
              description:
                "The format of the outgoing message. Inherited from the parent unless you select a format for this action.",
              example: "Inherited: json",
            },
            ...(showOutputEncoding
              ? [
                  {
                    name: "Output encoding",
                    description:
                      "The character encoding of the outgoing message. Inherited from the parent unless you select an encoding for this action.",
                    example: "utf-8",
                  },
                ]
              : []),
          ]}
        />
      </CollapsibleSection>
      {showTriggerInterval && (
        <>
          <Heading as="h2" id="trigger-interval">
            Trigger interval
          </Heading>
          <p>
            Choose when Connxio runs the action using cron expressions. For
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
