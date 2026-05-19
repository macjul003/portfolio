'use client';

import { useEffect, useState } from 'react';
import styles from './GitHubActivity.module.css';

type GHEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { ref_type?: string; ref?: string; action?: string };
};

function describe(e: GHEvent): string {
  const repo = e.repo.name.split('/')[1];
  switch (e.type) {
    case 'PushEvent':       return `Pushed to ${repo}`;
    case 'CreateEvent':     return `Created ${e.payload.ref_type ?? 'ref'} in ${repo}`;
    case 'PullRequestEvent':return `PR ${e.payload.action} in ${repo}`;
    case 'IssuesEvent':     return `Issue ${e.payload.action} in ${repo}`;
    default:                return `${e.type.replace('Event', '')} in ${repo}`;
  }
}

function ago(dateStr: string): string {
  const s = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 2592000) return `${Math.floor(s / 86400)}d ago`;
  return `${Math.floor(s / 2592000)}mo ago`;
}

const RELEVANT = new Set(['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent']);

export default function GitHubActivity() {
  const [events, setEvents] = useState<GHEvent[]>([]);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    fetch('https://api.github.com/users/macjul003/events/public?per_page=30')
      .then(r => r.json())
      .then((data: GHEvent[]) => {
        setEvents(data.filter(e => RELEVANT.has(e.type)).slice(0, 5));
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'error') return null;

  return (
    <ul className={styles.list}>
      {status === 'loading'
        ? Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className={styles.skeleton} />
          ))
        : events.map(e => (
            <li key={e.id}>
              <a
                href={`https://github.com/${e.repo.name}`}
                target="_blank"
                rel="noopener"
                className={styles.row}
              >
                <span className={styles.time}>{ago(e.created_at)}</span>
                <span className={styles.label}>{describe(e)}</span>
              </a>
            </li>
          ))
      }
    </ul>
  );
}
