import type { Metadata } from "next";
import { getAllArticles } from "@/lib/journal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal",
};

function formatDate(dateStr: string): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Journal</h1>
        <p className={styles.subheading}>Thinking on design, tools, and process.</p>
      </header>

      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.slug}>
            <a href={`/journal/${article.slug}`} className={styles.row}>
              <time className={styles.date}>{formatDate(article.date)}</time>
              <div className={styles.meta}>
                <p className={styles.title}>{article.title}</p>
                {article.description && (
                  <p className={styles.desc}>{article.description}</p>
                )}
              </div>
              <i className="ph-bold ph-arrow-right" style={{ color: 'var(--gray)', fontSize: '13px', flexShrink: 0, marginTop: '3px' }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
