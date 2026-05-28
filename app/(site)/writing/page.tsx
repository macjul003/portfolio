import type { Metadata } from "next";
import { getAllWritingItems } from "@/lib/writing";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes on design, AI, and the practice of building products.",
  alternates: { canonical: "https://macjulian.com/writing" },
};

function formatDate(dateStr: string): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const d = new Date(dateStr);
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export default function WritingPage() {
  const items = getAllWritingItems().filter((item) => !item.draft);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.name}>Writing</h1>
        <p className={styles.subtitle}>Thoughts on design, tools, and everything in between</p>
      </header>

      <ul className={styles.list}>
        {items.map((item) => {
          const href = item.link ?? `/work/${item.slug}`;
          const external = !!item.link;
          return (
            <li key={item.slug}>
              <a
                href={href}
                className={styles.item}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <div className={styles.itemLeft}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  {item.subtitle && (
                    <p className={styles.itemSubtitle}>{item.subtitle}</p>
                  )}
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.itemDate}>{formatDate(item.date)}</span>
                  <i className="ph-bold ph-arrow-up-right" style={{ fontSize: 14 }} />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
