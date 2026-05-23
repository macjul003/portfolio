'use client';

import { PaperPlaneTilt, Plus } from '@phosphor-icons/react';
import type { TimelineEvent } from '../data';
import styles from './TimelinePanel.module.css';

const typeColors: Record<TimelineEvent['type'], string> = {
  'Major Revision': '#6f91f7',
  'Insight':        '#f59e0b',
  'Update':         '#9a9a9a',
  'Creation':       '#14b38b',
};

function EventCard({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  const color = typeColors[event.type];
  return (
    <div className={styles.event}>
      {/* Timeline spine */}
      <div className={styles.spine}>
        <div className={styles.dot} style={{ borderColor: color }} />
        {!isLast && <div className={styles.line} />}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.date} style={{ color }}>{event.date}</div>
        <div className={styles.type}>{event.type}</div>
        <p className={styles.detail}>{event.detail}</p>
        {event.ref && (
          <div className={styles.ref}>
            <span className={styles.refTitle}>{event.ref.title}</span>
            <span className={styles.refBody}>{event.ref.body}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimelinePanel({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerTitle}>Evolution Timeline</span>
        <span className={styles.headerMeta}>last updated 12 mins ago</span>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {timeline.map((event, i) => (
          <EventCard key={i} event={event} isLast={i === timeline.length - 1} />
        ))}
      </div>

      {/* Bottom input */}
      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <button className={styles.plusBtn} aria-label="Attach">
            <Plus size={16} weight="bold" />
          </button>
          <input
            type="text"
            placeholder="Tell or ask Base0 something..."
            className={styles.input}
            readOnly
          />
          <button className={styles.sendBtn} aria-label="Send">
            <PaperPlaneTilt size={16} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
