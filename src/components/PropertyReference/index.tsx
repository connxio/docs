import React, {type ReactNode} from 'react';
import styles from './styles.module.css';

type Property = {
  name: string;
  description: ReactNode;
  example?: string;
  format?: string;
};

type Props = {
  properties: Property[];
  /** Use a different prefix when a page contains repeated property names. */
  idPrefix?: string;
};

export default function PropertyReference({properties, idPrefix = 'property'}: Props) {
  return (
    <dl className={styles.reference}>
      {properties.map(({name, description, example, format}) => {
        const id = `${idPrefix}-${name}`;
        return (
          <div className={styles.property} id={id} key={name}>
            <dt className={styles.name}>
              <a href={`#${id}`} aria-label={`Link to ${name}`}><code>{name}</code></a>
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
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
