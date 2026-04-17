import type { Metadata } from "next";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import CaseStudySection from "./CaseStudySection";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  return {
    title: `${cs.title} — Julian`,
    description: cs.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.tagRow}>
          {cs.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className={styles.title}>{cs.title}</h1>
        <p className={styles.desc}>{cs.description}</p>
        <dl className={styles.metaGrid}>
          {cs.client && (
            <>
              <dt>Client</dt>
              <dd>{cs.client}</dd>
            </>
          )}
          {cs.role && (
            <>
              <dt>Role</dt>
              <dd>{cs.role}</dd>
            </>
          )}
          <dt>Year</dt>
          <dd>{cs.date}</dd>
        </dl>
      </header>

      {cs.intro && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: cs.intro }}
        />
      )}

      <div className={styles.sections}>
        {cs.sections.map((section) => (
          <CaseStudySection
            key={section.heading}
            heading={section.heading}
            contentHtml={section.contentHtml}
          />
        ))}
      </div>

    </div>
  );
}
