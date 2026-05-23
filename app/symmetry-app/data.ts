export interface NoteSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface Note {
  title: string;
  tags: string[];
  source: string;
  lastUpdated: string;
  created: string;
  sections: NoteSection[];
}

export interface TimelineRef {
  title: string;
  body: string;
}

export interface TimelineEvent {
  type: 'Major Revision' | 'Insight' | 'Update' | 'Creation';
  date: string;
  detail: string;
  ref?: TimelineRef;
}

export const note: Note = {
  title: "Growth Strategy for Base0",
  tags: ["Symmetry", "Growth"],
  source: "ChatGPT",
  lastUpdated: "12 mins ago",
  created: "14 Aug 2024",
  sections: [
    {
      title: "Overview",
      body: "Base0 is an AI-native shared memory layer designed to enable seamless knowledge transfer across products and teams. The growth strategy focuses on developer-led adoption through open APIs, viral team-based usage patterns, and a freemium model with an enterprise upsell path.",
    },
    {
      title: "Feature Capabilities & Purpose",
      items: [
        "Persistent memory across AI sessions and tools",
        "Team-scoped knowledge graphs with access controls",
        "Automatic summarisation and deduplication of notes",
        "API-first design for third-party integrations",
        "Real-time sync across devices and collaborators",
        "Versioned evolution tracking for every memory item",
      ],
    },
    {
      title: "User Goals & Use Cases",
      items: [
        "Engineers want context continuity across long-running projects",
        "Founders use it to keep strategy docs synced with AI assistants",
        "Teams share onboarding knowledge without manual maintenance",
        "Researchers track evolving hypotheses over time",
        "Product managers store and query competitive intelligence",
      ],
    },
  ],
};

export const timeline: TimelineEvent[] = [
  {
    type: "Major Revision",
    date: "Sep 15",
    detail: "Restructured growth pillars to prioritise developer-led adoption over direct sales outreach. Reordered sections to lead with ICP definition.",
  },
  {
    type: "Insight",
    date: "Sep 15",
    detail: "Team-based memory creates stronger retention hooks than individual accounts — switching cost scales with team size.",
    ref: {
      title: "Network Effect Hypothesis",
      body: "Each new team member who joins increases the value of the shared memory for all existing members, creating organic expansion revenue.",
    },
  },
  {
    type: "Update",
    date: "Sep 5",
    detail: "Added competitive analysis section comparing Base0 to Notion, Mem, and Rewind. Identified memory persistence as the key differentiator.",
  },
  {
    type: "Creation",
    date: "May 8",
    detail: "Initial strategy document created from a ChatGPT conversation exploring B2B go-to-market options for Base0.",
  },
  {
    type: "Update",
    date: "Sep 5",
    detail: "Refined ideal customer profile to focus on early-stage startups with fewer than 50 engineers already using AI coding tools daily.",
  },
];
