import CodeSnippets from "@theme-original/ApiExplorer/CodeSnippets";
import React from "react";
import styles from "./styles.module.css";

export default function CollapsibleCodeSnippets(
  props: React.ComponentProps<typeof CodeSnippets>,
): React.JSX.Element {
  return (
    <details className={styles.sdk}>
      <summary className={styles.summary}>SDK</summary>
      <CodeSnippets {...props} />
    </details>
  );
}
