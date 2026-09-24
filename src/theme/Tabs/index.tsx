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
}

export default function Tabs({
  children,
  defaultValue,
}: TabsProps): JSX.Element {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
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
    setActiveTab(panel.dataset.tabValue!);
    const frame = requestAnimationFrame(() => target?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    // Update URL fragment without page reload
    window.history.replaceState(null, "", `#${value}`);
  };

  return (
    <div ref={containerRef} className={styles.tabsContainer}>
      <div className={styles.tabButtons}>
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
