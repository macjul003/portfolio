import type { Metadata } from "next";
import { getAllTools, getToolBySlug } from "@/lib/tools";
import { Check } from "iconoir-react";
import ToolChangelog from "./ToolChangelog";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return {
    title: `${tool.name} — Julian Samuel`,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const isWip = tool.status === "In progress";

  return (
    <div className={styles.page}>

      {/* Hero */}
      <div
        className={styles.hero}
        style={tool.image ? undefined : { background: tool.color }}
      >
        {tool.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tool.image} alt={tool.name} className={styles.heroImg} />
        )}
      </div>

      <div className={styles.inner}>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.badges}>
            {tool.platform && <span className={styles.platform}>{tool.platform}</span>}
            <span className={`${styles.status} ${isWip ? styles.statusWip : ""}`}>
              {tool.status}
            </span>
            {tool.version && <span className={styles.version}>v{tool.version}</span>}
          </div>

          <h1 className={styles.name}>{tool.name}</h1>
          <p className={styles.tagline}>{tool.tagline}</p>

          <div className={styles.actions}>
            {tool.bookmarklet ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <a href={tool.bookmarklet as any} className={styles.bookmarkletDrag} draggable>
                <span className={styles.dragHandle}>⠿</span>
                ✏️ Edit Page
              </a>
            ) : tool.url ? (
              <a href={tool.url} className={styles.ctaPrimary} target="_blank" rel="noopener">
                {tool.platform?.toLowerCase().includes("macos") || tool.platform?.toLowerCase().includes("ios")
                  ? "Download"
                  : "Try it"} &rarr;
              </a>
            ) : (
              <span className={styles.ctaDisabled}>
                {isWip ? "Coming soon" : "Link coming soon"}
              </span>
            )}
          </div>
        </header>

        {/* Bookmarklet install steps */}
        {tool.bookmarklet && (
          <section className={styles.section}>
            <ol className={styles.installSteps}>
              <li>
                <span className={styles.installNum}>1</span>
                <span>
                  Drag the button above to your bookmarks bar.
                  <span className={styles.installHint}>Bar hidden? <kbd className={styles.kbd}>Cmd/Ctrl</kbd> + <kbd className={styles.kbd}>Shift</kbd> + <kbd className={styles.kbd}>B</kbd></span>
                </span>
              </li>
              <li>
                <span className={styles.installNum}>2</span>
                <span>Go to any webpage and click <em>✏️ Edit Page</em> in your bar.</span>
              </li>
              <li>
                <span className={styles.installNum}>3</span>
                <span>Click any text and start typing your changes.</span>
              </li>
              <li>
                <span className={styles.installNum}>4</span>
                <span>Hit <strong>Copy changes</strong> in the toolbar, then paste into Claude.</span>
              </li>
            </ol>
          </section>
        )}

        {/* Features */}
        {tool.features.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Features</h2>
            <ul className={styles.featureList}>
              {tool.features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <Check className={styles.featureIcon} width={16} height={16} strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* README */}
        {tool.readmeHtml && (
          <section className={styles.section}>
            <div
              className={styles.readme}
              dangerouslySetInnerHTML={{ __html: tool.readmeHtml }}
            />
          </section>
        )}

        {/* Built with */}
        {tool.builtWith.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Built with</h2>
            <div className={styles.tagRow}>
              {tool.builtWith.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </section>
        )}

        {/* What's next */}
        {tool.next.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What&rsquo;s next</h2>
            <ul className={styles.nextList}>
              {tool.next.map((item) => (
                <li key={item} className={styles.nextItem}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Changelog */}
        {tool.changelog.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Changelog</h2>
            <ToolChangelog entries={tool.changelog} />
          </section>
        )}

      </div>
    </div>
  );
}
