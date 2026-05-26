"use client";

import { useState } from "react";
import { motion, useMotionValue } from "motion/react";
import styles from "./page.module.css";

const FILTER_TAGS = ["Web3", "AI", "Brand Design", "Product Design", "Fintech", "Indie App"];

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
    meta: "Tria · 2025",
    description:
      "Redesigned the options trading flow for retail investors, simplifying complex financial decisions into a clear step-by-step interface with real-time risk visualization.",
    tags: ["Product Design", "AI", "Fintech", "Interaction Design"],
    thumbnail: "/case-studies/ithaca/Ithaca-Thumbnail.png",
    href: "https://www.figma.com/deck/2ZNyRIV7ZO7H1bEti41Iwh",
    external: true,
    date: "2025-11-01",
    aspectRatio: "3 / 2",
  },
  {
    title: "Redesigning Onboarding",
    meta: "Claystack · 2025",
    description:
      "Overhauled the user onboarding experience for a liquid staking protocol, reducing drop-off by reframing complex DeFi concepts through progressive disclosure.",
    tags: ["Product Design", "Web3", "UX Research"],
    thumbnail: "/case-studies/claystack/app.png",
    href: "https://www.figma.com/deck/cKUSqk9wPnBGwfHexv85ZB",
    external: true,
    date: "2025-06-01",
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
    external: !!item.link || href.startsWith("http"),
    date: item.date,
  };
}

const RATIOS = ["ratio169", "ratio34", "ratio43", "ratio11"] as const;

function actionLabel(item: CardItem): string {
  if (item.label) return item.label;
  if (!item.external) return "View Case Study";
  if (item.href.includes("figma")) return "View Prototype";
  return "Visit Website";
}

function actionIcon(item: CardItem): string {
  const label = actionLabel(item);
  if (label === "View Prototype") return "ph-arrow-up-right";
  return "ph-eye";
}


function WorkCard({ item, index }: { item: CardItem; index: number }) {
  const ratioClass = (item.video || item.aspectRatio) ? undefined : styles[RATIOS[index % RATIOS.length]];
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
        className={`${styles.imageWrap} ${ratioClass ?? ""}`}
        style={{ cursor: hovered ? "none" : undefined, aspectRatio: item.aspectRatio }}
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

  const articleCards = articles.map(articleToCard);
  const allCards = [...featured, ...articleCards]
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const filtered =
    activeTag === null
      ? allCards
      : allCards.filter((c) =>
          c.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
        );

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

      <ul className={styles.list}>
        {filtered.map((item, i) => (
          <li key={item.href + item.title}>
            <WorkCard item={item} index={i} />
          </li>
        ))}
        {filtered.length === 0 && (
          <li className={styles.empty}>No projects match this filter.</li>
        )}
      </ul>
    </div>
  );
}
