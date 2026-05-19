'use client';

import { useEffect, useState } from 'react';
import styles from './GitHubMatrix.module.css';

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type APIData = {
  total: Record<string, number>;
  contributions: Contribution[];
};

export default function GitHubMatrix() {
  const [data, setData] = useState<APIData | null>(null);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/macjul003?y=last')
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const total = data
    ? Object.values(data.total).reduce((a, b) => a + b, 0)
    : null;

  // Pad start so day 0 lands on the correct column
  const cells: (Contribution | null)[] = [];
  if (data?.contributions.length) {
    const startDay = new Date(data.contributions[0].date).getDay();
    for (let i = 0; i < startDay; i++) cells.push(null);
    cells.push(...data.contributions);
  }

  return (
    <div className={styles.wrap}>
      {total !== null && (
        <p className={styles.meta}>
          {total.toLocaleString()} contributions in the last year
        </p>
      )}
      <div className={styles.grid} aria-hidden="true">
        {data
          ? cells.map((c, i) => (
              <div
                key={i}
                className={styles.cell}
                data-level={c ? c.level : -1}
                title={c ? `${c.count} on ${c.date}` : undefined}
              />
            ))
          : Array.from({ length: 7 * 53 }).map((_, i) => (
              <div key={i} className={`${styles.cell} ${styles.ghost}`} />
            ))
        }
      </div>
    </div>
  );
}
