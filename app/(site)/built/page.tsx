import type { Metadata } from "next";
import {
  CloudFog,
  Gauge,
  ChartBar,
  Storefront,
  BookOpenText,
  ArrowUpRight,
  Airplane,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Garage",
  description: "Side projects and indie apps built by Julian — small experiments and shipped products.",
  alternates: { canonical: "https://macjulian.com/built" },
};

const projects = [
  {
    name: "Page Editor",
    desc: "A browser bookmarklet that makes any webpage editable. Tracks word-level diffs and exports structured ORIGINAL/EDITED pairs.",
    tags: ["React", "TypeScript"],
    Icon: BookOpenText,
    bg: "#0d0d0d",
    glow: "#444",
    iconColor: "#888",
    video: "/Page Editor.mov",
    href: "#",
  },
  {
    name: "Pollution Tracker",
    desc: "Native macOS menu bar app showing real-time AQI via a colour-coded icon. No dashboard, no noise.",
    tags: ["SwiftUI", "REST API", "macOS"],
    Icon: CloudFog,
    bg: "#0b1f10",
    glow: "#2d7a3e",
    iconColor: "#4caf6e",
    image: "/pollution tracker thumbnail.png",
    href: "#",
  },
  {
    name: "Hangar",
    desc: "AI aircraft image generator with real airline livery support. Describe a plane and livery, get a photorealistic render back.",
    tags: ["AI/ML", "Image Gen", "Aviation"],
    Icon: Airplane,
    bg: "#0b1520",
    glow: "#2a5fa8",
    iconColor: "#4a8fd4",
    image: "/hangar.png",
    href: "#",
  },
  {
    name: "Car Game",
    desc: "Browser-based top-down racing game with procedurally generated tracks and a custom physics engine.",
    tags: ["JavaScript", "Canvas API", "Physics"],
    Icon: Gauge,
    bg: "#1f0b0b",
    glow: "#d43f3f",
    iconColor: "#e06060",
    href: "#",
  },
  {
    name: "Chrome Activity Monitor",
    desc: "Chrome extension that tracks browsing habits and delivers weekly productivity focus reports.",
    tags: ["Chrome Extension", "TypeScript", "Charts"],
    Icon: ChartBar,
    bg: "#091820",
    glow: "#2a7fa8",
    iconColor: "#4fa8d4",
    href: "#",
  },
  {
    name: "DayTasks",
    desc: "A native macOS menu bar app for daily habits. Tracks streaks, sends gentle nudges, stays out of your way.",
    tags: ["macOS", "Swift", "SwiftUI"],
    Icon: Storefront,
    bg: "#1a1508",
    glow: "#c98a2a",
    iconColor: "#e0a840",
    href: "#",
  },
  {
    name: "Booklet",
    desc: "Write your resume in plain Markdown, export a pixel-perfect PDF. No proprietary formats, no lock-in.",
    tags: ["Node.js", "Markdown", "PDF"],
    Icon: BookOpenText,
    bg: "#0d0d1a",
    glow: "#3a5fd4",
    iconColor: "#5b7fe8",
    href: "#",
  },
];

export default function GaragePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.name}>Garage</h1>
        <p className={styles.subtitle}>Things I&apos;ve built</p>
      </header>

      <div className={styles.grid}>
        {projects.map((p) => (
          <a key={p.name} href={p.href} className={styles.card}>
            <div className={styles.cardVisual} style={{ background: p.bg }}>
              {p.video ? (
                <video src={p.video} className={styles.cardImage} autoPlay loop muted playsInline />
              ) : p.image ? (
                <img src={p.image} alt={p.name} className={styles.cardImage} />
              ) : (
                <>
                  <p.Icon size={52} color={p.iconColor} weight="duotone" className={styles.cardIconSvg} />
                  <div className={styles.cardGlow} style={{ background: p.glow }} />
                </>
              )}
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardRow}>
                <h3 className={styles.cardName}>{p.name}</h3>
                <ArrowUpRight size={18} className={styles.cardArrow} />
              </div>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.cardTags}>
                {p.tags.map((tag) => (
                  <span key={tag} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
