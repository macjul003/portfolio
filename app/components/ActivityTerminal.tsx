'use client';

import { useEffect, useState } from 'react';
import styles from './ActivityTerminal.module.css';

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Repo = { name: string; full_name: string; language: string | null; description: string | null };
type GHEvent = { type: string; created_at: string };

function ago(dateStr: string): string {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 3600) return `${Math.floor(s / 60)} minutes ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  if (s < 2592000) return `${Math.floor(s / 86400)} days ago`;
  return `${Math.floor(s / 2592000)} months ago`;
}

export default function ActivityTerminal() {
  const [cells, setCells] = useState<(Contribution | null)[]>([]);
  const [totalCommits, setTotalCommits] = useState<number | null>(null);
  const [lastCommit, setLastCommit] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('https://github-contributions-api.jogruber.de/v4/macjul003?y=last').then(r => r.json()),
      fetch('https://api.github.com/users/macjul003/events/public?per_page=20').then(r => r.json()),
      fetch('https://api.github.com/users/macjul003/repos?sort=pushed&per_page=6&type=public').then(r => r.json()),
    ]).then(([contribData, events, repoData]) => {
      const contribs: Contribution[] = contribData.contributions ?? [];
      const total = Object.values(contribData.total as Record<string, number>)
        .reduce((a: number, b: number) => a + b, 0);
      setTotalCommits(total);

      // Show last 26 weeks only
      const recent = contribs.slice(-26 * 7);
      const padded: (Contribution | null)[] = [];
      if (recent.length) {
        const startDay = new Date(recent[0].date).getDay();
        for (let i = 0; i < startDay; i++) padded.push(null);
        padded.push(...recent);
      }
      setCells(padded);

      const lastPush = (events as GHEvent[]).find(e => e.type === 'PushEvent');
      if (lastPush) setLastCommit(ago(lastPush.created_at));

      setRepos(repoData as Repo[]);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <div className={styles.skeleton} />;
  }

  return (
    <div className={styles.terminal}>
      {lastCommit && (
        <p className={styles.stat}>
          <span className={styles.prompt}>&gt;</span> LAST COMMIT: {lastCommit}
        </p>
      )}
      {totalCommits !== null && (
        <p className={styles.stat}>
          <span className={styles.prompt}>&gt;</span> {totalCommits.toLocaleString()} COMMITS — PAST YEAR
        </p>
      )}

      <div className={styles.grid} aria-hidden="true">
        {cells.map((c, i) => (
          <div
            key={i}
            className={styles.cell}
            data-level={c ? c.level : -1}
            title={c ? `${c.count} on ${c.date}` : undefined}
          />
        ))}
      </div>

      {repos.map(repo => (
        <a
          key={repo.name}
          href={`https://github.com/${repo.full_name}`}
          target="_blank"
          rel="noopener"
          className={styles.repoLine}
        >
          <span className={styles.prompt}>&gt;</span>
          <span className={styles.repoName}>{repo.full_name.includes('/') && !repo.full_name.startsWith('macjul003/') ? repo.full_name : repo.name}</span>
          {repo.language && <span className={styles.lang}> [{repo.language}]</span>}
          {repo.description && <span className={styles.desc}> — {repo.description}</span>}
        </a>
      ))}
    </div>
  );
}
