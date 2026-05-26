import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/work");

export interface WorkItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  video?: string;
  subtitle: string;
  link?: string;
  label?: string;
  aspectRatio?: string;
  draft: boolean;
  tags: string[];
  content: string;
}

export function getAllWorkItems(): Omit<WorkItem, "content">[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        image: (data.image as string) || "",
        video: (data.video as string) || undefined,
        subtitle: (data.subtitle as string) || "",
        link: (data.link as string) || undefined,
        label: (data.label as string) || undefined,
        aspectRatio: (data.aspectRatio as string) || undefined,
        draft: data.draft === true,
        tags: (data.tags as string[]) || [],
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getWorkItemBySlug(slug: string): WorkItem {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    image: (data.image as string) || "",
    subtitle: (data.subtitle as string) || "",
    link: (data.link as string) || undefined,
    draft: data.draft === true,
    tags: (data.tags as string[]) || [],
    content: content.trim(),
  };
}
