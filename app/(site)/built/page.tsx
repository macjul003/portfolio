import type { Metadata } from "next";
import {
  CloudFog,
  FilmSlate,
  Gauge,
  ChartBar,
  Storefront,
  BookOpenText,
  MapPin,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Garage",
};

const projects = [
  {
    name: "Page Editor",
    desc: "A visual page editor for crafting rich layouts without touching code.",
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
    desc: "Real-time air quality dashboard with location-based AQI alerts and historical trend charts.",
    tags: ["React", "REST API", "Maps"],
    Icon: CloudFog,
    bg: "#0b1f10",
    glow: "#2d7a3e",
    iconColor: "#4caf6e",
    image: "/pollution tracker thumbnail.png",
    href: "#",
  },
  {
    name: "Hangar",
    desc: "AI aircraft image generator with real airline livery support. Built for the Zomunk aviation community — describe a plane and livery, get a photorealistic render back.",
    tags: ["AI/ML", "Image Gen", "Aviation"],
    Icon: FilmSlate,
    bg: "#0b1520",
    glow: "#2a5fa8",
    iconColor: "#4a8fd4",
    image: "/hangar.png",
    href: "#",
  },
  {
    name: "Zo Video Generator",
    desc: "AI-powered short video generation — prompt in, polished clip out. Built for content creators.",
    tags: ["Python", "AI/ML", "FFmpeg"],
    Icon: FilmSlate,
    bg: "#130b22",
    glow: "#6d3fd4",
    iconColor: "#9b6fea",
    href: "#",
  },
  {
    name: "Car Game",
    desc: "Browser-based top-down racing game with procedurally generated tracks and physics engine.",
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
    desc: "A native macOS app for building daily habits with a minimal menu-bar interface. Tracks streaks, sends gentle reminders, and stays out of your way.",
    tags: ["macOS", "Swift", "SwiftUI"],
    Icon: Storefront,
    bg: "#1a1508",
    glow: "#c98a2a",
    iconColor: "#e0a840",
    href: "#",
  },
  {
    name: "Booklet",
    desc: "Write your resume in plain Markdown, export a pixel-perfect PDF. No drag-and-drop editors, no proprietary formats.",
    tags: ["Node.js", "Markdown", "PDF"],
    Icon: BookOpenText,
    bg: "#0d0d1a",
    glow: "#3a5fd4",
    iconColor: "#5b7fe8",
    href: "#",
  },
  {
    name: "Photos",
    desc: "A map of geotagged photos from my travels. Click any cluster to explore shots from that location.",
    tags: ["Next.js", "Mapbox", "EXIF"],
    Icon: MapPin,
    bg: "#0a1a14",
    glow: "#2a8a5e",
    iconColor: "#4ec494",
    href: "/photos",
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
