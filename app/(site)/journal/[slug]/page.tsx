import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug } from "@/lib/journal";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return {
    title: `${article.title} — Julian`,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.date}>{article.date}</p>
        <h1 className={styles.title}>{article.title}</h1>
      </header>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <a href="/journal" className={styles.back}>
        &larr; Journal
      </a>
    </div>
  );
}
