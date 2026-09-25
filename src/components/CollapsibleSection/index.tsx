import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { Collapsible, useCollapsible } from "@docusaurus/theme-common";
import useIsomorphicLayoutEffect from "@docusaurus/useIsomorphicLayoutEffect";
import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

type Props = {
  /** Unique key used to persist the collapsed state in the browser, shared across pages. */
  storageKey: string;
  title: string;
  defaultCollapsed?: boolean;
  children: ReactNode;
};

const STORAGE_PREFIX = "connxio-docs:collapsible:";
const HEADING_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);

function readStoredState(storageKey: string, fallback: boolean): boolean {
  if (!ExecutionEnvironment.canUseDOM) {
    return fallback;
  }
  const stored = window.localStorage.getItem(`${STORAGE_PREFIX}${storageKey}`);
  return stored === null ? fallback : stored === "true";
}

export default function CollapsibleSection({
  storageKey,
  title,
  defaultCollapsed = false,
  children,
}: Props) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [headingEl, setHeadingEl] = useState<HTMLElement | null>(null);
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: () => readStoredState(storageKey, defaultCollapsed),
  });

  // Move the toggle into the heading that immediately precedes this section
  // (e.g. "## General settings" in the surrounding Markdown), so it appears
  // on the same line as the heading instead of as its own block. The
  // heading's existing content (text + Docusaurus's "#" permalink link) is
  // wrapped in a single span first, so it stays together as one flex item
  // next to the toggle instead of being spread apart by justify-content.
  useIsomorphicLayoutEffect(() => {
    const heading = anchorRef.current?.previousElementSibling;
    if (heading instanceof HTMLElement && HEADING_TAGS.has(heading.tagName)) {
      let contentWrapper = heading.querySelector<HTMLElement>(
        `:scope > .${styles.headingContent}`,
      );
      if (!contentWrapper) {
        contentWrapper = document.createElement("span");
        contentWrapper.className = styles.headingContent;
        while (heading.firstChild) {
          contentWrapper.appendChild(heading.firstChild);
        }
        heading.appendChild(contentWrapper);
      }
      heading.classList.add(styles.heading);
      setHeadingEl(heading);
      return () => heading.classList.remove(styles.heading);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      window.localStorage.setItem(
        `${STORAGE_PREFIX}${storageKey}`,
        String(collapsed),
      );
    }
  }, [collapsed, storageKey]);

  const toggle = (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={!collapsed}
      aria-label={`${collapsed ? "Show" : "Hide"} ${title}`}
      onClick={toggleCollapsed}
    >
      {collapsed ? "Show" : "Hide"}
      <svg
        className={clsx(styles.chevron, !collapsed && styles.chevronExpanded)}
        viewBox="0 0 16 16"
        width="10"
        height="10"
        aria-hidden="true"
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <>
      <span ref={anchorRef} className={styles.anchor} aria-hidden="true" />
      {headingEl ? createPortal(toggle, headingEl) : toggle}
      <Collapsible lazy={false} collapsed={collapsed}>
        {children}
      </Collapsible>
    </>
  );
}
