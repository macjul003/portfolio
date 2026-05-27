import type { Metadata } from 'next';
import { getChangelog } from '@/lib/changelog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Now',
  description: 'A running log of what Julian is building, day by day.',
};

function relativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`;
}

export default function NowPage() {
  const log = getChangelog();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.heading}>Now</h1>
        <p className={styles.subheading}>What I&apos;m building, day by day.</p>
      </header>

      <div className={styles.feed}>
        {log.map((day) => (
          <div key={day.date} className={styles.entry}>
            <div className={styles.entrySidebar}>
              <p className={styles.entryDate}>{day.date}</p>
              <p className={styles.entryAgo}>{relativeTime(day.date)}</p>
            </div>
            <div className={styles.entryContent}>
              {day.commits.map((c) => (
                <div key={c.hash} className={styles.update}>
                  <p className={styles.updateTitle}>{c.title}</p>
                  {c.body && (
                    <p className={styles.updateBody}>{c.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
