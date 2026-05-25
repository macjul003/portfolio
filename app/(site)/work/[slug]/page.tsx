import type { Metadata } from "next";
import { getAllWorkItems, getWorkItemBySlug } from "@/lib/work";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllWorkItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);
  return {
    title: item.title,
    description: item.subtitle,
  };
}

function formatDate(dateStr: string): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const d = new Date(dateStr);
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {item.image && (
          <img src={item.image} alt={item.title} className={styles.coverImage} />
        )}
        <p className={styles.date}>{formatDate(item.date)}</p>
        <h1 className={styles.title}>{item.title}</h1>
        {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            View Project
            <i className="ph-bold ph-arrow-up-right" style={{ fontSize: 13 }} />
          </a>
        )}
      </header>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: item.content }}
      />

      <a href="/work" className={styles.back}>
        &larr; Work
      </a>
    </div>
  );
}
