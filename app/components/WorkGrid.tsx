'use client';

import { useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import styles from '../(site)/page.module.css';

type WorkItem = {
  client: string;
  date: string;
  title: string;
  href: string;
  thumbnail?: string;
  external: boolean;
};

function actionLabel(item: WorkItem): string {
  if (!item.external) return "View Case Study";
  if (item.href.includes("figma")) return "View Prototype";
  return "Visit Website";
}

function WorkCard({ item }: { item: WorkItem }) {
  const [hovered, setHovered] = useState(false);

  const pillLeft = useMotionValue(0);
  const pillTop  = useMotionValue(0);

  const trackMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pillLeft.set(e.clientX - rect.left);
    pillTop.set(e.clientY - rect.top);
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    trackMouse(e);
    setHovered(true);
  };

  return (
    <a
      href={item.href}
      className={styles.workStackedCard}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
    >
      <div
        className={styles.workStackedImageWrap}
        style={{ cursor: hovered ? 'none' : undefined }}
        onMouseMove={trackMouse}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
      >
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} className={styles.workStackedImage} />
        ) : (
          <div className={styles.workStackedImage} />
        )}
        <motion.div
          className={styles.workHoverPill}
          style={{
            left: pillLeft,
            top: pillTop,
            translateX: '-50%',
            translateY: '-50%',
            opacity: hovered ? 1 : 0,
          }}
        >
          <i className="ph-bold ph-eye" style={{ fontSize: 10 }} />
          {actionLabel(item)}
        </motion.div>
      </div>
      <div className={styles.workStackedMeta}>
        <p className={styles.workClient}>{item.client} · {item.date}</p>
        <h3 className={styles.workTitle}>{item.title}</h3>
      </div>
      {item.external && (
        <i className="ph-bold ph-arrow-up-right" style={{ color: 'var(--gray)', fontSize: '13px', flexShrink: 0 }} />
      )}
    </a>
  );
}

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className={styles.workStackedList}>
      {items.map((item) => (
        <WorkCard key={item.title} item={item} />
      ))}
    </div>
  );
}
