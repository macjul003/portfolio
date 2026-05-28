import type { Metadata } from 'next';
import { MagnifyingGlass, Bell, ClockCounterClockwise, Gear } from '@phosphor-icons/react/dist/ssr';
import styles from './page.module.css';
import AppSidebar from './components/AppSidebar';
import NoteDetail from './components/NoteDetail';
import TimelinePanel from './components/TimelinePanel';
import PointAskOverlay from './PointAskOverlay';
import { note, timeline } from './data';

export const metadata: Metadata = {
  title: 'Symmetry App',
  description: 'Symmetry — AI-native shared memory layer prototype.',
};

export default function SymmetryApp() {
  return (
    <div className={styles.page}>
      <PointAskOverlay>
        <div className={styles.card}>
          {/* Left sidebar */}
          <div className={styles.sidebarCol}>
            <AppSidebar />
          </div>

          {/* Right side: top bar + panels */}
          <div className={styles.rightSide}>
            <div className={styles.topBar}>
              <div className={styles.searchWrap}>
                <SearchBar />
              </div>
              <div className={styles.topActions} data-point-id="action-buttons">
                <ActionBtn icon={<Bell size={20} weight="bold" />} label="Notifications" />
                <ActionBtn icon={<ClockCounterClockwise size={20} weight="bold" />} label="History" />
                <ActionBtn icon={<Gear size={20} weight="bold" />} label="Settings" />
              </div>
            </div>
            <div className={styles.panelsRow}>
              <NoteDetail note={note} />
              <TimelinePanel timeline={timeline} />
            </div>
          </div>
        </div>
      </PointAskOverlay>
    </div>
  );
}

function SearchBar() {
  return (
    <div
      data-point-id="search-bar"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,0,0,0.03)', borderRadius: 32,
        padding: '13px 16px', width: '100%',
      }}
    >
      <MagnifyingGlass size={16} weight="bold" style={{ color: '#000', opacity: 0.3, flexShrink: 0 }} />
      <span style={{
        fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500,
        fontSize: 13, color: '#000', opacity: 0.5, lineHeight: '22px',
      }}>Search for something</span>
    </div>
  );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        border: 'none',
        background: 'transparent', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#5a5a5a',
        transition: 'background 0.12s',
      }}
    >
      {icon}
    </button>
  );
}
