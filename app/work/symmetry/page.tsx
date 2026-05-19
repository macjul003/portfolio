import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Symmetry — Julian",
  description:
    "A Chrome extension that brings scattered context into every AI chat.",
};

const outcomes = [
  { value: "4 mo", label: "research to shipped spec" },
  { value: "4+", label: "AI platforms supported" },
  { value: "3", label: "injection surfaces designed" },
];

const challenges = [
  {
    n: "01",
    title: "The Cold Start",
    body:
      "Before injecting context, we had to build a knowledge base from scratch. Manual connection was too slow. Auto-connection only captured future chats — missing all the past signal. The unlock: every major LLM already lets users export their full chat history. We imported what they'd already built without knowing it.",
  },
  {
    n: "02",
    title: "The Injection Flow",
    body:
      "The Pill sat inside ChatGPT, Claude, Gemini, and Perplexity. My first design expanded on interaction — but it kept reacting to every keystroke, always doing something. The fix was counterintuitive: show all three buttons, always. Stillness turned out to be a feature. Users stopped noticing it, which was exactly the goal.",
  },
  {
    n: "03",
    title: "The Side Panel",
    body:
      "Auto Inject solved speed — but not trust. The Side Panel let users see context blocks before committing, each traceable to the original chat or document. New users reviewed every block. After a few sessions of good picks, they stopped opening it. The trust curve we designed for played out almost exactly as expected.",
  },
];

export default function SymmetryCaseStudy() {
  return (
    <article className={styles.page}>

      <a href="/work" className={styles.back}>
        <i className="ph-bold ph-arrow-left" style={{ fontSize: 14 }} /> Work
      </a>

      <img
        src="/case-studies/symmetry/sym-overview.png"
        alt="Symmetry overview"
        className={styles.hero}
      />

      <header className={styles.meta}>
        <h1 className={styles.heading}>Giving every AI chat the context it's missing</h1>
        <p className={styles.client}>Symmetry AI · Nov 2025 – Feb 2026</p>
        <div className={styles.tags}>
          {["AI", "Chrome Extension", "Web App"].map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </header>

      <p className={styles.summary}>
        AI power users carry none of their context with them. Every new chat
        starts from zero. Symmetry is a Chrome extension that imports, structures,
        and injects personal context across ChatGPT, Claude, Gemini, and Perplexity
        — without disrupting the tools users already live in.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> the problem
          <span className={styles.rule} />
        </h2>
        <div className={styles.prose}>
          <p>
            Users re-explain themselves across every tool, every session. They paste
            the same background into ChatGPT, then Claude, then Gemini. Most don't
            even realise they're doing it — they've accepted generic answers as the
            ceiling.
          </p>
          <p>
            Months of decisions, constraints, and working context sat scattered across
            old AI conversations, Notion docs, and Slack threads. Of everything we
            found in research, old chat histories carried the most signal. Nobody was
            using them. The context existed. It just never followed users into the
            next chat.
          </p>
          <p>
            When we fed real user context into a prompt during testing, it didn't just
            improve the answer — it delighted users. They weren't expecting the AI to
            know them that well. That reaction was the signal this was worth building.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> challenges
          <span className={styles.rule} />
        </h2>
        <div className={styles.steps}>
          {challenges.map((c) => (
            <div key={c.n} className={styles.step}>
              <span className={styles.stepNum}>{c.n}</span>
              <div>
                <p className={styles.stepTitle}>{c.title}</p>
                <p className={styles.stepBody}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> design
          <span className={styles.rule} />
        </h2>

        <div className={styles.imageWide} aria-hidden="true" />
        <p className={styles.caption}>
          The Pill — a quiet toolbar injected into the AI input box. All three
          buttons always visible. Stillness was the design decision.
        </p>

        <div className={styles.prose}>
          <p>
            The product had three surfaces: the Pill (inside the AI input), the
            Side Panel (review before inject), and the Composer (same system,
            different affordance). Each mapped to a different point on the trust
            curve — from users who wanted full control to those who trusted the
            system to pick for them.
          </p>
          <p>
            Source attribution mattered more than we expected. Seeing which chat
            or document a context block came from removed the hesitation at the
            inject step. Making the system's reasoning visible turned out to matter
            more than making the system smarter.
          </p>
        </div>

        <div className={styles.imageGrid}>
          <div>
            <div className={styles.imageTall} aria-hidden="true" />
            <p className={styles.caption}>Side Panel — context blocks before inject</p>
          </div>
          <div>
            <div className={styles.imageTall} aria-hidden="true" />
            <p className={styles.caption}>Onboarding — four-step import flow</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> outcomes
          <span className={styles.rule} />
        </h2>
        <div className={styles.stats}>
          {outcomes.map((o) => (
            <div key={o.label} className={styles.stat}>
              <span className={styles.statValue}>{o.value}</span>
              <span className={styles.statLabel}>{o.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.prose}>
          <p>
            Every user who completed the import got relevant context injected into
            their first real prompt — no warm-up period, no empty state to push
            through. The delight moment from early research showed up again in the MVP.
          </p>
          <p>
            New users opened the Side Panel, read the blocks, verified the sources.
            After a few sessions of good picks they stopped checking. Auto Inject
            became the default. The trust curve we'd designed for played out almost
            exactly as expected.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> reflection
          <span className={styles.rule} />
        </h2>
        <div className={styles.prose}>
          <p>
            The export unlock came from looking sideways at a parallel product — not
            from asking users. That kind of lateral find is easy to miss and hard to
            manufacture. It's worth building time into research for it.
          </p>
          <p>
            Onboarding drop-off was real. Getting users to export a file from ChatGPT
            and upload it to a new product is a lot to ask. A lighter entry point —
            maybe a single paste — would have helped conversion.
          </p>
          <p>
            Stillness in the Pill took more iteration than it should have. The instinct
            to make UI reactive is strong — and usually wrong.
          </p>
        </div>
      </section>

      <div className={styles.divider} />

      <a href="https://www.figma.com/deck/2ZNyRIV7ZO7H1bEti41Iwh" target="_blank" rel="noopener noreferrer" className={styles.next}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextTitle}>
          Options Trading, Simplified <i className="ph-bold ph-arrow-right" style={{ fontSize: 14 }} />
        </span>
      </a>

    </article>
  );
}
