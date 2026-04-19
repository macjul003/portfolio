"use client";

import { useRef } from "react";
import type { ChangelogEntry } from "@/lib/tools";
import styles from "./page.module.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Entry({ entry }: { entry: ChangelogEntry }) {
  return (
    <div className={styles.changeEntry}>
      <div className={styles.changeHeader}>
        <span className={styles.changeVersion}>v{entry.version}</span>
        <time className={styles.changeDate} dateTime={entry.date}>
          {formatDate(entry.date)}
        </time>
      </div>
      <ul className={styles.changeNotes}>
        {entry.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ToolChangelog({ entries }: { entries: ChangelogEntry[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = entries.slice(0, 3);
  const hasMore = entries.length > 3;

  return (
    <>
      <div className={styles.changeList}>
        {visible.map((entry) => (
          <Entry key={entry.version} entry={entry} />
        ))}
      </div>

      {hasMore && (
        <button
          className={styles.viewAll}
          onClick={() => dialogRef.current?.showModal()}
        >
          Version history ({entries.length} releases)
        </button>
      )}

      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogInner}>
          <button
            className={styles.dialogClose}
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
          >
            ✕
          </button>
          <div className={styles.dialogBody}>
            {entries.map((entry) => (
              <Entry key={entry.version} entry={entry} />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
