import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'An index of every page on the site.',
  alternates: { canonical: 'https://macjulian.com/glossary' },
};

const pages = [
  { href: '/',           label: 'Home',       desc: 'Bio, case studies, and recent activity.' },
  { href: '/work',       label: 'Work',       desc: 'Case studies and selected projects.' },
  { href: '/about',      label: 'About',      desc: 'Who I am and how I got here.' },
  { href: '/built',      label: 'Garage',     desc: 'Side projects and things I’ve shipped.' },
  { href: '/journal',    label: 'Journal',    desc: 'Writing on design, code, and process.' },
  { href: '/motion-lab', label: 'Motion Lab', desc: 'Animation and interaction experiments.' },
  { href: '/design-engineering', label: 'Design Engineering', desc: 'Interface details and engineering demos.' },
  { href: '/now',        label: 'Now',        desc: 'What I’m building, day by day.' },
  { href: '/photos',     label: 'Photos',     desc: 'A map of places I’ve photographed.' },
  { href: '/writing',    label: 'Writing',    desc: 'Longer-form essays and notes.' },
];

export default function GlossaryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.heading}>Glossary</h1>
        <p className={styles.subheading}>An index of every page on the site.</p>
      </header>

      <ul className={styles.list}>
        {pages.map((p) => (
          <li key={p.href} className={styles.entry}>
            <Link href={p.href} className={styles.entryLink}>
              <span className={styles.entryLabel}>{p.label}</span>
              <span className={styles.entryDesc}>{p.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
