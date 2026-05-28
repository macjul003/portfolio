import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function readNowEntries(count = 5): string {
  const dir = path.join(process.cwd(), 'content/now');
  try {
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .sort()
      .reverse()
      .slice(0, count);

    return files.map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data, content } = matter(raw);
      return `### ${data.date ?? f.replace('.md', '')}\n${content.trim()}`;
    }).join('\n\n');
  } catch {
    return '';
  }
}

function readJournalEntries(): string {
  const dir = path.join(process.cwd(), 'content/journal');
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    return files.map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data, content } = matter(raw);
      return `### ${data.title} (${data.date})\n${content.trim()}`;
    }).join('\n\n');
  } catch {
    return '';
  }
}

export function buildPortfolioContext(): string {
  const journal = readJournalEntries();
  const now = readNowEntries();

  return `
## Full Journal Articles
${journal}

## Recent Activity (Now page — what Julian has been working on lately)
${now}

## Indie Apps / Side Projects
- **Page Editor** — A browser bookmarklet that makes any webpage editable. Tracks word-level diffs and exports structured ORIGINAL/EDITED pairs to paste into Claude. Built with React and TypeScript.
- **Pollution Tracker** — Native macOS SwiftUI menu bar app. Shows real-time AQI via a colour-coded menu bar icon. No dashboard, no noise. Available on GitHub.
- **Hangar** — AI aircraft image generator with real airline livery support. Describe a plane and livery, get a photorealistic render back.
- **Car Game** — Browser-based top-down racing game with procedurally generated tracks and a custom physics engine. Built with JavaScript Canvas API.
- **Chrome Activity Monitor** — Chrome extension that tracks browsing habits and delivers weekly productivity focus reports.
- **DayTasks** — Native macOS menu bar app for daily habits. Tracks streaks, sends gentle nudges, stays out of the way. Built with Swift and SwiftUI.
- **Booklet** — Write your resume in plain Markdown, export a pixel-perfect PDF. No proprietary formats, no lock-in. Built with Node.js.
- **Micro Interactions** — A collection of motion details that make interfaces feel alive. Live at micro-interactions-two.vercel.app.

## About (full text)
For the past 5 years, I've been designing products across AI, Fintech, and Travel, helping early-stage teams turn ambitious ideas into experiences that feel effortless and trustworthy.

I've been the first designer at multiple startups, owning everything from UX to brand. Whether simplifying how people invest, making flight discovery more intuitive, or helping users navigate AI-driven tools, my focus has always been the same: making complex things feel obvious.

How I Work: I start by mapping where things break. Before I design the happy path, I need to understand where users will get lost, what the system can't handle, and where trust is most fragile. That's usually where the real design problem lives. From there, I untangle. I define flows, build design languages, and stress-test decisions against edge cases, not just ideal ones. I think in systems because products that don't scale from the start rarely catch up later. I design fast, but I sweat the details that make experiences feel calm. The micro-interactions, the empty states, the error messages nobody wants to write — those are the moments that separate products people tolerate from ones they trust.

Beyond the work: When I'm not designing, I'm writing, building small side projects, or pulling apart products I admire to understand what makes them feel inevitable.

## Case Studies (detailed)
- **Symmetry AI** (Nov 2025 – Feb 2026) — Sole designer on an AI context engine. The product connects past chats, notes, and threads, then surfaces the right context in every AI prompt. Key work: onboarding flow, a "pill" injection UI that sits inside ChatGPT/Claude input boxes, a Side Panel for context review, and an import flow for existing chat exports. Team: 2 co-founders, 2 engineers.

## Symmetry Dashboard Design Rationale
The Symmetry dashboard is an interactive prototype built as the web companion to the core product (a Chrome extension). Key design decisions:

- **Left sidebar navigation**: Follows Linear/Notion convention — workspace switcher at top, three primary modes (Home, Search, Ask AI), then private project list. Three nav items map to the three modes users operate in: browsing, finding, and asking. Keeping it shallow avoids the menu-heavy pattern of most productivity tools.
- **Ask Symmetry AI in the nav**: AI is a first-class navigation destination, not a floating widget, because conversational search is central to the product's value. Treating it as a destination signals it's a serious tool.
- **Center note panel**: Reading-first layout — tags, title, metadata, then progressive content sections. White background creates contrast against the gray surround.
- **Collapsible sections**: Progressive disclosure for dense AI-synthesized content. Defaulting to first section open and collapsing the rest lets users get the summary immediately.
- **Source attribution**: One of the most important trust signals. Users needed to know whether content came from ChatGPT, Claude, or their own notes. Research showed that seeing the source significantly reduced hesitation at the inject step.
- **Evolution Timeline (right panel)**: Borrowed Git's version history concept applied to knowledge documents. Every AI synthesis event and manual edit gets logged. Colour-coded event types (Major Revision, Insight, Update, Creation) make type instantly scannable.
- **"Tell or Ask" input at bottom of timeline**: Two modes — 'Tell' adds context to a note, 'Ask' queries the AI about this specific document. Anchored at the bottom of the timeline panel.
- **Search bar at top**: Positioned as a workspace-level action (not sidebar) — power users should jump anywhere in their knowledge base without browsing. Placeholder "Search memories..." reinforces the core metaphor.
- **Circular action buttons**: Bell, History, Settings — deliberately minimal and to the right to avoid competing with content-heavy panels.
- **Why the dashboard didn't ship**: The team realigned the MVP around the pill (the Chrome extension). The dashboard was cut because it solved for a version of Symmetry that hadn't earned the right to exist yet — users needed to experience context injection first before they needed a sophisticated knowledge management workspace. The dashboard was right; the timing wasn't.
- **Ithaca / Options Trading** (Nov 2025) — Redesigned the options trading flow for retail investors. Simplified complex financial decisions into a clear step-by-step interface with real-time risk visualisation.
- **Claystack** (Jun 2023) — Designed onboarding for a liquid staking DeFi protocol. Reduced drop-off by reframing complex concepts through progressive disclosure.
- **Ajaib** (Aug 2025) — Designed a home experience that adapts to two investor archetypes: cautious beginners and confident traders.
`;
}
