import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
    <div className={styles.entry}>
      <h1 className={styles.word}>
        ju<span className={styles.interpunct}>&middot;</span>li
        <span className={styles.interpunct}>&middot;</span>an
      </h1>
      <p className={styles.phonetic}>/&#712;d&#658;u&#720;.li.&#601;n/</p>
      <p className={styles.pos}>noun</p>
      <ol className={styles.definitions}>
        <li>
          product designer obsessed with clarity; turns complex systems into
          things that feel effortless.
        </li>
        <li>
          designs for AI, Fintech, and Travel; based in India; chasing trust and
          good design that just works.
        </li>
      </ol>
      <div className={styles.seeAlso}>
        <span className={styles.seeAlsoLabel}>See also:</span>
        <a href="https://x.com/macjuliansamuel" target="_blank" rel="noopener">
          Twitter
        </a>
        <span className={styles.sep}>/</span>
        <a
          href="https://www.linkedin.com/in/juliansamuel003/"
          target="_blank"
          rel="noopener"
        >
          LinkedIn
        </a>
        <span className={styles.sep}>/</span>
        <a href="https://github.com/macjul003" target="_blank" rel="noopener">
          GitHub
        </a>
        <span className={styles.sep}>/</span>
        <a href="/journal">Journal</a>
      </div>
    </div>
    </div>
  );
}
