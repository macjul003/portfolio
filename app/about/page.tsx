import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Julian Samuel",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.body}>

          {/* Left — photo only */}
          <div className={styles.left}>
            <div className={styles.photoWrap}>
              <img
                src="/julian.jpeg"
                alt="Julian Samuel"
                className={styles.photo}
              />
            </div>
          </div>

          {/* Right — everything else */}
          <div className={styles.right}>
            <div className={styles.intro}>
              <h1 className={styles.name}>Julian Samuel</h1>
              <p className={styles.title}>Senior Product Designer</p>
            </div>

            <p className={styles.lead}>
              I design products that simplify complex systems. Over the past
              5+ years I&rsquo;ve worked across AI, Fintech, and Travel,
              building things that feel effortless and earn trust.
            </p>

            <div className={styles.prose}>
              <p>
                My work sits at the intersection of product strategy and
                interaction design — figuring out not just what to build, but
                why, and making sure it lands well with the people who use it.
              </p>
              <p>
                I&rsquo;m drawn to products with real constraints: regulated
                industries, high-stakes decisions, users who don&rsquo;t have
                time to figure things out. The harder the problem, the more
                interesting the design challenge.
              </p>
              <p>
                When I&rsquo;m not designing, I&rsquo;m reading, taking
                photos, or writing in my <a href="/journal">journal</a>.
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Currently</span>
                <span className={styles.detailValue}>Open to new projects</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Based in</span>
                <span className={styles.detailValue}>India</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Focus</span>
                <span className={styles.detailValue}>AI · Fintech · Travel</span>
              </div>
              <div className={styles.detailGroup}>
                <span className={styles.detailLabel}>Contact</span>
                <a href="mailto:juliansam003@gmail.com" className={styles.detailLink}>
                  juliansam003@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
