import PropertyReference from "../PropertyReference";

export default function ActionDuplicateDetection() {
  return (
    <PropertyReference
      properties={[
        {
          name: "Terminate on duplicate",
          description:
            "Enable to terminate a message if the exact same message has already been processed within the configured time to live. Duplicate detection does not guarantee that no duplicates will be sent.",
        },
        {
          name: "Termination status",
          description:
            "The status recorded in the log when a duplicate is terminated. Applies when Terminate on duplicate is enabled. Leave empty to use Terminated.",
        },
        {
          name: "Time to live (minutes)",
          description:
            "How long to retain a message's duplicate-detection record, in minutes. Applies when Terminate on duplicate is enabled. Leave empty to use five days (7,200 minutes).",
          example: "7200",
        },
      ]}
    />
  );
}
