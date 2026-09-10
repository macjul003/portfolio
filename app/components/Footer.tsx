import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="mailto:juliansam003@gmail.com">Email</a>
        <a href="https://x.com/macjuliansamuel" target="_blank" rel="noopener">X</a>
        <a href="https://github.com/macjul003" target="_blank" rel="noopener">GitHub</a>
        <a href="/glossary">Glossary</a>
      </div>
      <span>© 2026</span>
    </footer>
  );
}
