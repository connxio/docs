import React from "react";
import GroupedDocCards from "@site/src/components/GroupedDocCards";

const groupOrder = [
  "Transform",
  "HTTP",
  "Azure Storage",
  "Event",
  "Control",
  "FTP",
  "Email",
];

export default function GroupedActionCards() {
  return (
    <GroupedDocCards
      groupProperty="action_group"
      groupOrder={groupOrder}
      idPrefix="action-group"
      ungroupedLabel="Other actions"
      ungroupedId="ungrouped-actions"
    />
  );
}
