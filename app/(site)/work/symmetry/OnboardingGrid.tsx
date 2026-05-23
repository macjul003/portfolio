"use client";

import { useState, useEffect, useCallback } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./OnboardingGrid.module.css";

const images = [
  { src: "/case-studies/symmetry/onboarding-1.png", alt: "Onboarding step 1" },
  { src: "/case-studies/symmetry/onboarding-2.png", alt: "Onboarding step 2" },
  { src: "/case-studies/symmetry/onboarding-3.png", alt: "Onboarding step 3" },
  { src: "/case-studies/symmetry/onboarding-4.png", alt: "Onboarding step 4" },
];

export default function OnboardingGrid() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i != null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setOpen((i) => (i != null && i < images.length - 1 ? i + 1 : i)), []);

  useEffect(() => {
    if (open === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <button key={i} className={styles.thumb} onClick={() => setOpen(i)}>
            <img src={img.src} alt={img.alt} className={styles.thumbImg} />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageWrap}>
              {open > 0 && (
                <button className={styles.navPrev} onClick={prev} aria-label="Previous">
                  <CaretLeft size={28} weight="bold" />
                </button>
              )}
              <img
                src={images[open].src}
                alt={images[open].alt}
                className={styles.image}
              />
              {open < images.length - 1 && (
                <button className={styles.navNext} onClick={next} aria-label="Next">
                  <CaretRight size={28} weight="bold" />
                </button>
              )}
            </div>
            <p className={styles.counter}>{open + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
