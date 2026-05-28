import type { Metadata } from "next";
import styles from "./page.module.css";
import MotionDemos from "./MotionDemos";

export const metadata: Metadata = {
  title: "Motion Lab",
  description: "A playground for motion design and interactive UI experiments.",
  alternates: { canonical: "https://macjulian.com/motion-lab" },
};

export default function MotionLabPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Motion Lab</h1>
        <p className={styles.subtitle}>
          Micro-interactions and UI animations — click and hover to explore
        </p>
      </header>
      <MotionDemos />
    </div>
  );
}
