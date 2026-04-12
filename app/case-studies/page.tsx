import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Case Studies — Julian",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Case Studies</h1>

      <ul className={styles.list}>
        {caseStudies.map((cs) => (
          <li key={cs.slug} className={styles.item}>
            <a href={`/case-studies/${cs.slug}`}>
              <div className={styles.meta}>
                {cs.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
                <span className={styles.date}>{cs.date}</span>
              </div>
              <p className={styles.title}>{cs.title}</p>
              <p className={styles.desc}>{cs.description}</p>
              {cs.role && <p className={styles.role}>{cs.role}</p>}
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
