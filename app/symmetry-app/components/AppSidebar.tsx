'use client';

import { House, MagnifyingGlass, Lightning, PushPin, Users, PuzzlePiece, CaretDown, Folder, FolderOpen, File } from '@phosphor-icons/react';
import styles from './AppSidebar.module.css';

const menuItems = [
  { label: 'Home',            Icon: House,           active: false },
  { label: 'Search',          Icon: MagnifyingGlass, active: false },
  { label: 'Ask Symmetry AI', Icon: Lightning,       active: false },
];

const privateItems = [
  {
    label: 'Base0 Project',
    type: 'folder-open' as const,
    children: [
      'Briefing: The AI Memory and Cognition Layer',
      'Structured Document Creation',
      'Inflow assistant of base0',
      'The architecture of happines',
    ],
  },
  { label: 'Archive',         type: 'folder' as const },
  { label: 'Developer Notes', type: 'folder' as const },
  { label: 'Vision',          type: 'folder' as const },
];

export default function AppSidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Profile */}
      <div className={styles.profile} data-point-id="sidebar-profile">
        <img
          src="/mac-photo.png"
          alt="Julian Samuel"
          className={styles.avatar}
        />
        <span className={styles.profileName}>Julian Samuel</span>
        <CaretDown size={16} weight="bold" className={styles.chevron} />
      </div>

      {/* Nav */}
      <nav className={styles.nav} data-point-id="sidebar-nav">
        {menuItems.map(({ label, Icon, active }) => (
          <a
            key={label}
            href="#"
            className={`${styles.item} ${active ? styles.itemActive : ''}`}
            data-point-id={label === 'Ask Symmetry AI' ? 'sidebar-ai' : undefined}
          >
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
      <div className={styles.group} data-point-id="sidebar-private">
        <p className={styles.groupLabel}>Private</p>
        {privateItems.map((item) => (
          <div key={item.label}>
            <a href="#" className={styles.item}>
              {item.type === 'folder-open'
                ? <FolderOpen size={16} weight="regular" className={styles.itemIcon} />
                : <Folder size={16} weight="regular" className={styles.itemIcon} />
              }
              <span className={styles.projectName}>{item.label}</span>
            </a>
            {item.children?.map((child) => (
              <a key={child} href="#" className={`${styles.item} ${styles.nestedItem}`}>
                <File size={16} weight="regular" className={styles.itemIcon} />
                <span className={styles.projectName}>{child}</span>
              </a>
            ))}
          </div>
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
