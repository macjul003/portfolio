import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tools — Julian Samuel",
};

const tools = [
  {
    name: "Pollution Tracker",
    description:
      "A real-time air quality monitor that visualises pollution levels across Indian cities. Built to make environmental data legible for everyday decisions.",
    platform: "Web App",
    status: "Live",
    url: null,
    color: "#1e3a2f",
  },
  {
    name: "DayTracker",
    description:
      "A macOS menu bar app for daily task management. Tracks streaks, surfaces missed tasks, and shows a 16-week heatmap — designed to stay out of your way.",
    platform: "macOS",
    status: "Live",
    url: null,
    color: "#1a1a2e",
  },
  {
    name: "Booklet",
    description: "Coming soon.",
    platform: "",
    status: "In progress",
    url: null,
    color: "#2d1a4a",
  },
];

export default function ToolsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Tools</h1>
          <p className={styles.subheading}>
            Things I&rsquo;ve built for myself — and made available for anyone.
          </p>
        </header>

        <ul className={styles.list}>
          {tools.map((tool) => (
            <li key={tool.name} className={styles.item}>
              <div className={styles.cover} style={{ background: tool.color }} />
              <div className={styles.body}>
                <div className={styles.top}>
                  <div className={styles.meta}>
                    {tool.platform && (
                      <span className={styles.platform}>{tool.platform}</span>
                    )}
                    <span className={`${styles.status} ${tool.status === "In progress" ? styles.statusWip : ""}`}>
                      {tool.status}
                    </span>
                  </div>
                  {tool.url ? (
                    <a href={tool.url} className={styles.cta} target="_blank" rel="noopener">
                      Try it &rarr;
                    </a>
                  ) : null}
                </div>
                <h2 className={styles.name}>{tool.name}</h2>
                <p className={styles.desc}>{tool.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
