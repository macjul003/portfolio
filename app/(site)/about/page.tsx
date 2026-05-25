import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h1 className={styles.name}>About me</h1>
      </header>

      <div className={styles.body}>
        <p>
          For the past 5 years, I've been designing products across AI, Fintech, and Travel,
          helping early-stage teams turn ambitious ideas into experiences that feel effortless
          and trustworthy.
        </p>
        <p>
          I've been the first designer at multiple startups, owning everything from UX to brand.
          Whether simplifying how people invest, making flight discovery more intuitive, or helping
          users navigate AI-driven tools, my focus has always been the same: making complex things
          feel obvious.
        </p>

        <h2 className={styles.subhead}>How I Work</h2>
        <p>
          I start by mapping where things break. Before I design the happy path, I need to
          understand where users will get lost, what the system can't handle, and where trust
          is most fragile. That's usually where the real design problem lives.
        </p>
        <p>
          From there, I untangle. I define flows, build design languages, and stress-test
          decisions against edge cases, not just ideal ones. I think in systems because products
          that don't scale from the start rarely catch up later.
        </p>
        <p>
          I design fast, but I sweat the details that make experiences feel calm. The
          micro-interactions, the empty states, the error messages nobody wants to write —
          those are the moments that separate products people tolerate from ones they trust.
        </p>

        <h2 className={styles.subhead}>Beyond the work</h2>
        <p>
          When I'm not designing, I'm writing, building small side projects, or pulling apart
          products I admire to understand what makes them feel inevitable.
        </p>
      </div>

      <div className={styles.photo}>
        <img src="/mac-photo.png" alt="Julian" className={styles.photoImg} />
      </div>

    </div>
  );
}
