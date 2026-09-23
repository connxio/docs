import React from "react";
import Content from "@theme-original/DocSidebar/Desktop/Content";
import Logo from "@theme/Logo";
import type { Props } from "@theme/DocSidebar/Desktop/Content";
import styles from "./styles.module.css";

export default function SidebarContent(props: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
      </div>
      <Content {...props} />
    </div>
  );
}
