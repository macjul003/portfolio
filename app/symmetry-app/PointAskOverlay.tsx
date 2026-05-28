'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { CursorClick } from '@phosphor-icons/react';
import { ANNOTATIONS } from './point-ask-annotations';
import PointAskPanel from './PointAskPanel';
import styles from './PointAskOverlay.module.css';

interface HoverState {
  id: string;
  rect: DOMRect;
}

export default function PointAskOverlay({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!isActive) return;
    const el = (e.target as Element).closest('[data-point-id]');
    if (el) {
      const id = (el as HTMLElement).dataset.pointId!;
      if (ANNOTATIONS[id]) {
        setHovered({ id, rect: el.getBoundingClientRect() });
        return;
      }
    }
    setHovered(null);
  }

  function handleMouseLeave() {
    setHovered(null);
  }

  function handleClick(e: React.MouseEvent) {
    if (!isActive) return;
    const el = (e.target as Element).closest('[data-point-id]');
    if (el) {
      const id = (el as HTMLElement).dataset.pointId!;
      if (ANNOTATIONS[id]) {
        e.preventDefault();
        e.stopPropagation();
        setSelected(id);
        setHovered(null);
      }
    }
  }

  function toggle() {
    setIsActive((a) => !a);
    setHovered(null);
    setSelected(null);
  }

  return (
    <div className={styles.container}>
      {/* Toggle + hint */}
      <div className={styles.controlRow}>
        <button
          className={`${styles.toggleBtn} ${isActive ? styles.toggleActive : ''}`}
          onClick={toggle}
        >
          <CursorClick size={13} weight={isActive ? 'fill' : 'regular'} />
          {isActive ? 'Exit Ask Mode' : 'Point & Ask'}
        </button>
        <span className={styles.hint}>
          {isActive
            ? 'Hover to explore — click to ask'
            : 'Click any element to ask why it was designed this way'}
        </span>
      </div>

      {/* Dashboard with event listeners */}
      <div
        className={`${styles.dashWrap} ${isActive ? styles.dashActive : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>

      {/* Hover highlight ring — fixed so it overlays everything */}
      {isActive && hovered && (
        <div
          className={styles.ring}
          style={{
            top: hovered.rect.top,
            left: hovered.rect.left,
            width: hovered.rect.width,
            height: hovered.rect.height,
          }}
        >
          <span className={styles.ringLabel}>{ANNOTATIONS[hovered.id]?.label}</span>
        </div>
      )}

      {/* Point-ask panel */}
      <AnimatePresence>
        {selected && (
          <PointAskPanel
            key={selected}
            elementId={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
