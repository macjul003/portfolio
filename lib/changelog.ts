import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

function parseUpdates(content: string): Commit[] {
  const sections = content.split(/^## /m).filter(Boolean);
  return sections
    .map((section) => {
      const newline = section.indexOf('\n');
      const title = section.slice(0, newline).trim();
      const body = section.slice(newline + 1).trim();
      return { hash: title.toLowerCase().replace(/\s+/g, '-'), title, body };
    })
    .filter((c) => c.title.length > 0);
}

export function getChangelog(): DayLog[] {
  const dir = path.join(process.cwd(), 'content/now');

  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const rawDate = data.date;
      const dateStr = rawDate instanceof Date
        ? rawDate.toISOString().slice(0, 10)
        : rawDate
          ? String(rawDate).slice(0, 10)
          : file.replace('.md', '');
      return {
        date: formatDate(dateStr),
        commits: parseUpdates(content),
      };
    });
}
