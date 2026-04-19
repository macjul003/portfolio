import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Julian Samuel",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <header className={styles.header}>
          <h1 className={styles.heading}>About</h1>
        </header>

        <div className={styles.body}>

          {/* Left — text */}
          <div className={styles.left}>
            <p className={styles.lead}>
              I design products that simplify complex systems. Over the past
              5+ years I&rsquo;ve worked across AI, Fintech, and Travel,
              building things that feel effortless and earn trust.
            </p>
            <div className={styles.prose}>
              <p>
                My work sits at the intersection of product strategy and
                interaction design, figuring out not just what to build, but
                why, and making sure it lands well with the people who use it.
              </p>
              <p>
                I&rsquo;m drawn to products with real constraints: regulated
                industries, high-stakes decisions, users who don&rsquo;t have
                time to figure things out. The harder the problem, the more
                interesting the design challenge.
              </p>
              <p>
                When I&rsquo;m not designing, I&rsquo;m reading or writing
                in my <a href="/journal">journal</a>.
              </p>
            </div>
          </div>

          {/* Right — photo */}
          <div className={styles.right}>
            <img
              src="/julian.jpeg"
              alt="Julian Samuel"
              className={styles.photo}
            />
          </div>

        </div>


      </div>
    </div>
  );
}
