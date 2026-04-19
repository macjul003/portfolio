import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import { Book, Code, Leaf, Timer } from "iconoir-react";
import type { SVGProps } from "react";
import styles from "./page.module.css";

type IconComponent = React.ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

const TOOL_ICONS: Record<string, IconComponent> = {
  booklet: Book,
  "page-editor": Code,
  "pollution-tracker": Leaf,
  daytracker: Timer,
};

export const metadata: Metadata = {
  title: "Tools — Julian Samuel",
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.heading}>Tools</h1>
          <p className={styles.subheading}>
            Things I&rsquo;ve built for myself — and made available for anyone.
          </p>
        </header>

        <ul className={styles.list}>
          {tools.map((tool) => {
            const Icon = TOOL_ICONS[tool.slug];
            const isLive = tool.status === "Live";
            const isWip = tool.status === "In progress";
            return (
              <li key={tool.slug}>
                <a href={`/tools/${tool.slug}`} className={styles.item}>
                  <div
                    className={styles.cover}
                    style={{
                      background: `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}99 100%)`,
                    }}
                  >
                    {Icon && <Icon className={styles.coverIcon} width={36} height={36} strokeWidth={1.25} />}
                  </div>
                  <div className={styles.body}>
                    <div className={styles.top}>
                      <div className={styles.meta}>
                        {tool.platform && (
                          <span className={styles.platform}>{tool.platform}</span>
                        )}
                        <span className={`${styles.status} ${isLive ? styles.statusLive : ""} ${isWip ? styles.statusWip : ""}`}>
                          {isLive && <span className={styles.liveDot} />}
                          {tool.status}
                        </span>
                      </div>
                      <span className={styles.cta}>View</span>
                    </div>
                    <h2 className={styles.name}>{tool.name}</h2>
                    <p className={styles.desc}>{tool.description}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
