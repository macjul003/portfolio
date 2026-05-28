'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            className={styles.sectionBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {section.body && <p className={styles.bodyText}>{section.body}</p>}
            {section.items && (
              <ul className={styles.bodyList}>
                {section.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <div className={styles.panel} data-point-id="note-detail">
      <div className={styles.scroll}>
        {/* Tags */}
        <div className={styles.tags} data-point-id="note-tags">
          {note.tags.map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className={styles.title}>{note.title}</h1>

        {/* Metadata */}
        <div className={styles.meta} data-point-id="note-metadata">
          <span className={styles.metaAvatar}>
            <span className={styles.metaAvatarInner}>C</span>
          </span>
          <span className={styles.metaSource}>{note.source}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaTime}>last updated {note.lastUpdated}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaTime}>created on {note.created}</span>
        </div>

        {/* Sections */}
        <div className={styles.sections} data-point-id="note-sections">
          {note.sections.map((s) => (
            <Section key={s.title} section={s} defaultOpen={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
