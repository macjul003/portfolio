import type { Metadata } from "next";
import { getAllWorkItems } from "@/lib/work";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work — Julian",
};

export default function WorkPage() {
  const articles = getAllWorkItems().filter((item) => !item.draft);
  return <WorkClient articles={articles} />;
}
