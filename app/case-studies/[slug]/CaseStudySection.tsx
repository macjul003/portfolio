"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface Props {
  heading: string;
  contentHtml: string;
}

export default function CaseStudySection({ heading, contentHtml }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionHeading}>{heading}</h2>
        <button
          className={styles.toggleBtn}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Collapse ↑" : "Read ↓"}
        </button>
      </div>

      <div className={styles.imagePlaceholder}>
        <span className={styles.imagePlaceholderLabel}>Image</span>
      </div>

      <div className={`${styles.previewWrapper} ${expanded ? styles.previewExpanded : ""}`}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        {!expanded && <div className={styles.previewFade} />}
      </div>
    </section>
  );
}
