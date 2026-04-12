import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const contentDir = path.join(process.cwd(), "content/case-studies");

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

export interface CaseStudySection {
  heading: string;
  contentHtml: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  date: string;
  description: string;
  client: string;
  role: string;
  tags: string[];
  intro: string;
  sections: CaseStudySection[];
}

export function getAllCaseStudies(): Omit<CaseStudy, "intro" | "sections">[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        client: data.client ?? "",
        role: data.role ?? "",
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

function parseMarkdownSections(markdown: string): {
  intro: string;
  sections: CaseStudySection[];
} {
  const h2Regex = /^## (.+)$/gm;
  const matches: { heading: string; index: number }[] = [];
  let match;

  while ((match = h2Regex.exec(markdown)) !== null) {
    matches.push({ heading: match[1], index: match.index });
  }

  if (matches.length === 0) {
    return { intro: marked.parse(markdown) as string, sections: [] };
  }

  const introMd = markdown.slice(0, matches[0].index).trim();
  const intro = introMd ? (marked.parse(introMd) as string) : "";

  const sections: CaseStudySection[] = matches.map((m, i) => {
    const bodyStart = m.index + `## ${m.heading}\n`.length;
    const bodyEnd = i + 1 < matches.length ? matches[i + 1].index : markdown.length;
    const bodyMd = markdown.slice(bodyStart, bodyEnd).trim();
    return {
      heading: m.heading,
      contentHtml: marked.parse(bodyMd) as string,
    };
  });

  return { intro, sections };
}

export function getCaseStudyBySlug(slug: string): CaseStudy {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  const { intro, sections } = parseMarkdownSections(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    client: data.client ?? "",
    role: data.role ?? "",
    tags: data.tags ?? [],
    intro,
    sections,
  };
}
