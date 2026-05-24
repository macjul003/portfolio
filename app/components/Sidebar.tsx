'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Sun, Moon } from '@phosphor-icons/react';
import { motion, useAnimation } from 'motion/react';
import { useAskPanel } from './AskPanelContext';
import { useFirstVisit } from './FirstVisitProvider';

const nav = [
  { href: '/',        label: 'Home'    },
  { href: '/work',    label: 'Work'    },
  { href: '/writing', label: 'Writing' },
  { href: '/about',   label: 'About'   },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useAskPanel();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isFirst = useFirstVisit();
  const navControls = useAnimation();

  useEffect(() => {
    if (isFirst) {
      navControls.set({ opacity: 0, y: -8 });
      navControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } });
    } else {
      navControls.set({ opacity: 1, y: 0 });
    }
  }, [isFirst, navControls]);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') setTheme(stored);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
  }, []);

  function handleThemeToggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      setTheme(next);
      document.documentElement.classList.toggle('light', next === 'light');
      localStorage.setItem('theme', next);
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) { apply(); return; }

    const rect = toggleRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const maxR = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    document.startViewTransition(() => { flushSync(apply); }).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxR}px at ${x}px ${y}px)`] },
        { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <motion.nav
      className="sidebar"
      initial={false}
      animate={navControls}
    >
      {nav.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={`nav-link${isActive(href) ? ' active' : ''}`}
        >
          {label}
        </a>
      ))}

      {/* Bottom group */}
      <div className="sidebar-bottom-group">
        <button
          ref={toggleRef}
          className="nav-icon"
          onClick={handleThemeToggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
        </button>
        {/* Ask panel trigger */}
        <button
          className={`nav-icon ask-trigger${open ? ' ask-trigger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Ask JulianLM"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <i className="ph-fill ph-star-four ask-star" style={{ fontSize: 20 }} />
        </button>
      </div>
    </motion.nav>
  );
}
