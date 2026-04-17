import styles from "./page.module.css";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllArticles } from "@/lib/journal";

export default function Home() {
  const caseStudies = getAllCaseStudies().slice(0, 4);
  const articles = getAllArticles().slice(0, 3);

  return (
    <main className={styles.main}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <h1 className={styles.name}>Julian Samuel</h1>
          <p className={styles.role}>Senior Product Designer</p>
          <p className={styles.bio}>
            I design products that simplify complex systems. Over the past 5+ years
            I&rsquo;ve worked across AI, Fintech, and Travel, building things that
            feel effortless and earn trust.
          </p>
        </div>
      </section>

      {/* Work */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Latest Projects</h2>
            <a href="/case-studies" className={styles.sectionLink}>All work &rarr;</a>
          </div>
          <div className={styles.grid}>
            {caseStudies.map((cs) => (
              <a key={cs.slug} href={`/case-studies/${cs.slug}`} className={styles.card}>
                <div className={styles.cover} style={{ background: cs.color }} />
                <div className={styles.cardBody}>
                  <p className={styles.client}>{cs.client || cs.tags[0]}</p>
                  <p className={styles.cardTitle}>{cs.title}</p>
                  <p className={styles.cardDesc}>{cs.description}</p>
                  <p className={styles.cardTags}>
                    {cs.tags.join(" · ")}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Writing</h2>
            <a href="/journal" className={styles.sectionLink}>All posts &rarr;</a>
          </div>
          <ul className={styles.writingList}>
            {articles.map((article) => (
              <li key={article.slug}>
                <a href={`/journal/${article.slug}`} className={styles.writingItem}>
                  <span className={styles.writingTitle}>{article.title}</span>
                  <span className={styles.writingDate}>{article.date}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.footerLinks}>
            <a href="https://x.com/macjuliansamuel" target="_blank" rel="noopener">Twitter</a>
            <span className={styles.sep}>/</span>
            <a href="https://www.linkedin.com/in/juliansamuel003/" target="_blank" rel="noopener">LinkedIn</a>
            <span className={styles.sep}>/</span>
            <a href="https://github.com/macjul003" target="_blank" rel="noopener">GitHub</a>
            <span className={styles.sep}>/</span>
            <a href="/photos">Photos</a>
          </div>
          <a href="mailto:juliansam003@gmail.com" className={styles.contact}>
            Get in touch &rarr;
          </a>
        </div>
      </footer>

    </main>
  );
}
