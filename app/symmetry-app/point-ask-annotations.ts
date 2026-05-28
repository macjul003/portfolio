export interface ElementAnnotation {
  label: string;
  shortDescription: string;
  designContext: string;
  suggestedQuestions: [string, string, string];
}

export const ANNOTATIONS: Record<string, ElementAnnotation> = {
  'sidebar-profile': {
    label: 'Workspace Switcher',
    shortDescription: 'Profile + workspace anchor at the top of the sidebar',
    designContext:
      "The workspace switcher follows the pattern established by Linear and Notion — keeping the user's identity and workspace anchor visible at all times. In Symmetry, workspaces map to separate knowledge bases (e.g. a personal workspace vs. a team one). Placing it top-left aligns with where users expect to orient themselves in any professional tool. The caret signals it's interactive without taking up space.",
    suggestedQuestions: [
      'Why is the profile at the top of the sidebar?',
      'What is a workspace in Symmetry?',
      'Why the dropdown caret?',
    ],
  },

  'sidebar-nav': {
    label: 'Navigation Menu',
    shortDescription: 'Home, Search, and AI as the three primary modes',
    designContext:
      "The three nav items map to the three modes users operate in: browsing (Home), finding (Search), and asking (AI). Keeping the nav shallow avoids the menu-heavy pattern of most productivity tools — depth creates anxiety for power users. The active item uses a filled icon weight to signal state without relying on colour alone, which helps with accessibility.",
    suggestedQuestions: [
      'Why only 3 nav items?',
      'Why these three as the primary destinations?',
      'How does the active state work visually?',
    ],
  },

  'sidebar-ai': {
    label: 'Ask Symmetry AI',
    shortDescription: 'AI chat as a first-class navigation destination',
    designContext:
      "Ask Symmetry AI is a primary nav item, not a floating widget, because conversational search is central to the product's value proposition. Treating it as a destination (rather than a bottom-right chat button) signals it's a serious tool, not an afterthought. Users who live in the sidebar don't need to break their flow to talk to the AI — it's one click away from wherever they are.",
    suggestedQuestions: [
      'Why is AI in the nav and not a floating button?',
      'How is this different from ChatGPT?',
      'What can you actually ask it?',
    ],
  },

  'sidebar-private': {
    label: 'Private Projects',
    shortDescription: 'Folder-style list of personal knowledge documents',
    designContext:
      "The Private section uses a document-list pattern over tabs or cards because Symmetry users manage many projects simultaneously. The dot indicator, truncated names, and overflow menu on hover are borrowed from tools like Linear and Notion to create a familiar, low-friction list. 'Private' signals this content is user-owned, distinct from a future 'Shared' section for team-visible documents.",
    suggestedQuestions: [
      "Why is it called 'Private'?",
      'Why a list and not cards?',
      'What does the three-dot menu do?',
    ],
  },

  'note-detail': {
    label: 'Note Detail Panel',
    shortDescription: 'The main reading and editing surface',
    designContext:
      "The center panel is the primary workspace. It follows a reading-first layout — title, metadata, then progressively-disclosed content — to reduce cognitive overhead when opening a knowledge document. The white background creates a clear contrast against the dashboard's gray surround, drawing the eye to the content. The rounded corners and shadow give it a card-like feel, grounding it as a distinct document surface.",
    suggestedQuestions: [
      'Why is the main content in the center?',
      'Why white background here specifically?',
      'Why so much vertical reading space?',
    ],
  },

  'note-tags': {
    label: 'Tag Pills',
    shortDescription: 'Topic tags shown above the note title',
    designContext:
      "Tags are the primary organisation mechanism in Symmetry, mapping to workspaces and themes the user cares about. Showing them above the title — before the user reads anything — lets them orient to the context before diving in. Pill shapes are scannable and compact. The light gray background keeps them legible without competing with the note's title for visual priority.",
    suggestedQuestions: [
      'Why are tags shown above the title?',
      'How are tags created and assigned?',
      'Why this pill visual style?',
    ],
  },

  'note-metadata': {
    label: 'Source Attribution',
    shortDescription: 'Where the content came from and when it was last updated',
    designContext:
      "Source attribution was one of the most important trust signals in Symmetry. Users needed to know whether content came from a ChatGPT export, a Claude conversation, or their own notes. The source avatar mimics profile chips in tools like Notion, keeping attribution visible without taking up space. Research showed that seeing the source significantly reduced hesitation at the inject step — making the system's reasoning visible mattered more than making it smarter.",
    suggestedQuestions: [
      'Why show the source of the content?',
      'What sources can Symmetry pull from?',
      "What does 'last updated' actually mean here?",
    ],
  },

  'note-sections': {
    label: 'Collapsible Sections',
    shortDescription: 'Expandable content blocks inside the note',
    designContext:
      "Collapsible sections apply progressive disclosure to dense AI-synthesized content. When Symmetry processes an imported chat export, it generates multiple synthesis blocks (overview, insights, capabilities, use cases). Showing all of them expanded is overwhelming. Defaulting to the first section open and collapsing the rest lets users get the summary immediately and dive deeper only when needed — respecting that not every reader wants every detail.",
    suggestedQuestions: [
      'Why are sections collapsible?',
      'How does Symmetry generate these sections?',
      'Why is the first one open by default?',
    ],
  },

  'timeline': {
    label: 'Evolution Timeline',
    shortDescription: 'A chronological history of how this document evolved',
    designContext:
      "The timeline borrows Git's version history concept and applies it to knowledge documents. Every AI synthesis event, manual edit, and insight gets logged as a timeline entry. The event types — Major Revision, Insight, Update, Creation — map to the magnitude of change. Colour-coding makes the type instantly scannable without needing to read the label. This panel was one of Symmetry's most distinctive features, and also the one that pushed the product into 'too complex for MVP' territory.",
    suggestedQuestions: [
      'Why track document history at all?',
      'What are the different event types?',
      'Why colour-code the timeline events?',
    ],
  },

  'timeline-input': {
    label: '"Tell or Ask" Input',
    shortDescription: 'A persistent text input anchored to the timeline',
    designContext:
      "The input at the bottom serves two modes: 'Tell' (add context directly to a note) and 'Ask' (query the AI about this specific document). Anchoring it to the bottom of the timeline panel keeps it within reach without interrupting the main reading surface. The '+' button was intended for file attachments, following the pattern users already know from Slack and messaging apps. The soft gray background distinguishes it as a persistent chrome element, not part of the scrollable content.",
    suggestedQuestions: [
      "What's the difference between 'tell' and 'ask'?",
      'Why is the input here rather than in the note panel?',
      'What does the + button do?',
    ],
  },

  'search-bar': {
    label: 'Search Bar',
    shortDescription: 'Global search across all notes and memories',
    designContext:
      "Search is positioned as a primary navigation method — power users should be able to jump anywhere in their knowledge base without browsing the sidebar. The top bar position (rather than sidebar) signals it's a workspace-level action, not a per-project one. 'Search memories...' as the placeholder reinforces Symmetry's core metaphor: your data isn't just files, it's a memory layer. The rounded pill shape gives it a lighter visual weight than a traditional search field.",
    suggestedQuestions: [
      'What can you actually search for?',
      "Why 'memories' in the placeholder text?",
      'Why is search at the top and not in the sidebar?',
    ],
  },

  'action-buttons': {
    label: 'Action Buttons',
    shortDescription: 'Notifications, History, and Settings — top right',
    designContext:
      "Three circular buttons, icon-only, tucked to the right. Notifications (Bell) surface AI activity and future collaborator events. History (Clock) resurfaces the full revision log — similar to how GitHub's history is separate from the current view. Settings (Gear) follows convention. Keeping them circular and to the right prevents them from competing with the content-heavy panels. Deliberate minimalism: they're there when you need them and invisible when you don't.",
    suggestedQuestions: [
      'What are the notifications for?',
      'What does the history button show?',
      'Why circular buttons specifically?',
    ],
  },
};
