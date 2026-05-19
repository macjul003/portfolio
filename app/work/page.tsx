import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work — Julian",
};

const work = [
  {
    title: "AI Context Engine",
    client: "Symmetry AI",
    year: "2026",
    description: "Designed the core interaction model for an AI assistant that surfaces relevant context across a knowledge base — reducing lookup time and improving answer confidence.",
    tags: ["AI", "Product Design", "Information Architecture"],
    href: "/work/symmetry",
    thumbnail: "/case-studies/symmetry/sym-overview.png",
  },
  {
    title: "Options Trading, Simplified",
    client: "Tria",
    year: "2025",
    description: "Redesigned the options trading flow for retail investors, simplifying complex financial decisions into a clear step-by-step interface with real-time risk visualization.",
    tags: ["Fintech", "Interaction Design", "Data Visualization"],
    thumbnail: "/case-studies/ithaca/Ithaca-Thumbnail.png",
    href: "https://www.figma.com/deck/2ZNyRIV7ZO7H1bEti41Iwh",
  },
  {
    title: "Redesigning Onboarding",
    client: "Claystack",
    year: "2025",
    description: "Overhauled the user onboarding experience for a liquid staking protocol, reducing drop-off by reframing complex DeFi concepts through progressive disclosure.",
    tags: ["Web3", "UX Research", "Onboarding"],
    thumbnail: "/case-studies/claystack/app.png",
    href: "https://www.figma.com/deck/cKUSqk9wPnBGwfHexv85ZB",
  },
];

export default function WorkPage() {
  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.name}>Work</h1>
        <p className={styles.subtitle}>Selected projects, 2024–2026</p>
      </header>

      <ul className={styles.list}>
        {work.map((item) => (
          <li key={item.title}>
            <a href={item.href ?? "#"} className={styles.card} target={item.href?.startsWith('http') ? '_blank' : undefined} rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} className={styles.image} />
              ) : (
                <div className={styles.image} />
              )}
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <i className="ph-bold ph-arrow-up-right" style={{ fontSize: 16 }} />
                </div>
                <p className={styles.cardMeta}>{item.client} · {item.year}</p>
                <p className={styles.cardDesc}>{item.description}</p>
                <div className={styles.tags}>
                  {item.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
}
