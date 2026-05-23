'use client';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import type { Note, NoteSection } from '../data';
import styles from './NoteDetail.module.css';

function Section({ section, defaultOpen = true }: { section: NoteSection; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.section}>
      <button className={styles.sectionBtn} onClick={() => setOpen(o => !o)}>
        <CaretDown size={16} weight="bold" className={styles.caret} data-open={open} />
        <span className={styles.sectionTitle}>{section.title}</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {section.body && <p className={styles.bodyText}>{section.body}</p>}
          {section.items && (
            <ul className={styles.bodyList}>
              {section.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <div className={styles.panel}>
      <div className={styles.scroll}>
        {/* Tags */}
        <div className={styles.tags}>
          {note.tags.map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className={styles.title}>{note.title}</h1>

        {/* Metadata */}
        <div className={styles.meta}>
          <span className={styles.metaAvatar}>
            <span className={styles.metaAvatarInner}>C</span>
          </span>
          <span className={styles.metaSource}>{note.source}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaTime}>last updated {note.lastUpdated}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaTime}>created {note.created}</span>
        </div>

        {/* Sections */}
        <div className={styles.sections}>
          {note.sections.map((s, i) => (
            <Section key={s.title} section={s} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
