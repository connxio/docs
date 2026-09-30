import React from "react";
import GroupedDocCards from "@site/src/components/GroupedDocCards";

const groupOrder = [
  "HTTP",
  "Azure Storage",
  "Event",
  "FTP",
  "Recurrence",
  "Email",
];

export default function GroupedTriggerCards() {
  return (
    <GroupedDocCards
      groupProperty="trigger_group"
      groupOrder={groupOrder}
      idPrefix="trigger-group"
      ungroupedLabel="Other triggers"
      ungroupedId="ungrouped-triggers"
    />
  );
}
