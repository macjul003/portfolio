'use client';

import { PaperPlaneTilt, Plus, File } from '@phosphor-icons/react';
import type { TimelineEvent } from '../data';
import styles from './TimelinePanel.module.css';


function EventCard({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  return (
    <div className={styles.event}>
      {/* Timeline spine */}
      <div className={styles.spine}>
        <div className={styles.dot} />
        {!isLast && <div className={styles.line} />}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.date}>{event.date}</div>
        <div className={styles.type}>{event.type}</div>
        <p className={styles.detail}>{event.detail}</p>
        {event.ref && (
          <div className={styles.ref}>
            <File size={14} weight="regular" className={styles.refIcon} />
            <span className={styles.refTitle}>{event.ref.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TimelinePanel({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className={styles.panel} data-point-id="timeline">
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
      <div className={styles.inputArea} data-point-id="timeline-input">
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
