import type { Metadata } from "next";
import s from "../symmetry/page.module.css";
import p from "./page.module.css";

export const metadata: Metadata = {
  title: "Zomunk",
  description: "Rethinking how people find cheap flights.",
};

export default function ZomunkCaseStudy() {
  return (
    <article className={s.page}>

      <header className={s.meta}>
        <p className={s.eyebrow}>ZOMUNK  •  TRAVEL  •  2024</p>
        <h1 className={s.heading}>Rethinking how people find cheap flights</h1>
      </header>

      <div className={s.hero} />

      <div className={s.metaGrid}>
        <div className={s.metaItem}>
          <p className={s.metaLabel}>My Contribution</p>
          <p className={s.metaValue}>UX Research</p>
          <p className={s.metaValue}>Product Design</p>
          <p className={s.metaValue}>Visual Design</p>
        </div>
        <div className={s.metaItem}>
          <p className={s.metaLabel}>Industry</p>
          <p className={s.metaValue}>Travel</p>
        </div>
        <div className={s.metaItem}>
          <p className={s.metaLabel}>Year</p>
          <p className={s.metaValue}>Jun 2024</p>
        </div>
      </div>

      <section className={s.overviewBlock}>
        <p className={s.overviewLead}>Zomunk delivers the cheapest flight deals by email.</p>
        <p className={s.overviewBody}>Instead of searching by dates or destinations, users browse curated deals and book directly with the airline — a simpler way for flexible travelers who care more about price than plans.</p>
      </section>

      {/* The Problem */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> the problem
          <span className={s.rule} />
        </h2>
        <p className={s.sectionSubhead}>Search-first platforms assume you already know where you're going.</p>
        <div className={s.prose}>
          <p>Traditional platforms like Google Flights and Skyscanner assume users know exactly when and where they want to go. But many travelers just want to see the best deals available.</p>
          <p>For these users, the search-heavy model adds friction. Zomunk's challenge was to remove the search box and replace it with discovery.</p>
        </div>
      </section>

      {/* The User */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> the user
          <span className={s.rule} />
        </h2>
        <p className={s.sectionSubhead}>Who was this a problem for?</p>

        <div className={p.personaCard}>
          <div className={p.personaHeader}>
            <p className={p.personaName}>Ananya</p>
            <p className={p.personaMeta}>29 · Remote Professional</p>
            <div className={p.personaTags}>
              {["Loves to travel", "Works from anywhere", "Flexible with dates & destinations", "Spontaneous planner"].map((tag) => (
                <span key={tag} className={p.personaTag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={p.personaSection}>
            <p className={p.personaSectionTitle}>Mental Model</p>
            <p className={p.personaQuote}>"Show me the best deals, and I'll decide where and when I want to go."</p>
          </div>

          <div className={p.personaSection}>
            <p className={p.personaSectionTitle}>Pain Points</p>
            <ul className={p.personaPoints}>
              <li>Overwhelmed by calendars, filters, and endless search results</li>
              <li>Unsure if platforms surface the real cheapest fares</li>
              <li>Deal-hunting feels like work, not discovery</li>
            </ul>
          </div>

          <div className={p.personaSection}>
            <p className={p.personaSectionTitle}>Design Implication</p>
            <p className={p.personaImplication}>Zomunk should work like a curated feed — quick, trustworthy, and inspiring — not another search-heavy tool.</p>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> research
          <span className={s.rule} />
        </h2>
        <p className={s.sectionSubhead}>Validating the discovery model</p>
        <div className={s.prose}>
          <p><strong>Heuristic evaluation</strong> of existing flight platforms showed how search-first flows bury flexible users under too many steps.</p>
          <p><strong>User walkthroughs</strong> with travelers like Ananya confirmed they wanted clarity — "just show me the cheapest deals I can book today."</p>
          <p><strong>Competitor scans:</strong> while platforms like Scott's Cheap Flights validated the appetite for curated deals, they lacked a clean, productized user experience.</p>
        </div>
        <blockquote className={s.callout}>Users wanted a simple journey: Discover → Select → Book.</blockquote>
      </section>

      {/* User Flow */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> user flow
          <span className={s.rule} />
        </h2>
        <p className={s.sectionSubhead}>Stripped down to three steps</p>
        <div className={s.prose}>
          <p>I stripped the product down to three steps, giving users a clean, guided journey instead of forcing them through complex search tools.</p>
        </div>

        <div className={s.steps} style={{ marginTop: 24 }}>
          {[
            { num: "01", title: "Discover curated deals", body: "A feed of the cheapest available routes, surfaced by price — not popularity or sponsored placement." },
            { num: "02", title: "Select a destination", body: "Users pick the deal that excites them, with route, savings, and expiry shown at a glance." },
            { num: "03", title: "Book directly with the airline", body: "A direct link to the airline's site — no middleman, no markup, full transparency." },
          ].map((step) => (
            <div key={step.num} className={s.step}>
              <span className={s.stepNum}>{step.num}</span>
              <div>
                <p className={s.stepTitle}>{step.title}</p>
                <p className={s.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Validation */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> validation
          <span className={s.rule} />
        </h2>
        <p className={s.sectionSubhead}>Early traction confirmed the hypothesis</p>
        <div className={s.prose}>
          <p>Travelers responded positively to the clarity — they instantly understood Zomunk's difference from traditional search tools.</p>
          <p>Flexible users shared that the curated feed saved them hours of search. The product removed a decision they didn't want to make.</p>
          <p>Organic traffic started growing around keywords tied to "cheap flight deals" rather than "date-specific booking" — signalling the audience was finding us through the right intent.</p>
        </div>
      </section>

      {/* New Design */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> new design
          <span className={s.rule} />
        </h2>
        <p className={s.sectionSubhead}>Deal discovery, simple and scannable</p>
        <div className={s.prose}>
          <p><strong>Deal cards</strong> surfaced the essentials — route, price, savings — at a glance. No noise, no filters to configure first.</p>
          <p><strong>Comparison elements</strong> highlighted the value of each deal without overwhelming users with data.</p>
          <p><strong>Direct booking links</strong> reassured users by sending them straight to the airline's site — no hidden fees, no Zomunk checkout.</p>
        </div>

        <div className={s.hero} style={{ marginTop: 28 }} />
      </section>

      {/* Outcomes */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> outcomes
          <span className={s.rule} />
        </h2>

        <div className={s.stats}>
          {[
            { value: "500K+", label: "MAU" },
            { value: "18.5K", label: "Daily Users" },
            { value: "1,000+", label: "Paid Users" },
            { value: "1.8K+", label: "Subscribers" },
          ].map(({ value, label }) => (
            <div key={label} className={s.stat}>
              <span className={s.statValue}>{value}</span>
              <span className={s.statLabel}>{label}</span>
            </div>
          ))}
        </div>

        <div className={s.prose}>
          <p>Users understood the product's value in seconds. Flexible travelers could reach a bookable deal faster than with any traditional search tool.</p>
          <p>Zomunk carved out a clear niche: not a flight search engine, but a discovery-first deal platform.</p>
        </div>
      </section>

      {/* Reflection */}
      <section className={s.section}>
        <h2 className={s.sectionHead}>
          <span className={s.slash}>/</span> reflection
          <span className={s.rule} />
        </h2>
        <div className={s.prose}>
          <p>Zomunk reinforced the importance of designing for a user's mental model, not just the industry standard. By replacing search with discovery, deal-hunting became effortless for flexible travelers who simply wanted the cheapest way to fly.</p>
          <p>The biggest lesson: removing a feature (the search box) was the product decision. Sometimes the right design is the one that takes something away.</p>
        </div>
      </section>

      <div className={s.divider} />

      <a href="/work/symmetry" className={s.next}>
        <span className={s.nextLabel}>Next project</span>
        <span className={s.nextTitle}>
          Improving AI responses by bringing user context into chat <i className="ph-bold ph-arrow-right" style={{ fontSize: 14 }} />
        </span>
      </a>

    </article>
  );
}
