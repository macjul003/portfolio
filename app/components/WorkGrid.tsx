'use client';

import styles from '../(site)/page.module.css';

type WorkItem = {
  client: string;
  date: string;
  title: string;
  href: string;
  thumbnail?: string;
  external: boolean;
};

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className={styles.workStackedList}>
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className={styles.workStackedCard}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
        >
          <div className={styles.workStackedImageWrap}>
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.title} className={styles.workStackedImage} />
            ) : (
              <div className={styles.workStackedImage} />
            )}
          </div>
          <div className={styles.workStackedMeta}>
            <p className={styles.workClient}>{item.client} · {item.date}</p>
            <h3 className={styles.workTitle}>{item.title}</h3>
          </div>
          {item.external && (
            <i className="ph-bold ph-arrow-up-right" style={{ color: 'var(--gray)', fontSize: '13px', flexShrink: 0 }} />
          )}
        </a>
      ))}
    </div>
  );
}
