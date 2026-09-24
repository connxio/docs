import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Property = {
  name: string;
  description: ReactNode;
  example?: string;
  format?: string;
  /** Optional documentation destination; otherwise the name links to this entry. */
  href?: string;
  /** Labeled code samples, such as a source value, expression, and result. */
  samples?: {label: string; value: string}[];
};

type Props = {
  properties: Property[];
  /** Use a different prefix when a page contains repeated property names. */
  idPrefix?: string;
};

export default function PropertyReference({properties, idPrefix = 'property'}: Props) {
  return (
    <dl className={styles.reference}>
      {properties.map(({name, description, example, format, href, samples = []}) => {
        const id = `${idPrefix}-${name}`;
        return (
          <div className={styles.property} id={id} key={name}>
            <dt className={styles.name}>
              <Link
                to={href ?? `#${id}`}
                className={href ? styles.pageLink : undefined}
                aria-label={href ? `Read about ${name}` : `Link to ${name}`}>
                <code>{name}</code>
                {href && <span className={styles.linkArrow} aria-hidden="true">→</span>}
              </Link>
            </dt>
            <dd className={styles.description}>
              <div>{description}</div>
              {format !== undefined && (
                <div className={styles.sample}>
                  <span className={styles.label}>Format</span>
                  <code>{format}</code>
                </div>
              )}
              {example !== undefined && (
                <div className={styles.sample}>
                  <span className={styles.label}>Example</span>
                  <code>{example}</code>
                </div>
              )}
              {samples.map(({label, value}, index) => (
                <div className={styles.sample} key={`${label}-${index}`}>
                  <span className={styles.label}>{label}</span>
                  <code>{value}</code>
                </div>
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
