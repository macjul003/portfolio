'use client';

import { usePathname } from 'next/navigation';
import { StorefrontIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

type NavItem =
  | { href: string; label: string; iconClass: string; Icon?: never }
  | { href: string; label: string; Icon: ComponentType<{ size: number; weight: 'bold' | 'fill' | 'duotone' }>; iconClass?: never };

const nav: NavItem[] = [
  { href: '/',       label: 'Home',  iconClass: 'ph-bold ph-house-simple' },
  { href: '/about',  label: 'About', iconClass: 'ph-bold ph-user'          },
];

export default function Sidebar() {
  const pathname = usePathname();

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
        </a>
      ))}
    </nav>
  );
}
