import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Built — Julian",
};

const projects = [
  {
    name: "DayTasks",
    tagline: "macOS habit tracker",
    description: "A native macOS app for building daily habits with a minimal menu-bar interface. Tracks streaks, sends gentle reminders, and stays out of your way.",
    status: "Live",
    year: "2026",
    url: "#",
  },
  {
    name: "Booklet",
    tagline: "Markdown-to-PDF resume builder",
    description: "Write your resume in plain Markdown, export a pixel-perfect PDF. No drag-and-drop editors, no proprietary formats — just clean typography and full control.",
    status: "Live",
    year: "2026",
    url: "#",
  },
];

export default function BuiltPage() {
  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.name}>Built</h1>
        <p className={styles.subtitle}>Personal projects</p>
      </header>

      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.name}>
            <a href={p.url} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <span className={styles.cardName}>{p.name}</span>
                  <span className={styles.cardTagline}>{p.tagline}</span>
                </div>
                <span className={styles.cardStatus}>{p.status}</span>
              </div>
              <p className={styles.cardDesc}>{p.description}</p>
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
}
