'use client';

import { House, MagnifyingGlass, Sparkle, PushPin, DotsThree, Users, PuzzlePiece, CaretDown } from '@phosphor-icons/react';
import styles from './AppSidebar.module.css';

const menuItems = [
  { label: 'Home',            Icon: House,           active: true  },
  { label: 'Search',          Icon: MagnifyingGlass, active: false },
  { label: 'Ask Symmetry AI', Icon: Sparkle,         active: false },
];

const privateProjects = [
  'Growth Strategy for Base0',
  'Product Roadmap Q4',
  'Investor Narrative v3',
  'User Research Synthesis',
  'API Architecture Notes',
  'Hiring Playbook',
  'Competitive Intelligence',
];

export default function AppSidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Profile */}
      <div className={styles.profile}>
        <div className={styles.avatar}>J</div>
        <span className={styles.profileName}>Julian Samuel</span>
        <CaretDown size={16} weight="bold" className={styles.chevron} />
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {menuItems.map(({ label, Icon, active }) => (
          <a key={label} href="#" className={`${styles.item} ${active ? styles.itemActive : ''}`}>
            <Icon size={16} weight={active ? 'fill' : 'regular'} className={styles.itemIcon} />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      {/* Pinned */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Pinned</p>
        <a href="#" className={styles.item}>
          <PushPin size={16} weight="fill" className={styles.pinIcon} />
          <span>Base0 Project</span>
        </a>
      </div>

      {/* Private */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Private</p>
        {privateProjects.map((name) => (
          <a key={name} href="#" className={`${styles.item} ${styles.projectItem}`}>
            <span className={styles.dot} />
            <span className={styles.projectName}>{name}</span>
            <DotsThree size={16} weight="bold" className={styles.more} />
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <a href="#" className={styles.footerItem}>
          <Users size={16} weight="bold" />
          <span>Team</span>
        </a>
        <a href="#" className={styles.footerItem}>
          <PuzzlePiece size={16} weight="bold" />
          <span>Install Chrome Extension</span>
        </a>
      </div>
    </aside>
  );
}
