import { useLocation } from "@docusaurus/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./tabs.module.css";

interface TabItemProps {
  value: string;
  label: string;
  children: React.ReactNode;
  default?: boolean;
}

interface TabsProps {
  children: React.ReactElement<TabItemProps>[];
  defaultValue?: string;
  centered?: boolean;
}

export default function Tabs({
  children,
  defaultValue,
  centered = false,
}: TabsProps): JSX.Element {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLElement | null>(null);
  const tabItems = React.Children.toArray(
    children,
  ) as React.ReactElement<TabItemProps>[];
  const [activeTab, setActiveTab] = useState<string>(() =>
    defaultValue ||
    tabItems.find((child) => child.props.default)?.props.value ||
    tabItems[0]?.props.value,
  );

  // Extract value from URL fragment on mount and when location changes
  useEffect(() => {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (!hash) return;
    const target = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[id]") || [],
    ).find((element) => element.id === hash);
    const panel = target?.closest<HTMLElement>("[data-tab-value]");
    if (!panel) return;
    scrollTargetRef.current = target!;
    setActiveTab(panel.dataset.tabValue!);
  }, [location.hash]);

  // Scroll only after React has revealed the panel and the router has handled
  // its own anchor scroll. Hidden panels have no usable layout coordinates.
  useEffect(() => {
    const target = scrollTargetRef.current;
    if (!target || target.closest<HTMLElement>("[data-tab-value]")?.hidden) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        target.scrollIntoView({behavior: "instant", block: "start"});
        scrollTargetRef.current = null;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab, location.hash]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    const panel = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-tab-value]") || [],
    ).find((element) => element.dataset.tabValue === value);
    const heading = panel?.querySelector<HTMLElement>("h2[id], h3[id], h4[id]");
    // Update URL fragment without page reload
    window.history.replaceState(window.history.state, "", `#${heading?.id || value}`);
  };

  return (
    <div ref={containerRef} className={styles.tabsContainer}>
      <div className={`${styles.tabButtons} ${centered ? styles.centered : ""}`}>
        {tabItems.map((item) => (
          <button
            key={item.props.value}
            className={`${styles.tabButton} ${
              activeTab === item.props.value ? styles.active : ""
            }`}
            onClick={() => handleTabClick(item.props.value)}
            type="button"
          >
            {item.props.label}
          </button>
        ))}
      </div>
      {tabItems.map((item) => (
        <div
          key={item.props.value}
          id={item.props.value}
          data-tab-value={item.props.value}
          className={styles.tabContent}
          hidden={activeTab !== item.props.value}
        >
          {item.props.children}
        </div>
      ))}
    </div>
  );
}
