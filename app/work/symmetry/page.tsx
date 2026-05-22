import type { Metadata } from "next";
import styles from "./page.module.css";
import SymmetryNav from "./SymmetryNav";
import OnboardingGrid from "./OnboardingGrid";
import LightboxImage from "@/app/components/LightboxImage";
import LightboxVideo from "@/app/components/LightboxVideo";

export const metadata: Metadata = {
  title: "Symmetry — Julian",
  description: "Improving AI responses by bringing user context into every chat.",
};

export default function SymmetryCaseStudy() {
  return (
    <>
    <SymmetryNav />
    <article className={styles.page}>

      <header className={styles.meta}>
        <p className={styles.eyebrow}>SYMMETRY  •  MVP 2026</p>
        <h1 className={styles.heading}>Improving AI responses by bringing user context into every chat</h1>
      </header>

      <LightboxImage
        src="/case-studies/symmetry/sym-overview.png"
        alt="Symmetry overview"
        className={styles.hero}
      />

      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <p className={styles.metaLabel}>My Contribution</p>
          <p className={styles.metaValue}>Research</p>
          <p className={styles.metaValue}>Interaction Design</p>
          <p className={styles.metaValue}>Prototype (Claude Code)</p>
        </div>
        <div className={styles.metaItem}>
          <p className={styles.metaLabel}>The Team</p>
          <p className={styles.metaValue}>2 × Co-founders</p>
          <p className={styles.metaValue}>2 × Engineers</p>
        </div>
        <div className={styles.metaItem}>
          <p className={styles.metaLabel}>Timeframe</p>
          <p className={styles.metaValue}>Nov 25 – Feb 26</p>
        </div>
      </div>

      <section id="overview" className={styles.overviewBlock}>
        <p className={styles.overviewLead}>Symmetry turns scattered context into usable AI memory.</p>
        <p className={styles.overviewBody}>Symmetry connects your past chats, notes, and threads — then surfaces the right context in every prompt, so AI responses stay relevant and grounded.</p>
      </section>

      <section id="process" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> my process
          <span className={styles.rule} />
        </h2>
        <p className={styles.sectionSubhead}>Shaping Symmetry from an idea to launch</p>
        <div className={styles.prose}>
          <p>Owned the full journey, research to shipping through continuous iteration and testing.</p>
        </div>

        <div className={styles.processDiagram}>
          {[
            { num: "01", title: "Founder brief",        desc: "Aligned on vision, constraints, and initial direction.",                                              light: true  },
            { num: "02", title: "User understanding",   desc: "Interviews and research to understand how users work across AI tools.",                               light: false },
            { num: "03", title: "Problem framing",      desc: "Defined the core problem: cold start and fragmented context.",                                        light: false },
            { num: "04", title: "Competitive analysis", desc: "Studied parallel products and found the 'recovery vs capture' insight.",                             light: false },
            { num: "05", title: "Interaction design",   desc: "Designed core flows for connect, import, and context injection.",                                     light: false },
            { num: "06", title: "Design system",        desc: "Built for consistency, scalability, and speed.",                                                      light: false },
            { num: "07", title: "Prototype & validate", desc: "Prototyped key flows, tested with real context, and iterated.",                                       light: false },
            { num: "08", title: "Engineering handoff",  desc: "Prepared specs, edge cases, and worked closely with engineers to ship.",                              light: false },
          ].map((step) => (
            <div key={step.num} className={`${styles.processCard} ${step.light ? styles.processCardLight : styles.processCardBlue}`}>
              <span className={styles.processNum}>{step.num}</span>
              <strong className={styles.processTitle}>{step.title}</strong>
              <p className={styles.processDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="problem" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> the problem
          <span className={styles.rule} />
        </h2>
        <p className={styles.sectionSubhead}>AI-native users had context scattered across tools, with no way to bring it into AI workflows.</p>
        <div className={styles.prose}>
          <p>Users re-explain themselves every session, pasting the same background into different AI tools, leading to inconsistent outputs. Decisions and context lived in past chats, docs, and threads, but were never reused.</p>
        </div>
        <blockquote className={styles.callout}>The context existed. It just didn't follow them.</blockquote>
        <LightboxImage src="/case-studies/symmetry/problem-section.png" alt="Problem: scattered context across tools" className={styles.mediaImg} />
        <div className={styles.prose}>
          <p>The harder truth: most users don't even know this is happening. They get a shallow response and assume that's just what AI is capable of. They've normalised underperformance, never realising that more context would yield dramatically better results.</p>
          <p>When we fed it back into prompts, everything improved. Feeding real user context into a prompt during testing didn't just improve the answer, it delighted users. They weren't expecting the AI to know them that well. That reaction was the signal this was worth building.</p>
        </div>
      </section>

      <section id="challenge-01" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> challenge 01
          <span className={styles.rule} />
        </h2>
        <p className={styles.sectionSubhead}>Bringing Context Into One Place</p>
        <div className={styles.prose}>
          <p>Before we could design the injection flow, we had a more fundamental problem: How to bring the context from chats from all the tools (ChatGPT, Claude, Perplexity etc.) into Symmetry?</p>
          <p>Two approaches. Both revealed the same gap.</p>
          <p>Manual connection worked — but it was high-effort. Users had to connect each chat individually, and the knowledge base would take weeks before it felt useful.</p>
          <p>Auto-connection worked too — but it only captured what came next.</p>
        </div>
        <blockquote className={styles.callout}>That's when the real problem surfaced: a cold start. On day one, we had nothing to give the user.</blockquote>
        <LightboxImage src="/case-studies/symmetry/manual-connect.png" alt="Manual connect vs auto connect approaches" className={styles.mediaImg} />
        <LightboxImage src="/case-studies/symmetry/auto-connect.png" alt="Auto connect approach" className={styles.mediaImg} />
      </section>

      <section id="solution" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> solution
          <span className={styles.rule} />
        </h2>
        <p className={styles.sectionSubhead}>The fastest way to value wasn't capturing new context. It was recovering existing context.</p>
        <div className={styles.prose}>
          <p>While researching parallel products — Nessie, Mem0, Mem, Supermemory — I found that ChatGPT, Claude, and others all offer full data exports. Months of context, sitting in downloadable archives nobody thought to use.</p>
          <p>Instead of building from scratch, we let users import what they'd already built.</p>
        </div>
        <LightboxImage src="/case-studies/symmetry/breakthrough.png" alt="The breakthrough: recovering existing context via data exports" className={styles.mediaImg} />
      </section>

      <section id="onboarding" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> onboarding
          <span className={styles.rule} />
        </h2>
        <p className={styles.sectionSubhead}>Onboarding users with their data, minus the noise.</p>
        <div className={styles.prose}>
          <p>The flow was built around two things: understanding who the user was, get the import data and filtering out the noise before it ever entered the system. Role and workspace tags did that work quietly in the background.</p>
        </div>

        <OnboardingGrid />

        <div className={styles.prose}>
          <p>Two things we were deliberate about:</p>
          <p><strong>Transparency:</strong> an FAQ explained exactly what was being extracted and what was discarded. Users needed to trust us with their data before handing it over.</p>
          <p><strong>Honesty about wait time:</strong> extraction wasn't instant. Users got an email when complete; the dashboard showed a progress bar in the meantime. No fake loading screens.</p>
        </div>
        <div className={styles.note}>
          One feature I scoped but cut for MVP: a live component showing what was being extracted in real time. Not engineeringly feasible at that stage, but the right thing to design for and revisit later.
        </div>
        <LightboxVideo src="/case-studies/symmetry/screen-recording.mp4" className={styles.mediaVideo} />
      </section>

      <section id="challenge-02" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> challenge 02
          <span className={styles.rule} />
        </h2>
        <p className={styles.sectionSubhead}>Getting the context to AI, at the right time</p>
        <div className={styles.prose}>
          <p>I decided to place the Pill inside the input box — users' focus already lives there, and it was the least intrusive form factor. Injected directly into ChatGPT, Claude, Gemini, and Perplexity, sitting right where the prompt gets written.</p>
        </div>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNum}>01</span>
            <div>
              <p className={styles.stepTitle}>Approach 1: Progressive disclosure</p>
              <p className={styles.stepBody}>Showing one button at a time, expanding on interaction. In testing, the pill kept opening and closing. Users found it distracting and unpredictable.</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>02</span>
            <div>
              <p className={styles.stepTitle}>Approach 2: Show all three buttons at once</p>
              <p className={styles.stepBody}>Counterintuitive. But stillness read as calm. The pill felt like a tool sitting quietly in the corner — not something demanding attention.</p>
            </div>
          </div>
        </div>

        <LightboxVideo src="/case-studies/symmetry/pill-decision.mp4" className={styles.mediaVideo} />

        <div className={styles.note}>
          I built a storybook-like interface to test out interactions just using vanilla HTML / CSS with the help of Claude.
        </div>

        <p className={styles.sectionSubhead} style={{ marginTop: 32 }}>The Inject Flow</p>
        <div className={styles.prose}>
          <p>The inject button lit up when context was available. Clicking it offered two modes, mapped to where users sat on the trust curve.</p>
          <p><strong>Auto Inject</strong> pulled all relevant context directly into the input box. One click, no decisions. For users who'd seen enough good picks to trust the system.</p>
        </div>
        <LightboxImage src="/case-studies/symmetry/auto-inject.png" alt="Auto inject — context injection flow" className={styles.mediaImg} />
        <div className={styles.prose}>
          <p><strong>Review and Inject</strong> opened the Side Panel for users who wanted to see and choose before committing. Neither was the "advanced" option.</p>
        </div>
        <LightboxVideo src="/case-studies/symmetry/review-and-inject.mp4" className={styles.mediaVideo} />
      </section>

      <section id="outcomes" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> outcomes
          <span className={styles.rule} />
        </h2>
        <div className={styles.prose}>
          <p><strong>The export bet paid off immediately.</strong> Every user who completed the import got relevant context injected into their first real prompt. No warm-up period, no empty state to push through. The delight moment we'd seen in early research showed up again in the MVP.</p>
          <p><strong>Users graduated from Manual to Auto Inject.</strong> New users opened the Side Panel, read the blocks, verified the sources. After a few sessions of good picks they stopped checking. The trust curve we'd designed for played out almost exactly as expected.</p>
          <p><strong>Source attribution mattered more than we expected.</strong> Seeing which chat or document a block came from removed the hesitation at the inject step. Making the system's reasoning visible turned out to matter more than making the system smarter.</p>
        </div>
      </section>

      <section id="cuts" className={styles.section}>
        <h2 className={styles.sectionHead}>
          <span className={styles.slash}>/</span> designs that didn't make the cut
          <span className={styles.rule} />
        </h2>

        <p className={styles.sectionSubhead}>The Composer</p>
        <div className={styles.prose}>
          <p>A separate surface from the pill. A circular icon that appeared inside any input field in the browser — Gmail, forms, text editors.</p>
          <p>The Composer isn't just injection, it's a full writing layer on top of any text area in the browser. A circular icon appears inside Gmail, forms, or any input field. Three things it can do:</p>
        </div>
        <ul className={styles.bulletList}>
          <li><strong>Generate</strong> — Ask for content, it fills the text area directly using your knowledge base.</li>
          <li><strong>Iterate</strong> — Open the chat panel to create multiple variations before committing.</li>
          <li><strong>Edit in place</strong> — Select text already in the field, ask for a rewrite, it replaces it inline.</li>
        </ul>
        <div className={styles.prose}>
          <p>Same underlying system as the pill. Different affordance, broader reach.</p>
        </div>

        <LightboxVideo src="/case-studies/symmetry/composer.mp4" className={styles.mediaVideo} />

        <div className={styles.note}>
          ⚠️ A scoping call worth noting: late in the project, the highlight-to-edit and context injection features started bleeding into every page and input box in the browser, making the UX aggressive and intrusive. This was the exact opposite of the core design constraint.
        </div>
        <div className={styles.note}>
          ✅ The fix: contain these features to high-value surfaces first — Gmail and Google Docs — and expand progressively from there. A harder line at the MVP boundary, but the right one.
        </div>
        <div className={styles.note}>
          Prototyped by me using Claude Code.
        </div>

        <p className={styles.sectionSubhead} style={{ marginTop: 40 }}>The Dashboard</p>
        <div className={styles.prose}>
          <p>The web companion. Users came here to see everything Symmetry had captured, search it, and manage it.</p>
          <p><strong>Sequential grouping:</strong> docs organized chronologically, by source and session.</p>
          <p><strong>Inline editing:</strong> correct or annotate without leaving the list view.</p>
          <p><strong>Ask Symmetry:</strong> conversational search, not just keyword lookup.</p>
          <p><strong>Progressive content preview:</strong> enough to recognize a doc, not enough to overwhelm.</p>
          <p>The dashboard also included multiple workspaces, a folder-based knowledge doc system, a timeline view, and a full Ask Symmetry chat interface — a deliberately thorough system that, in hindsight, I'd have kept much thinner for MVP.</p>
        </div>

        <LightboxImage src="/case-studies/symmetry/dashboard.png" alt="MVP dashboard designs" className={styles.mediaImg} />
        <p className={styles.caption}>MVP dashboard designs to visualize how user data is captured and evolves over time.</p>
      </section>

      <div className={styles.divider} />

      <a href="https://www.figma.com/deck/2ZNyRIV7ZO7H1bEti41Iwh" target="_blank" rel="noopener noreferrer" className={styles.next}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextTitle}>
          Options Trading, Simplified <i className="ph-bold ph-arrow-right" style={{ fontSize: 14 }} />
        </span>
      </a>

    </article>
    </>
  );
}
