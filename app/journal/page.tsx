import type { Metadata } from "next";
import { getAllArticles } from "@/lib/journal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal — Julian",
};

function formatDate(raw: string) {
  const d = new Date(raw + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Journal</h1>

      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.slug} className={styles.article}>
            <a href={`/journal/${article.slug}`} className={styles.link}>
              <span className={styles.articleDate}>{formatDate(article.date)}</span>
              <span className={styles.articleTitle}>{article.title}</span>
              <span className={styles.articleDesc}>{article.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
