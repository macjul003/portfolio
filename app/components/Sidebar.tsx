'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, type ComponentType } from 'react';
import { flushSync } from 'react-dom';
import { Sun, Moon } from '@phosphor-icons/react';
import { useAskPanel } from './AskPanelContext';

type NavItem =
  | { href: string; label: string; iconClass: string; Icon?: never }
  | { href: string; label: string; Icon: ComponentType<{ size: number; weight: 'bold' | 'fill' | 'duotone' }>; iconClass?: never };

const nav: NavItem[] = [
  { href: '/',      label: 'Home',  iconClass: 'ph-bold ph-house-simple' },
  { href: '/work',  label: 'Work',  iconClass: 'ph-bold ph-briefcase'    },
  { href: '/about', label: 'About', iconClass: 'ph-bold ph-user'         },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useAskPanel();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    <nav className="sidebar">
      {nav.map(({ href, label, ...item }) => (
        <a
          key={href}
          href={href}
          className={`nav-icon${isActive(href) ? ' active' : ''}`}
          aria-label={label}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {'Icon' in item && item.Icon ? (
            <item.Icon size={20} weight={isActive(href) ? 'fill' : 'duotone'} />
          ) : (
            <i className={(item.iconClass as string).replace('ph-bold', isActive(href) ? 'ph-fill' : 'ph-bold')} style={{ fontSize: 20 }} />
          )}
          <span className="nav-label">{label}</span>
        </a>
      ))}

      {/* Bottom group */}
      <div className="sidebar-bottom-group" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <button
          ref={toggleRef}
          className="nav-icon"
          onClick={handleThemeToggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
        </button>
        <a
          href="https://github.com/macjul003"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-icon"
          aria-label="GitHub"
        >
          <i className="ph-fill ph-github-logo" style={{ fontSize: 20 }} />
        </a>
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
    </nav>
  );
}
