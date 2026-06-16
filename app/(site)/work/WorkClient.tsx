"use client";

import { useState } from "react";
import { motion, useMotionValue } from "motion/react";
import styles from "./page.module.css";

const FILTER_TAGS = ["Web3", "AI", "Brand Design"];

type CardItem = {
  title: string;
  meta: string;
  description: string;
  tags: string[];
  href: string;
  thumbnail: string;
  video?: string;
  label?: string;
  aspectRatio?: string;
  external: boolean;
  date: string;
};

const featured: CardItem[] = [
  {
    title: "AI Context Engine",
    meta: "Symmetry AI · 2026",
    description:
      "Designed the core interaction model for an AI assistant that surfaces relevant context across a knowledge base — reducing lookup time and improving answer confidence.",
    tags: ["AI", "Product Design", "Information Architecture"],
    href: "/work/symmetry",
    thumbnail: "/case-studies/symmetry/sym-overview.png",
    external: false,
    date: "2026-01-01",
  },
  {
    title: "Options Trading, Simplified",
    meta: "Ithaca · 2025",
    description:
      "Redesigned the options trading flow for retail investors, simplifying complex financial decisions into a clear step-by-step interface with real-time risk visualization.",
    tags: ["Product Design", "AI", "Fintech", "Web3", "Interaction Design"],
    thumbnail: "/case-studies/ithaca/Ithaca-Thumbnail.png",
    href: "https://drive.google.com/file/d/1jNQyLlAghlwQTu47MQ_Jramj0qPlK8dn/view?usp=sharing",
    label: "Read Case Study",
    external: true,
    date: "2025-11-01",
    aspectRatio: "3 / 2",
  },
  {
    title: "Designing a Better Investing Experience",
    meta: "Claystack · 2023",
    description:
      "Overhauled the user onboarding experience for a liquid staking protocol, reducing drop-off by reframing complex DeFi concepts through progressive disclosure.",
    tags: ["Product Design", "Web3", "UX Research"],
    thumbnail: "/case-studies/claystack/app.png",
    href: "https://drive.google.com/file/d/1PJirQ0DufnI0evO2x_PrCtu10xaU14mw/view?usp=sharing",
    label: "Read Case Study",
    external: true,
    date: "2025-06-01",
    aspectRatio: "3 / 2",
  },
];

interface ArticleItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  video?: string;
  subtitle: string;
  link?: string;
  label?: string;
  aspectRatio?: string;
  tags: string[];
}

function formatDate(dateStr: string): string {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const d = new Date(dateStr);
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function articleToCard(item: ArticleItem): CardItem {
  const href = item.link ?? `/work/${item.slug}`;
  return {
    title: item.title,
    meta: formatDate(item.date),
    description: item.subtitle,
    tags: item.tags,
    href,
    thumbnail: item.image,
    video: item.video,
    label: item.label,
    aspectRatio: item.aspectRatio,
    external: !!item.link || href.startsWith("http"),
    date: item.date,
  };
}

function actionLabel(item: CardItem): string {
  if (item.label) return item.label;
  if (!item.external) return "Read Case Study";
  if (item.href.includes("figma")) return "View Prototype";
  return "Visit Website";
}

function actionIcon(item: CardItem): string {
  const label = actionLabel(item);
  if (label === "Read Case Study") return "ph-book-open";
  if (label === "View Prototype") return "ph-arrow-up-right";
  return "ph-eye";
}


function WorkCard({ item }: { item: CardItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const pillLeft = useMotionValue(0);
  const pillTop  = useMotionValue(0);

  const trackMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pillLeft.set(e.clientX - rect.left);
    pillTop.set(e.clientY - rect.top);
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    trackMouse(e);
    setHovered(true);
  };

  return (
    <a
      href={item.href}
      className={styles.card}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
    >
      <div
        className={styles.imageWrap}
        style={{ cursor: hovered ? "none" : undefined }}
        onMouseMove={trackMouse}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
      >
        {item.video ? (
          <video
            src={item.video}
            className={styles.videoNative}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} className={styles.image} />
        ) : (
          <div className={styles.image} />
        )}
        <motion.div
          className={styles.hoverPill}
          style={{
            left: pillLeft,
            top: pillTop,
            translateX: "-50%",
            translateY: "-50%",
            opacity: hovered ? 1 : 0,
          }}
        >
          <i className={`ph-bold ${actionIcon(item)}`} style={{ fontSize: 14 }} />
          {actionLabel(item)}
        </motion.div>
      </div>
      <div className={styles.cardCaption}>
        <span className={styles.captionLeft}>{item.title}</span>
        <span className={styles.captionRight}>{item.meta}</span>
      </div>
    </a>
  );
}

export default function WorkClient({ articles }: { articles: ArticleItem[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const articleCards = articles
    .map(articleToCard)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const matchesTag = (c: CardItem) =>
    activeTag === null ||
    c.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());

  const caseStudies = [...featured]
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .filter(matchesTag);
  const moreWork = articleCards.filter(matchesTag);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.name}>Work</h1>
      </header>

      <div className={styles.filters}>
        <button
          className={`${styles.filterPill} ${activeTag === null ? styles.filterPillActive : ""}`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            className={`${styles.filterPill} ${activeTag === tag ? styles.filterPillActive : ""}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {caseStudies.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>
            <span className={styles.slash}>/</span> case studies
            <span className={styles.headRule} />
          </h2>
          <ul className={`${styles.list} ${styles.listThree}`}>
            {caseStudies.map((item, i) => (
              <li key={item.href + item.title}>
                <WorkCard item={item} index={i} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {moreWork.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>
            <span className={styles.slash}>/</span> more work
            <span className={styles.headRule} />
          </h2>
          <ul className={styles.list}>
            {moreWork.map((item, i) => (
              <li key={item.href + item.title}>
                <WorkCard item={item} index={i} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {caseStudies.length === 0 && moreWork.length === 0 && (
        <p className={styles.empty}>No projects match this filter.</p>
      )}
    </div>
  );
}
