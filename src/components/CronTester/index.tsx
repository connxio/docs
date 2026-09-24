import { useEffect, useId, useState } from "react";
import { CronInputError, nextOccurrences } from "./cron.mjs";
import styles from "./styles.module.css";

type Preview = { reference: Date; dates: Date[] };
type InputError = { kind: string; message: string };
const formatUtc = (date: Date) =>
  `${date.toISOString().slice(0, 19).replace("T", " ")} UTC`;

export default function CronTester() {
  const id = useId();
  const [expression, setExpression] = useState("0 */15 * * * *");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState<InputError | null>(null);

  useEffect(() => {
    if (!expression.trim()) return;
    const timeout = window.setTimeout(() => {
      const reference = new Date();
      try {
        setPreview({
          reference,
          dates: nextOccurrences(expression, reference),
        });
      } catch (caught) {
        setError(
          caught instanceof CronInputError
            ? { kind: caught.kind, message: caught.message }
            : {
                kind: "unexpected",
                message:
                  "The preview could not be calculated. Please try again.",
              },
        );
      }
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [expression]);

  return (
    <div className={styles.tester}>
      <div>
        <label className={styles.label} htmlFor={`${id}-expression`}>
          Cron expression
        </label>
        <input
          id={`${id}-expression`}
          className={styles.input}
          value={expression}
          onChange={(event) => {
            setExpression(event.target.value);
            setPreview(null);
            setError(null);
          }}
          aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
          aria-invalid={error ? true : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        <p id={`${id}-hint`} className={styles.hint}>
          Updates automatically as you type. Use five numeric fields starting
          with minutes, or six starting with seconds. Omitted seconds default to
          zero. All preview times are in UTC.
        </p>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {error && (
          <p id={`${id}-error`} className={styles.error}>
            <strong>
              {error.kind === "unsupported"
                ? "Unsupported syntax"
                : error.kind === "invalid"
                  ? "Invalid expression"
                  : "Preview unavailable"}
              :{" "}
            </strong>
            {error.message}
          </p>
        )}
        {preview && (
          <div className={styles.results}>
            <p className={styles.reference}>
              After{" "}
              <time dateTime={preview.reference.toISOString()}>
                {formatUtc(preview.reference)}
              </time>
            </p>
            {preview.dates.length ? (
              <>
                <p className={styles.label}>
                  Next {preview.dates.length} scheduled runs (UTC)
                </p>
                <ol className={styles.dates}>
                  {preview.dates.map((date) => (
                    <li key={date.toISOString()}>
                      <time dateTime={date.toISOString()}>
                        {formatUtc(date)}
                      </time>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <p>
                The expression is valid, but no matching dates exist in the next
                400 years.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
