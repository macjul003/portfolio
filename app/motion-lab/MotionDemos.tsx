'use client';

import { useState, useRef } from 'react';
import styles from './page.module.css';

/* ─── Demo 1: Morphing Submit Button ─── */
function SubmitButton() {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');

  function trigger() {
    if (phase !== 'idle') return;
    setPhase('loading');
    setTimeout(() => setPhase('done'), 1800);
    setTimeout(() => setPhase('idle'), 3400);
  }

  return (
    <button onClick={trigger} data-phase={phase} className={styles.submitBtn}>
      <span className={styles.submitLabel}>Submit</span>
      <span className={styles.submitSpinner} />
      <span className={styles.submitCheck}>✓</span>
    </button>
  );
}

/* ─── Demo 2: Toggle Switch ─── */
function ToggleSwitch() {
  const [on, setOn] = useState(false);
  return (
    <div className={styles.toggleGroup}>
      <span className={`${styles.toggleLabel} ${on ? styles.toggleLabelOn : ''}`}>
        {on ? 'On' : 'Off'}
      </span>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
}

/* ─── Demo 3: Heart Like ─── */
function HeartLike() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const [burst, setBurst] = useState(false);

  function toggle() {
    const next = !liked;
    setLiked(next);
    setCount((c) => (next ? c + 1 : c - 1));
    if (next) {
      setBurst(true);
      setTimeout(() => setBurst(false), 600);
    }
  }

  return (
    <button
      onClick={toggle}
      className={`${styles.heartBtn} ${liked ? styles.heartLiked : ''} ${burst ? styles.heartBurst : ''}`}
    >
      <span className={styles.heartIcon}>♥</span>
      <span className={styles.heartCount}>{count}</span>
    </button>
  );
}

/* ─── Demo 4: Ripple Button ─── */
function RippleButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  function addRipple(e: React.MouseEvent) {
    const rect = btnRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 700);
  }

  return (
    <button ref={btnRef} onClick={addRipple} className={styles.rippleBtn}>
      <span>Click anywhere</span>
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className={styles.ripple}
          style={{ left: rip.x, top: rip.y }}
        />
      ))}
    </button>
  );
}

/* ─── Demo 5: 3D Tilt Card ─── */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMove(e: React.MouseEvent) {
    const rect = cardRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -10,
      y: ((e.clientX - cx) / (rect.width / 2)) * 10,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      className={styles.tiltCard}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        transition: !hovered ? 'transform 0.5s ease' : 'transform 0.07s ease',
      }}
    >
      <span className={styles.tiltGlow} />
      <span className={styles.tiltLabel}>Hover me</span>
    </div>
  );
}

/* ─── Demo 6: Magnetic Button ─── */
function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function handleMove(e: React.MouseEvent) {
    const rect = btnRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * 0.4,
      y: (e.clientY - cy) * 0.4,
    });
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => { setOffset({ x: 0, y: 0 }); setActive(false); }}
      className={styles.magneticWrap}
    >
      <button
        ref={btnRef}
        className={`${styles.magneticBtn} ${active ? styles.magneticActive : ''}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: !active
            ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'transform 0.1s linear',
        }}
      >
        Magnetic
      </button>
    </div>
  );
}

/* ─── Demo 7: Typing Indicator ─── */
function TypingIndicator() {
  const [typing, setTyping] = useState(true);
  return (
    <div className={styles.typingDemo}>
      <div className={`${styles.typingBubble} ${typing ? styles.typingActive : ''}`}>
        <span className={styles.dot} style={{ animationDelay: '0ms' }} />
        <span className={styles.dot} style={{ animationDelay: '180ms' }} />
        <span className={styles.dot} style={{ animationDelay: '360ms' }} />
      </div>
      <button onClick={() => setTyping((v) => !v)} className={styles.typingToggle}>
        {typing ? 'Stop' : 'Start'} typing
      </button>
    </div>
  );
}

/* ─── Demo 8: Spotlight Card ─── */
function SpotlightCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent) {
    const rect = cardRef.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos(null)}
      className={styles.spotlightCard}
      style={{
        background: pos
          ? `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(79,142,247,0.13) 0%, transparent 65%), #111`
          : '#111',
      }}
    >
      <p className={styles.spotlightText}>Move your cursor to reveal the spotlight</p>
    </div>
  );
}

/* ─── Grid ─── */

const demos = [
  {
    label: '01 — Button',
    title: 'Morphing Submit',
    desc: 'Idle → Loading → Done state machine',
    Demo: SubmitButton,
  },
  {
    label: '02 — Toggle',
    title: 'Spring Switch',
    desc: 'Satisfying overshoot on the thumb',
    Demo: ToggleSwitch,
  },
  {
    label: '03 — Reaction',
    title: 'Heart Like',
    desc: 'Scale burst on first interaction',
    Demo: HeartLike,
  },
  {
    label: '04 — Feedback',
    title: 'Ripple Effect',
    desc: 'Origin-aware ink spread on click',
    Demo: RippleButton,
  },
  {
    label: '05 — Motion',
    title: '3D Tilt Card',
    desc: 'Perspective rotation tracks cursor',
    Demo: TiltCard,
  },
  {
    label: '06 — Physics',
    title: 'Magnetic Button',
    desc: 'Proximity attraction with spring return',
    Demo: MagneticButton,
  },
  {
    label: '07 — Status',
    title: 'Typing Dots',
    desc: 'Staggered bounce communicates presence',
    Demo: TypingIndicator,
  },
  {
    label: '08 — Atmosphere',
    title: 'Cursor Spotlight',
    desc: 'Radial gradient follows mouse position',
    Demo: SpotlightCard,
  },
];

export default function MotionDemos() {
  return (
    <div className={styles.grid}>
      {demos.map(({ label, title, desc, Demo }) => (
        <div key={label} className={styles.card}>
          <div className={styles.cardMeta}>
            <span className={styles.cardLabel}>{label}</span>
            <span className={styles.cardTitle}>{title}</span>
            <span className={styles.cardDesc}>{desc}</span>
          </div>
          <div className={styles.demoArea}>
            <Demo />
          </div>
        </div>
      ))}
    </div>
  );
}
