'use client';

import { useEffect, useState } from 'react';
import styles from './ActivityTerminal.module.css';

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Repo = { name: string; full_name: string; language: string | null; description: string | null };
type GHEvent = { type: string; created_at: string };

type TLine =
  | { kind: 'stat'; label: string }
  | { kind: 'grid' }
  | { kind: 'repo'; repo: Repo };

function ago(dateStr: string): string {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 3600) return `${Math.floor(s / 60)} minutes ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  if (s < 2592000) return `${Math.floor(s / 86400)} days ago`;
  return `${Math.floor(s / 2592000)} months ago`;
}

function repoDisplayText(repo: Repo): string {
  const name = repo.full_name.startsWith('macjul003/') ? repo.name : repo.full_name;
  let t = name;
  if (repo.language) t += ` [${repo.language}]`;
  if (repo.description) t += ` — ${repo.description}`;
  return t;
}

export default function ActivityTerminal() {
  const [cells, setCells] = useState<(Contribution | null)[]>([]);
  const [lines, setLines] = useState<TLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch('https://github-contributions-api.jogruber.de/v4/macjul003?y=last').then(r => r.json()),
      fetch('https://api.github.com/users/macjul003/events/public?per_page=20').then(r => r.json()),
      fetch('https://api.github.com/users/macjul003/repos?sort=pushed&per_page=6&type=public').then(r => r.json()),
    ]).then(([contribData, events, repoData]) => {
      const contribs: Contribution[] = contribData.contributions ?? [];
      const total = Object.values(contribData.total as Record<string, number>)
        .reduce((a: number, b: number) => a + b, 0);

      const recent = contribs.slice(-26 * 7);
      const padded: (Contribution | null)[] = [];
      if (recent.length) {
        const startDay = new Date(recent[0].date).getDay();
        for (let i = 0; i < startDay; i++) padded.push(null);
        padded.push(...recent);
      }
      setCells(padded);

      const lastPush = (events as GHEvent[]).find(e => e.type === 'PushEvent');
      const lastCommit = lastPush ? ago(lastPush.created_at) : null;

      const newLines: TLine[] = [];
      if (lastCommit) newLines.push({ kind: 'stat', label: `LAST COMMIT: ${lastCommit}` });
      newLines.push({ kind: 'stat', label: `${total.toLocaleString()} COMMITS — PAST YEAR` });
      newLines.push({ kind: 'grid' });
      (repoData as Repo[]).forEach(repo => newLines.push({ kind: 'repo', repo }));

      setLines(newLines);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded || lineIdx >= lines.length) return;
    const line = lines[lineIdx];

    if (line.kind === 'grid') {
      const t = setTimeout(() => { setLineIdx(i => i + 1); setCharIdx(0); }, 300);
      return () => clearTimeout(t);
    }

    const text = line.kind === 'stat' ? line.label : repoDisplayText(line.repo);

    if (charIdx >= text.length) {
      const t = setTimeout(() => { setLineIdx(i => i + 1); setCharIdx(0); }, 80);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCharIdx(c => c + 1), 14);
    return () => clearTimeout(t);
  }, [loaded, lines, lineIdx, charIdx]);

  if (!loaded) return <div className={styles.skeleton} />;

  return (
    <div className={styles.terminal}>
      {lines.slice(0, lineIdx + 1).map((line, i) => {
        const done = i < lineIdx;

        if (line.kind === 'stat') {
          const label = done ? line.label : line.label.slice(0, charIdx);
          return (
            <p key={i} className={styles.stat}>
              <span className={styles.prompt}>&gt;</span>{' '}{label}
              {!done && <span className={styles.cursor} />}
            </p>
          );
        }

        if (line.kind === 'grid') {
          return (
            <div key={i} className={styles.grid} aria-hidden="true">
              {cells.map((c, ci) => (
                <div
                  key={ci}
                  className={styles.cell}
                  data-level={c ? c.level : -1}
                  title={c ? `${c.count} on ${c.date}` : undefined}
                />
              ))}
            </div>
          );
        }

        if (line.kind === 'repo') {
          if (done) {
            const repoName = line.repo.full_name.startsWith('macjul003/') ? line.repo.name : line.repo.full_name;
            return (
              <a
                key={i}
                href={`https://github.com/${line.repo.full_name}`}
                target="_blank"
                rel="noopener"
                className={styles.repoLine}
              >
                <span className={styles.prompt}>&gt;</span>
                <span className={styles.repoName}> {repoName}</span>
                {line.repo.language && <span className={styles.lang}> [{line.repo.language}]</span>}
                {line.repo.description && <span className={styles.desc}> — {line.repo.description}</span>}
              </a>
            );
          }
          const partial = repoDisplayText(line.repo).slice(0, charIdx);
          return (
            <a
              key={i}
              href={`https://github.com/${line.repo.full_name}`}
              target="_blank"
              rel="noopener"
              className={styles.repoLine}
            >
              <span className={styles.prompt}>&gt;</span>
              <span className={styles.repoName}> {partial}</span>
              <span className={styles.cursor} />
            </a>
          );
        }

        return null;
      })}
    </div>
  );
}
