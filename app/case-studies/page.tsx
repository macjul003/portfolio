import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work — Julian Samuel",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Work</h1>

      <ul className={styles.list}>
        {caseStudies.map((cs) => (
          <li key={cs.slug} className={styles.item}>
            <a href={`/case-studies/${cs.slug}`}>
              <div className={styles.cover} style={{ background: cs.color }} />
              <div className={styles.meta}>
                <span className={styles.tags}>{cs.tags.join(" · ")}</span>
                <span className={styles.date}>{cs.date}</span>
              </div>
              <p className={styles.title}>{cs.title}</p>
              <p className={styles.desc}>{cs.description}</p>
              {cs.role && <p className={styles.role}>{cs.role}</p>}
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
}
