'use client';

import { useState, useEffect } from 'react';
import styles from './LightboxImage.module.css';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function LightboxImage({ src, alt, className }: Props) {
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
      <button className={styles.trigger} onClick={() => setOpen(true)} aria-label={`Expand image: ${alt}`}>
        <img src={src} alt={alt} className={className} />
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
