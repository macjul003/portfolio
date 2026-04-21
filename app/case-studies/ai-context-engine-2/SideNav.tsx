"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface NavItem {
  id: string;
  label: string;
}

export default function SideNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={styles.sideNav}>
      <p className={styles.sideNavLabel}>Contents</p>
      <ul className={styles.sideNavList}>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.sideNavLink} ${activeId === id ? styles.sideNavActive : ""}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
