import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const contentDir = path.join(process.cwd(), "content/journal");

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

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export function getAllArticles(): Omit<Article, "content">[] {
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
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getArticleBySlug(slug: string): Article {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    content: marked.parse(content) as string,
  };
}
