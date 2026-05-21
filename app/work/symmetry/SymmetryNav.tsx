"use client";

import { useEffect, useState } from "react";
import styles from "./SymmetryNav.module.css";

const sections = [
  { id: "overview",      label: "Overview" },
  { id: "process",       label: "My Process" },
  { id: "problem",       label: "The Problem" },
  { id: "challenge-01",  label: "Challenge 01" },
  { id: "solution",      label: "Solution" },
  { id: "onboarding",    label: "Onboarding" },
  { id: "challenge-02",  label: "Challenge 02" },
  { id: "outcomes",      label: "Outcomes" },
  { id: "cuts",          label: "Cuts" },
];

export default function SymmetryNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-15% 0px -75% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className={styles.nav}>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.link} ${active === id ? styles.active : ""}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
