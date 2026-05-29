'use client';

import { useRef, useState, type PointerEvent } from 'react';
import {
  Compass,
  Camera,
  CalendarBlank,
  EnvelopeSimple,
  MusicNotes,
  MapTrifold,
  Terminal,
  GearSix,
  ImageSquare,
} from '@phosphor-icons/react';
import styles from './page.module.css';

const ICONS = [
  { Icon: Compass, bg: 'linear-gradient(160deg,#3b82f6,#1d4ed8)' },
  { Icon: Camera, bg: 'linear-gradient(160deg,#64748b,#334155)' },
  { Icon: CalendarBlank, bg: 'linear-gradient(160deg,#fb7185,#e11d48)' },
  { Icon: EnvelopeSimple, bg: 'linear-gradient(160deg,#38bdf8,#0284c7)' },
  { Icon: MusicNotes, bg: 'linear-gradient(160deg,#f472b6,#db2777)' },
  { Icon: MapTrifold, bg: 'linear-gradient(160deg,#4ade80,#16a34a)' },
  { Icon: Terminal, bg: 'linear-gradient(160deg,#1f2937,#0b0f17)' },
  { Icon: ImageSquare, bg: 'linear-gradient(160deg,#a78bfa,#7c3aed)' },
  { Icon: GearSix, bg: 'linear-gradient(160deg,#94a3b8,#475569)' },
];

const RANGE = 120; // px of influence on each side of the cursor
const MAX = 0.6; // peak extra scale at the cursor

export default function DockDemo() {
  const dockRef = useRef<HTMLDivElement>(null);
  const centers = useRef<number[] | null>(null);
  const [refined, setRefined] = useState(true);

  function items(): HTMLElement[] {
    return dockRef.current ? Array.from(dockRef.current.children) as HTMLElement[] : [];
  }

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const px = e.clientX;
    const els = items();

    // ── Naive: re-measure the (already-scaled) element every move → jitter,
    //    center origin → overlap, no spread.
    if (!refined) {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const t = Math.max(0, 1 - Math.abs(px - r.x - r.width / 2) / RANGE);
        el.style.transform = `scale(${1 + t * MAX})`;
      });
      return;
    }

    // ── Refined: measure resting centers once, grow from the baseline,
    //    push neighbours aside so nothing collides.
    if (!centers.current) {
      centers.current = els.map((el) => {
        const r = el.getBoundingClientRect();
        return r.x + r.width / 2;
      });
    }
    const c = centers.current;
    const scale = c.map((cx) => 1 + Math.max(0, 1 - Math.abs(px - cx) / RANGE) * MAX);

    els.forEach((el, i) => {
      let shift = 0;
      for (let j = 0; j < els.length; j++) {
        if (j === i) continue;
        const half = ((scale[j] - 1) * el.offsetWidth) / 2;
        shift += c[j] < c[i] ? half : -half;
      }
      el.style.transform = `translateX(${shift}px) scale(${scale[i]})`;
    });
  }

  function reset() {
    centers.current = null;
    items().forEach((el) => {
      el.style.transform = '';
    });
  }

  return (
    <div className={styles.demo}>
      <div className={styles.demoToolbar}>
        <button
          className={`${styles.segBtn} ${!refined ? styles.segActive : ''}`}
          onClick={() => {
            reset();
            setRefined(false);
          }}
        >
          Naive
        </button>
        <button
          className={`${styles.segBtn} ${refined ? styles.segActive : ''}`}
          onClick={() => {
            reset();
            setRefined(true);
          }}
        >
          Refined
        </button>
      </div>

      <div className={styles.stage}>
        <div
          ref={dockRef}
          className={`${styles.dock} ${refined ? styles.dockRefined : ''}`}
          onPointerMove={handleMove}
          onPointerLeave={reset}
        >
          {ICONS.map(({ Icon, bg }, i) => (
            <div key={i} className={styles.dockItem} style={{ background: bg }}>
              <Icon size={26} weight="fill" />
            </div>
          ))}
        </div>
      </div>

      <p className={styles.demoHint}>Hover across the icons. Toggle to feel the jitter and overlap.</p>
    </div>
  );
}
