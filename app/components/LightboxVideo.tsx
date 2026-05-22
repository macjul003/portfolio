'use client';

import { useState, useEffect } from 'react';
import styles from './LightboxImage.module.css';

interface Props {
  src: string;
  className?: string;
}

export default function LightboxVideo({ src, className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button className={styles.trigger} onClick={() => setOpen(true)} aria-label="Expand video">
        <video src={src} className={className} autoPlay loop muted playsInline />
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <video
            src={src}
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            controls
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
