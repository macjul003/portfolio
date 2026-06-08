import type { Metadata } from "next";
import styles from "./page.module.css";
import { getAllWorkItems } from "@/lib/work";

export const metadata: Metadata = {
  description: "Julian is a product designer building AI-native products. View case studies, side projects, and writing on design and technology.",
  alternates: { canonical: "https://macjulian.com" },
};
import ActivityTerminal from "../components/ActivityTerminal";
import WorkGrid from "../components/WorkGrid";
import BuiltStrip from "../components/BuiltStrip";
import WeatherLine from "../components/WeatherLine";
import WorkCarousel from "../components/WorkCarousel";

const work = [
  {
    client: "Symmetry AI",
    date: "Jan 2026",
    title: "Improving AI responses by bringing user context into chat",
    href: "/work/symmetry",
    thumbnail: "/case-studies/symmetry/sym-overview.png",
    external: false,
  },
  {
    client: "Ithaca Protocol",
    date: "Nov 2025",
    title: "Designing trust in AI-powered options trading system",
    href: "https://drive.google.com/file/d/1jNQyLlAghlwQTu47MQ_Jramj0qPlK8dn/view?usp=sharing",
    thumbnail: "/case-studies/ithaca/Ithaca-Thumbnail.png",
    external: true,
  },
  {
    client: "Claystack",
    date: "Jun 2025",
    title: "Designing the Ethereum Liquid Staking UX",
    href: "https://drive.google.com/file/d/1PJirQ0DufnI0evO2x_PrCtu10xaU14mw/view?usp=sharing",
    thumbnail: "/case-studies/claystack/app.png",
    external: true,
  },
];

export default function Home() {
  const carouselThumbs = Array.from(
    new Set([
      ...work.map((w) => w.thumbnail),
      ...getAllWorkItems()
        .filter((w) => !w.draft && w.image)
        .map((w) => w.image),
    ])
  );

  return (
    <main className={styles.page}>
      <div className={styles.layout}>

        <aside className={styles.leftCol}>
          <header className={styles.header}>
            <h1 className={styles.name}>Julian</h1>
          </header>

          <div className={styles.bio}>
            <p>
              Product designer shipping AI, fintech &amp; crypto products with early-stage
              teams — first design hire, idea to launch.
            </p>
          </div>

          <div className={styles.ctaRow}>
            <a href="/work" className={`${styles.btn} ${styles.btnPrimary}`}>View work</a>
            <a href="/about" className={styles.btn}>About</a>
          </div>
        </aside>

        <div className={styles.rightCol}>
          <section className={styles.section}>
            <WorkGrid items={work} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>
              <span className={styles.slash}>/</span> indie apps
              <span className={styles.headRule} />
            </h2>
            <p className={styles.sectionSubtitle}>
              Designed and engineered by me to improve my own workflow and solve problems I run into. Everything&apos;s public on GitHub today — App Store releases coming soon.
            </p>
            <BuiltStrip />
            <div className={styles.workCarouselWrap}>
              <WorkCarousel images={carouselThumbs} />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>
              <span className={styles.slash}>/</span> activity
              <span className={styles.headRule} />
            </h2>
            <ActivityTerminal />
          </section>
        </div>

      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="mailto:juliansam003@gmail.com">Email</a>
          <a href="https://x.com/macjuliansamuel" target="_blank" rel="noopener">X</a>
          <a href="https://github.com/macjul003" target="_blank" rel="noopener">GitHub</a>
          <a href="/glossary">Glossary</a>
        </div>
        <WeatherLine />
        <span>© 2026</span>
      </footer>
    </main>
  );
}
