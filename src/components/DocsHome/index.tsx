import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const paths = [
  {
    number: "01",
    title: "Build your first integration",
    description:
      "Choose a trigger, connect your actions, and send a test message.",
    links: [
      ["Getting started", "/integrations/getting-started/"],
      ["Browse triggers", "/triggers/"],
      ["Browse actions", "/actions/"],
      ["Set up credentials", "/integrations/security-configurations/"],
    ],
  },
  {
    number: "02",
    title: "Make the flow your own",
    description:
      "Work with message content, call other systems, and decide which steps run.",
    links: [
      ["Write a script", "/actions/script/"],
      ["Call an HTTP endpoint", "/actions/http/"],
      ["Use dynamic values with CxMaL", "/cxmal/connxio-macro-language/"],
      ["Group actions with scopes", "/actions/scope/"],
    ],
  },
  {
    number: "03",
    title: "Test, inspect, and troubleshoot",
    description:
      "Check the result, follow messages through the flow, and handle failures.",
    links: [
      ["Test your integrations", "/connxio-portal/testing/"],
      ["Configure logging", "/integrations/logging/"],
      ["Understand retries", "/integrations/retry/"],
      ["Work with metadata", "/integrations/metadata/"],
    ],
  },
];

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

export default function DocsHome() {
  return (
    <div className={styles.home}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Documentation / by Evidi</p>
        <h1>
          Connxio<span className={styles.brandDot}>.</span>
        </h1>
        <p className={styles.headline}>
          Connect your systems.
          <br />
          Shape what happens next.
        </p>
        <p className={styles.intro}>
          Build integrations with triggers and actions. Receive a message,
          prepare its content, and send it where it needs to go.
        </p>
        <div className={styles.heroLinks}>
          <Link className={styles.primary} to="/integrations/getting-started/">
            Create your first integration <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.textLink} to="/actions/">
            Explore actions <Arrow />
          </Link>
        </div>
      </header>

      <section className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.sectionHeading}>
          <h2 id="flow-title">One message. Your flow.</h2>
          <p>Explore the steps in an example integration.</p>
        </div>
        <div className={styles.flow}>
          <Link className={styles.node} to="/triggers/api/">
            <span className={styles.nodeLabel}>Trigger</span>
            <strong>Receive via API</strong>
            <span>A message starts the flow.</span>
            <Arrow />
          </Link>
          <span className={styles.connector} aria-hidden="true">
            →
          </span>
          <Link className={styles.node} to="/actions/script/">
            <span className={styles.nodeLabel}>Action</span>
            <strong>Prepare with a script</strong>
            <span>Shape the message content.</span>
            <Arrow />
          </Link>
          <span className={styles.connector} aria-hidden="true">
            →
          </span>
          <div className={styles.destinations}>
            <Link
              className={styles.node}
              to="/actions/azure-storage/azure-blob/"
            >
              <span className={styles.nodeLabel}>Action · branch 1</span>
              <strong>Store in Azure Blob</strong>
              <Arrow />
            </Link>
            <Link className={styles.node} to="/actions/http/">
              <span className={styles.nodeLabel}>Action · branch 2</span>
              <strong>Send over HTTP</strong>
              <Arrow />
            </Link>
          </div>
        </div>
        <p className={styles.caption}>
          Prepare the message once, then let each branch deliver it
          independently.
        </p>
      </section>

      <section className={styles.guides} aria-labelledby="guides-title">
        <h2 id="guides-title">What do you want to build?</h2>
        {paths.map((path) => (
          <div className={styles.guideRow} key={path.number}>
            <span className={styles.number} aria-hidden="true">
              {path.number}
            </span>
            <div className={styles.guideDescription}>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </div>
            <ul className={styles.linkList}>
              {path.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to}>
                    {label}
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <aside className={styles.migration} aria-labelledby="migration-title">
        <span className={styles.eyebrow}>Already using Connxio?</span>
        <h2 id="migration-title">Take your next step with actions.</h2>
        <p>
          See how subintegrations map to the new editor, rebuild your processing
          paths, and check the results before switching.
        </p>
        <Link className={styles.textLink} to="/integrations/move-to-actions/">
          Move to action based integrations <Arrow />
        </Link>
        <Link
          className={styles.legacyLink}
          to="/integrations/getting-started/?editor=legacy"
        >
          Looking for the legacy getting started guide?
        </Link>
      </aside>

      <div className={styles.apiReference}>
        <div>
          <h2>Working with the API?</h2>
          <p>
            Find endpoints, request schemas, and examples in the API reference.
          </p>
        </div>
        <Link className={styles.textLink} to="/reference/connxio-api/">
          Open API reference <Arrow />
        </Link>
      </div>
    </div>
  );
}
