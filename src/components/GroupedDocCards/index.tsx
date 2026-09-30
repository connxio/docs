import React from "react";
import {
  filterDocCardListItems,
  useCurrentSidebarSiblings,
} from "@docusaurus/plugin-content-docs/client";
import DocCardList from "@theme/DocCardList";
import Heading from "@theme/Heading";
import styles from "@site/src/css/doc-card-list.module.css";

type Props = {
  groupProperty: string;
  groupOrder: string[];
  idPrefix: string;
  ungroupedLabel: string;
  ungroupedId: string;
};

export default function GroupedDocCards({
  groupProperty, groupOrder, idPrefix, ungroupedLabel, ungroupedId,
}: Props) {
  const siblings = useCurrentSidebarSiblings();
  // Show the individual documents inside sidebar categories, such as Azure Storage.
  const flatten = (entries: typeof siblings): typeof siblings =>
    entries.flatMap((item) =>
      item.type === "category" ? flatten(item.items) : [item],
    );
  const items = filterDocCardListItems(flatten(siblings));
  const groups = new Map<string, typeof items>();
  const ungrouped: typeof items = [];

  for (const item of items) {
    const value = item.customProps?.[groupProperty];
    const group = typeof value === "string" ? value.trim() : "";
    if (!group) {
      ungrouped.push(item);
      continue;
    }
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(item);
  }

  return (
    <>
      {[...new Set([...groupOrder, ...groups.keys()])].map((group) => {
        const groupItems = groups.get(group);
        if (!groupItems) return null;
        const anchor = encodeURIComponent(group.toLowerCase().replace(/\s+/g, "-"));
        return (
          <React.Fragment key={group}>
            <Heading as="h2" id={`${idPrefix}-${anchor}`}>
              {group}
            </Heading>
            <DocCardList items={groupItems} className={styles.cards} />
          </React.Fragment>
        );
      })}
      {ungrouped.length > 0 && (
        <>
          <Heading as="h2" id={ungroupedId}>{ungroupedLabel}</Heading>
          <DocCardList items={ungrouped} className={styles.cards} />
        </>
      )}
    </>
  );
}
