import { useLocation } from "@docusaurus/router";
import React, { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState<string>(defaultValue || "");

  // Extract value from URL fragment on mount and when location changes
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove '#'
    const tabItems = React.Children.toArray(
      children,
    ) as React.ReactElement<TabItemProps>[];
    const tabValues = tabItems.map((child) => child.props.value);

    if (hash && tabValues.includes(hash)) {
      setActiveTab(hash);
    } else if (!activeTab) {
      // Set initial active tab from defaultValue or first child with default prop
      const defaultTab =
        defaultValue ||
        tabItems.find((child) => child.props.default)?.props.value ||
        tabItems[0]?.props.value;
      setActiveTab(defaultTab);
    }
  }, [location.hash, children, defaultValue, activeTab]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    // Update URL fragment without page reload
    window.history.replaceState(null, "", `#${value}`);
  };

  const tabItems = React.Children.toArray(
    children,
  ) as React.ReactElement<TabItemProps>[];
  const activeContent = tabItems.find((item) => item.props.value === activeTab);

  return (
    <div className={styles.tabsContainer}>
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
      <div className={styles.tabContent}>{activeContent?.props.children}</div>
    </div>
  );
}
