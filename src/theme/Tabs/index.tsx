import { useHistory, useLocation } from "@docusaurus/router";
import useIsomorphicLayoutEffect from "@docusaurus/useIsomorphicLayoutEffect";
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
  queryString?: string;
}

export default function Tabs({
  children,
  defaultValue,
  centered = false,
  queryString,
}: TabsProps): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{left: number; top: number; width: number; height: number} | null>(null);
  const scrollTargetRef = useRef<HTMLElement | null>(null);
  const tabItems = React.Children.toArray(
    children,
  ) as React.ReactElement<TabItemProps>[];
  const initialTab =
    defaultValue ||
    tabItems.find((child) => child.props.default)?.props.value ||
    tabItems[0]?.props.value;
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectionReady, setSelectionReady] = useState(false);
  const [animateTabs, setAnimateTabs] = useState(false);
  const queryValue = queryString
    ? new URLSearchParams(location.search).get(queryString)
    : null;
  const queryTab = tabItems.find((item) => item.props.value === queryValue)?.props.value;
  const visibleTab = queryString && !selectionReady ? undefined : activeTab;

  useIsomorphicLayoutEffect(() => {
    const list = tabButtonsRef.current;
    if (!list || !visibleTab) return;
    const buttons = Array.from(list.querySelectorAll<HTMLButtonElement>("button"));
    const selected = buttons.find((button) => button.dataset.tab === visibleTab);
    if (!selected) return;
    const measure = () => {
      const next = {
        left: selected.offsetLeft,
        top: selected.offsetTop,
        width: selected.offsetWidth,
        height: selected.offsetHeight,
      };
      setPill((previous) => previous &&
        previous.left === next.left && previous.top === next.top &&
        previous.width === next.width && previous.height === next.height
        ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, [visibleTab, children]);

  // Resolve URL selection before paint. Static HTML cannot know the query string.
  useIsomorphicLayoutEffect(() => {
    setSelectionReady(true);
    scrollTargetRef.current = null;
    if (queryString) setActiveTab(queryTab ?? initialTab);
    const hash = decodeURIComponent(location.hash.slice(1));
    if (!hash) return;
    const target = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[id]") || [],
    ).find((element) => element.id === hash);
    const panel = target?.closest<HTMLElement>("[data-tab-value]");
    if (!panel) return;
    scrollTargetRef.current = target!;
    setActiveTab(panel.dataset.tabValue!);
  }, [location.hash, location.search, queryString, queryTab, initialTab]);

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
    setAnimateTabs(true);
    setActiveTab(value);
    if (queryString) {
      const search = new URLSearchParams(location.search);
      search.set(queryString, value);
      history.replace({...location, search: search.toString(), hash: ""});
      return;
    }
    const panel = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-tab-value]") || [],
    ).find((element) => element.dataset.tabValue === value);
    const heading = panel?.querySelector<HTMLElement>("h2[id], h3[id], h4[id]");
    // Update URL fragment without page reload
    window.history.replaceState(window.history.state, "", `#${heading?.id || value}`);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.tabsContainer} ${animateTabs ? styles.animateTabs : ""}`}
      style={queryString && !selectionReady ? {visibility: "hidden"} : undefined}
    >
      <div ref={tabButtonsRef} className={`${styles.tabButtons} ${centered ? styles.centered : ""}`}>
        <span
          aria-hidden="true"
          className={styles.pill}
          style={pill ? {
            transform: `translate(${pill.left}px, ${pill.top}px)`,
            width: pill.width,
            height: pill.height,
          } : {visibility: "hidden"}}
        />
        {tabItems.map((item) => (
          <button
            key={item.props.value}
            data-tab={item.props.value}
            className={`${styles.tabButton} ${
              visibleTab === item.props.value ? styles.active : ""
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
          hidden={visibleTab !== item.props.value}
        >
          {item.props.children}
        </div>
      ))}
    </div>
  );
}
