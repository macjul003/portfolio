import type { Metadata } from "next";
import { getAllArticles } from "@/lib/journal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal — Julian",
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Journal</h1>

      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.slug} className={styles.article}>
            <a href={`/journal/${article.slug}`}>
              <p className={styles.articleTitle}>{article.title}</p>
              <p className={styles.articleDate}>{article.date}</p>
              <p className={styles.articleDesc}>{article.description}</p>
            </a>
          </li>
        ))}
      </ul>

      <a href="/" className={styles.back}>
        &larr; Home
      </a>
    </div>
  );
}
