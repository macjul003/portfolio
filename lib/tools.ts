import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const contentDir = path.join(process.cwd(), "content/tools");

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

export interface ChangelogEntry {
  version: string;
  date: string; // ISO datetime string e.g. "2026-04-10T14:30:00"
  notes: string[];
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  platform: string;
  status: string;
  version: string;
  color: string;
  url: string | null;
  image: string | null;
  bookmarklet: string | null;
  builtWith: string[];
  features: string[];
  next: string[];
  changelog: ChangelogEntry[];
  readmeHtml: string;
}

export type ToolSummary = Omit<Tool, "readmeHtml" | "changelog" | "features" | "next" | "builtWith">;

export function getAllTools(): ToolSummary[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
      const { data } = matter(raw);

      if (data.hidden) return null;
      return {
        slug,
        name: data.name ?? slug,
        tagline: data.tagline ?? "",
        description: data.description ?? "",
        platform: data.platform ?? "",
        status: data.status ?? "Live",
        version: data.version ?? "",
        color: data.color ?? "#d4cfc9",
        url: data.url ?? null,
        image: data.image ?? null,
        bookmarklet: data.bookmarklet ?? null,
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getToolBySlug(slug: string): Tool {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    name: data.name ?? slug,
    tagline: data.tagline ?? "",
    description: data.description ?? "",
    platform: data.platform ?? "",
    status: data.status ?? "Live",
    version: data.version ?? "",
    color: data.color ?? "#d4cfc9",
    url: data.url ?? null,
    image: data.image ?? null,
    bookmarklet: data.bookmarklet ?? null,
    builtWith: data.builtWith ?? [],
    features: data.features ?? [],
    next: data.next ?? [],
    changelog: data.changelog ?? [],
    readmeHtml: marked.parse(content) as string,
  };
}
