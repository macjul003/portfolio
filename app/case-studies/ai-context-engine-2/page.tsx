import type { Metadata } from "next";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import SideNav from "./SideNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Symmetry — Julian Samuel",
  description: "A Chrome extension that brings scattered context into every AI chat.",
};

const BASE = "/case-studies/symmetry-ai";

const NARRATIVE_HEADINGS: Record<string, string> = {
  "The Problem":
    "AI power users carry none of their context with them...",
  "Process":
    "The final flows were simple, but the research behind them changed the whole product direction.",
  "The Core Constraint":
    "The extension had to enhance the user's existing workflow — not ask them to adopt a new one.",
  "Onboarding":
    "The core problem was the cold start: an empty knowledge base means nothing to inject.",
  "Surface 01 — The Pill":
    "A small pill UI that lived inside ChatGPT, Claude, Gemini and Perplexity.",
  "Surface 02 — The Side Panel":
    "The Pill handles the commit. The Panel handles the conversation.",
  "Surface 03 — The Composer":
    "Same underlying system as the Pill. Different affordance. Broader reach.",
  "Surface 04 — The Dashboard":
    "The web companion, where users could see everything Symmetry had captured.",
  "Outcomes":
    "What the internal MVP actually shipped, and what the team learned from it.",
  "Reflection":
    "What I'll take into the next product.",
};

function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/\s*—\s*.+/, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getEyebrow(heading: string): string {
  const m = heading.match(/^(Surface \d+)/);
  if (m) return m[1];
  return heading.replace(/^The /, "");
}

function getDisplayHeading(heading: string): string {
  if (heading.includes(" — ")) return heading.split(" — ")[1];
  return heading;
}

function getNavLabel(heading: string): string {
  if (heading.includes(" — ")) return heading.split(" — ")[1];
  return heading;
}

function SectionMedia({ id }: { id: string }) {
  if (id === "onboarding") {
    return (
      <div className={styles.mediaGrid}>
        <img src={`${BASE}/Onboarding-1.png`} alt="Onboarding step 1" className={styles.mediaImg} />
        <img src={`${BASE}/Onboarding%202.png`} alt="Onboarding step 2" className={styles.mediaImg} />
        <img src={`${BASE}/Onboarding%203.png`} alt="Onboarding step 3" className={styles.mediaImg} />
        <img src={`${BASE}/Onboarding%204.png`} alt="Onboarding step 4" className={styles.mediaImg} />
      </div>
    );
  }

  if (id === "surface-01") {
    return (
      <div className={styles.mediaStack}>
        <video autoPlay muted loop playsInline className={styles.mediaVideo}>
          <source src={`${BASE}/The%20Pill%20decision.mp4`} type="video/mp4" />
        </video>
        <video autoPlay muted loop playsInline className={styles.mediaVideo}>
          <source src={`${BASE}/Review%20and%20Inject.mp4`} type="video/mp4" />
        </video>
        <img src={`${BASE}/The%20chrome%20extenson%20-%20auto%20inject.png`} alt="Auto inject mode" className={styles.mediaImg} />
        <video autoPlay muted loop playsInline className={styles.mediaVideo}>
          <source src={`${BASE}/Optimize.mp4`} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (id === "surface-03") {
    return (
      <video autoPlay muted loop playsInline className={styles.mediaVideo}>
        <source src={`${BASE}/Composer.mp4`} type="video/mp4" />
      </video>
    );
  }

  if (id === "process") {
    return (
      <img src={`${BASE}/Image3.png`} alt="Process overview" className={styles.mediaImg} />
    );
  }

  return null;
}

export default function SymmetryDetailPage() {
  const cs = getCaseStudyBySlug("ai-context-engine");

  const navItems = [
    { id: "overview", label: "Overview" },
    ...cs.sections.map((s) => ({
      id: slugify(s.heading),
      label: getNavLabel(s.heading),
    })),
  ];

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* Sticky left nav */}
        <aside className={styles.sideNavWrapper}>
          <SideNav items={navItems} />
        </aside>

        {/* Main content */}
        <div className={styles.content}>

          <header className={styles.hero}>
            <p className={styles.eyebrow}>Symmetry · Internal MVP 2026</p>
            <h1 className={styles.heroTitle}>
              Giving every AI chat<br />the context it&rsquo;s missing.
            </h1>
            <div className={styles.heroMeta}>
              <div>
                <div className={styles.metaKey}>Role</div>
                <div className={styles.metaVal}>
                  <div>Product Designer</div>
                  <div>Research → handoff</div>
                </div>
              </div>
              <div>
                <div className={styles.metaKey}>Timeline</div>
                <div className={styles.metaVal}>
                  <div>Nov 2025 — Feb 2026</div>
                  <div>~4 months</div>
                </div>
              </div>
              <div>
                <div className={styles.metaKey}>Team</div>
                <div className={styles.metaVal}>
                  <div>2 Co-founders · 2 Engineers</div>
                  <div>1 Designer (me)</div>
                </div>
              </div>
            </div>
          </header>

          {/* Hero cover */}
          <img
            src={`${BASE}/Cover.png`}
            alt="Symmetry"
            className={styles.heroCover}
          />

          {/* Intro */}
          {cs.intro && (
            <div id="overview" className={`${styles.section} ${styles.intro}`}>
              <p className={styles.secEyebrow}>Overview</p>
              <h2 className={styles.secHeading}>
                Symmetry is a Chrome extension where scattered thoughts become the context behind every AI chat.
              </h2>
              <div dangerouslySetInnerHTML={{ __html: cs.intro }} />
            </div>
          )}

          {/* Sections — no collapse */}
          {cs.sections.map((section) => {
            const id = slugify(section.heading);
            return (
              <section key={section.heading} id={id} className={styles.section}>
                <p className={styles.secEyebrow}>{getEyebrow(section.heading)}</p>
                <h2 className={styles.secHeading}>
                  {NARRATIVE_HEADINGS[section.heading] ?? getDisplayHeading(section.heading)}
                </h2>
                <div
                  className={styles.secContent}
                  dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                />
                <SectionMedia id={id} />
              </section>
            );
          })}

        </div>
      </div>
    </div>
  );
}
