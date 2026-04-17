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
          <div className={styles.left}>
            <div className={styles.photoWrap}>
              <img
                src="/julian.jpeg"
                alt="Julian Samuel"
                className={styles.photo}
              />
            </div>
            <p className={styles.lead}>
              I&rsquo;m Julian, a product designer based in India focused on making
              complex systems feel simple. I care about clarity, trust, and the small
              details that make a product feel considered.
            </p>
          </div>

          <div className={styles.right}>
            <div className={styles.prose}>
              <p>
                Over the past 5+ years I&rsquo;ve worked across AI, Fintech, and Travel.
                My work usually sits at the intersection of product strategy and
                interaction design — figuring out not just what to build, but why,
                and making sure it lands well with the people who use it.
              </p>

              <p>
                I&rsquo;m drawn to products with real constraints: regulated industries,
                high-stakes decisions, users who don&rsquo;t have time to figure things out.
                The harder the problem, the more interesting the design challenge.
              </p>

              <p>
                When I&rsquo;m not designing, I&rsquo;m reading, taking photos, or writing in my{" "}
                <a href="/journal">journal</a>.
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <h2 className={styles.detailLabel}>Currently</h2>
                <p className={styles.detailValue}>Open to new projects</p>
              </div>
              <div className={styles.detailGroup}>
                <h2 className={styles.detailLabel}>Based in</h2>
                <p className={styles.detailValue}>India</p>
              </div>
              <div className={styles.detailGroup}>
                <h2 className={styles.detailLabel}>Focus areas</h2>
                <p className={styles.detailValue}>AI · Fintech · Travel</p>
              </div>
              <div className={styles.detailGroup}>
                <h2 className={styles.detailLabel}>Contact</h2>
                <p className={styles.detailValue}>
                  <a href="mailto:juliansam003@gmail.com">juliansam003@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
