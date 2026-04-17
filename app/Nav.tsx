import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoMark}>j</span>
          <span className={styles.logoName}>Julian Samuel</span>
        </a>
        <div className={styles.links}>
          <a href="/case-studies">Work</a>
          <a href="/tools">Tools</a>
          <a href="/journal">Journal</a>
          <a href="/about">About</a>
        </div>
      </div>
    </nav>
  );
}
