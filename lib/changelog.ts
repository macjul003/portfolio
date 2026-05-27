import { execSync } from 'child_process';

export type Commit = {
  hash: string;
  title: string;
  body: string;
};

export type DayLog = {
  date: string;
  commits: Commit[];
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[month - 1]} ${day}, ${year}`;
}

export function getChangelog(): DayLog[] {
  try {
    // \x1e = record separator, \x1f = unit separator — safe delimiters for git output
    const raw = execSync(
      'git log --no-merges --pretty=format:"%x1e%ad%x1f%s%x1f%h%x1f%b" --date=short',
      { cwd: process.cwd() }
    ).toString();

    const byDate: Record<string, Commit[]> = {};

    for (const record of raw.split('\x1e').filter(Boolean)) {
      const [date, title, hash, ...rest] = record.split('\x1f');
      const body = rest
        .join('')
        .replace(/Co-Authored-By:.*$/gm, '')
        .trim();

      if (!date || !title) continue;
      if (!byDate[date]) byDate[date] = [];
      byDate[date].push({ hash: hash.trim(), title: title.trim(), body });
    }

    return Object.entries(byDate)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, commits]) => ({ date: formatDate(date), commits }));
  } catch {
    return [];
  }
}
