import type { Metadata } from "next";
import { getAllWorkItems } from "@/lib/work";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies from Julian's product design work — AI tools, fintech platforms, crypto UX, and consumer apps.",
  alternates: { canonical: "https://macjulian.com/work" },
};

export default function WorkPage() {
  const articles = getAllWorkItems().filter((item) => !item.draft);
  return <WorkClient articles={articles} />;
}
