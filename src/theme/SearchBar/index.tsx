import { useHistory } from "@docusaurus/router";
import OriginalSearchBar from "@theme-original/SearchBar";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function SearchBar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const show = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
    dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, []);

  useEffect(() => history.listen(close), [history, close]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        show();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label="Search documentation"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Search documentation (Ctrl/Cmd+K)"
        onClick={show}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Search documentation"
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            close();
        }}
      >
        <div className={styles.heading}>
          <span>Search documentation</span>
          <button
            type="button"
            className={styles.close}
            aria-label="Close search"
            onClick={close}
          >
            ✕
          </button>
        </div>
        <div className={styles.search}>
          <OriginalSearchBar />
        </div>
        <p className={styles.hint}>
          Type to search · ↑ ↓ to navigate · Enter to select · Esc to close
        </p>
      </dialog>
    </>
  );
}
