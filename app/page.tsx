import styles from "./page.module.css";
import { getAllArticles } from "@/lib/journal";
import ActivityTerminal from "./components/ActivityTerminal";

const work = [
  {
    client: "Symmetry AI",
    date: "Jan 2026",
    title: "Improving AI responses by bringing user context into chat",
    href: "/work/symmetry",
    thumbnail: "/case-studies/symmetry/sym-overview.png",
  },
  {
    client: "Ithaca Protocol",
    date: "Nov 2025",
    title: "Designing trust in AI-powered options trading system",
    href: "https://www.figma.com/deck/2ZNyRIV7ZO7H1bEti41Iwh",
    thumbnail: "/case-studies/ithaca/Ithaca-Thumbnail.png",
  },
  {
    client: "Claystack",
    date: "Jun 2025",
    title: "Designing the Ethereum Liquid Staking UX",
    href: "https://www.figma.com/deck/cKUSqk9wPnBGwfHexv85ZB",
    thumbnail: "/case-studies/claystack/app.png",
  },
  {
    client: "Zomunk",
    date: "Jun 2024",
    title: "Helping users discover cheap flight deals",
    href: "#",
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
        </header>

        <div className={styles.bio}>
          <p>
            A product designer building AI-native products — from system logic
            to the interfaces people actually use. Over 5+ years across AI,
            Fintech, and Travel, drawn to high-stakes decisions and users who
            don't have time to figure things out.
          </p>
          <p>
            Currently building <a href="#">DayTasks</a>, a macOS habit tracker.
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
            <span className={styles.slash}>/</span> work
            <span className={styles.headRule} />
          </h2>
          <div className={styles.workGrid}>
            {work.map((item) => (
              <a key={item.title} href={item.href} className={styles.workCard} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className={styles.workImage} />
                ) : (
                  <div className={styles.workImage} />
                )}
                <h3 className={styles.workTitle}>{item.title}</h3>
                <p className={styles.workClient}>{item.client} · {item.date}</p>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHead}>
            <span className={styles.slash}>/</span> posts
            <span className={styles.headRule} />
          </h2>
          <ul className={styles.postList}>
            {articles.map((article) => (
              <li key={article.slug}>
                <a href={`/journal/${article.slug}`} className={styles.postRow}>
                  <time className={styles.postDate}>{formatDate(article.date)}</time>
                  <span className={styles.postTitle}>{article.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="/journal" className={styles.viewAll}>View all</a>
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
          </div>
          <span>© 2026</span>
        </footer>

      </div>
    </main>
  );
}
