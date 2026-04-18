import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
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
  );
}
