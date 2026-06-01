'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import ProjectModal, { type Project } from './ProjectModal';
import { pageEditorBookmarklet } from '@/lib/pageEditorBookmarklet';
import styles from './BuiltStrip.module.css';

const projects: Project[] = [
  {
    name: 'Hangar',
    tagline: 'Generate aircraft renders with real livery.',
    desc: 'An AI image generator purpose-built for aviation. Describe an aircraft and airline livery and get photorealistic renders back — built for Zomunk.',
    why: 'Building the Zomunk app meant sourcing a lot of aviation assets: livery renders, aircraft shots, specific configurations. Creating one manually took 2 to 3 hours; buying stock was $12 a piece and still never quite right. I trained an AI agent to generate exactly what we needed, on demand. The longer-term scope is to have it run directly inside the app, triggered whenever an asset is required.',
    stats: [
      { label: 'Hours saved', value: '12,500+' },
      { label: 'Cost saved', value: '$60K+' },
    ],
    iconSrc: '/app-icon/hangar.png',
    image: '/hangar.png',
    tags: ['AI/ML', 'Image Gen', 'Aviation'],
    githubUrl: 'https://github.com/macjul003/Zomunk-image-gen',
    features: [
      { title: 'Livery-aware generation', desc: 'Understands airline liveries and aircraft types — not just generic planes.' },
      { title: 'Built for Zomunk', desc: 'Purpose-built tool for the Zomunk aviation community to generate and share aircraft art.' },
    ],
  },
  {
    name: 'Pollution Tracker',
    tagline: 'Real-time AQI in your menu bar.',
    desc: 'A native macOS menu bar app that tracks live air quality for your location using Open-Meteo. The icon color shifts with the AQI — tap it for a detailed forecast chart.',
    why: 'I live in a city where air quality swings unpredictably. I wanted to know at a glance whether to open the windows or go for a run — not hunt through a weather app for it.',
    iconSrc: '/app-icon/pollution-tracker.png',
    image: '/pollution tracker thumbnail.png',
    tags: ['Swift', 'SwiftUI', 'macOS'],
    githubUrl: 'https://github.com/macjul003/PollutionTracker',
    downloadUrl: 'https://github.com/macjul003/PollutionTracker/releases/download/v1.0.1/PollutionTracker.zip',
    features: [
      { title: 'Live AQI data', desc: 'Pulls from Open-Meteo Air Quality API — updates automatically for your current location.' },
      { title: 'Menu bar integration', desc: 'Glanceable AQI color indicator lives in your menu bar, out of the way until you need it.' },
      { title: '24-hour forecast', desc: 'Tap the icon for a detailed popover with city name, metrics, and an hourly chart.' },
    ],
    installGuide: {
      appName: 'Pollution Tracker',
      appFileName: 'PollutionTracker.app',
      downloadUrl: 'https://github.com/macjul003/PollutionTracker/releases/download/v1.0.1/PollutionTracker.zip',
      homebrewTap: 'macjul003/pollutiontracker',
      homebrewCask: 'pollution-tracker',
    },
  },
  {
    name: 'Page Editor',
    tagline: 'Edit any page, copy diffs to Claude.',
    desc: 'A browser bookmarklet that makes any webpage editable. Tracks word-level changes as you type, then copies structured before/after diffs you can paste straight back to Claude.',
    why: 'I was constantly copying web content into Claude for editing but kept losing the formatting context. This lets me edit in place and export a clean diff — no copy-paste gymnastics.',
    iconSrc: '/app-icon/booklet.png',
    video: '/Page Editor.mov',
    tags: ['JavaScript', 'Bookmarklet', 'Browser'],
    githubUrl: 'https://github.com/macjul003/page-editor-bookmarklet',
    bookmarklet: pageEditorBookmarklet,
    features: [
      { title: 'Instant edit mode', desc: 'One click enables contentEditable on the entire page — click any text and start typing.' },
      { title: 'Word-level diffs', desc: 'Review panel highlights deleted words (strikethrough) and added words (green) before you copy.' },
      { title: 'Claude-ready output', desc: 'Copies changes as structured ORIGINAL / EDITED pairs — paste directly into Claude to apply them.' },
    ],
  },
];

export default function BuiltStrip() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className={styles.strip}>
        {projects.map((p) => (
          <motion.button
            key={p.name}
            className={`${styles.card} ${p.upcoming ? styles.cardUpcoming : ''}`}
            onClick={() => !p.upcoming && setActive(p)}
            whileTap={p.upcoming ? undefined : { scale: 0.975 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          >
            <div className={styles.cardHeader}>
              {p.iconSrc ? (
                <img src={p.iconSrc} alt={p.name} className={styles.cardIconImg} />
              ) : p.Icon ? (
                <div className={styles.cardIcon} style={{ background: p.bg }}>
                  <p.Icon size={26} weight="duotone" color={p.iconColor} />
                </div>
              ) : null}
              {p.upcoming && <span className={styles.upcomingBadge}>Upcoming</span>}
            </div>
            <p className={styles.cardName}>{p.name}</p>
            <p className={styles.cardTagline}>{p.tagline}</p>
            <div className={styles.cardTags}>
              {p.tags.map((tag) => (
                <span key={tag} className={styles.cardTag}>{tag}</span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
