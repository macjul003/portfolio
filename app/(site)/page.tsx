import styles from "./page.module.css";
import { getAllArticles } from "@/lib/journal";
import ActivityTerminal from "../components/ActivityTerminal";
import WorkGrid from "../components/WorkGrid";
import BuiltStrip from "../components/BuiltStrip";

const work = [
  {
    client: "Ithaca Protocol",
    date: "Nov 2025",
    title: "Designing trust in AI-powered options trading system",
    href: "https://www.figma.com/deck/2ZNyRIV7ZO7H1bEti41Iwh",
    thumbnail: "/case-studies/ithaca/Ithaca-Thumbnail.png",
    external: true,
  },
  {
    client: "Claystack",
    date: "Jun 2025",
    title: "Designing the Ethereum Liquid Staking UX",
    href: "https://www.figma.com/deck/cKUSqk9wPnBGwfHexv85ZB",
    thumbnail: "/case-studies/claystack/app.png",
    external: true,
  },
  {
    client: "Symmetry AI",
    date: "Jan 2026",
    title: "Improving AI responses by bringing user context into chat",
    href: "/work/symmetry",
    thumbnail: "/case-studies/symmetry/sym-overview.png",
    external: false,
  },
];


const ticker = [
  "Design is not just what it looks like — design is how it works.",
  "The details are not the details. They make the design.",
  "Every constraint is an invitation to be creative.",
  "Good design is obvious. Great design is transparent.",
].join("   ×   ");

function formatDate(dateStr: string): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const parts = dateStr.split("-");
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);
  return `${months[m - 1]} ${d}, ${parts[0]}`;
}
export default function Home() {
  const articles = getAllArticles().slice(0, 5);

  return (
    <main className={styles.page}>
      <div className={styles.inner}>

        <header className={styles.header}>
          <h1 className={styles.name}>Julian</h1>
          <p className={styles.title}>Product Designer + Builder</p>
        </header>

        <div className={styles.bio}>
          <p>
            I design products that turn complex technology into experiences that just work.
            Across AI, fintech, crypto, and travel, I build intuitive systems that bring clarity
            to users and power to teams.
          </p>
          <p>
            I ship fast with early-stage startups, align engineers and founders, and own the full
            journey — from big-picture thinking to the smallest interaction. Good design, for me,
            is about speed, leverage, and making hard things feel effortless.
          </p>
          <p>
            Find me on{" "}
            <a href="https://x.com/macjuliansamuel" target="_blank" rel="noopener">X</a>,{" "}
            <a href="https://www.linkedin.com/in/juliansamuel003/" target="_blank" rel="noopener">LinkedIn</a>,
            or reach out via{" "}
            <a href="mailto:juliansam003@gmail.com">email</a>.
          </p>
        </div>

        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack} aria-hidden="true">
            <span>{ticker}</span>
            <span>{ticker}</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionHead}>
            <span className={styles.slash}>/</span> case studies
            <span className={styles.headRule} />
          </h2>
          <WorkGrid items={work} />
        </section>

        {/* posts section hidden */}

        <section className={styles.section}>
          <h2 className={styles.sectionHead}>
            <span className={styles.slash}>/</span> indie apps
            <span className={styles.headRule} />
          </h2>
          <p className={styles.sectionSubtitle}>
            Design-led apps, engineered by me to solve my own problems — soon to be released on the public App Store.
          </p>
          <BuiltStrip />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHead}>
            <span className={styles.slash}>/</span> activity
            <span className={styles.headRule} />
          </h2>
          <ActivityTerminal />
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="mailto:juliansam003@gmail.com">Email</a>
            <a href="https://x.com/macjuliansamuel" target="_blank" rel="noopener">X</a>
            <a href="https://github.com/macjul003" target="_blank" rel="noopener">GitHub</a>
            <a href="/now">Now</a>
          </div>
          <span>© 2026</span>
        </footer>

      </div>
    </main>
  );
}
