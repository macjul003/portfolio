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
      body: "This note captures a comprehensive growth strategy for Base0, an AI-native shared memory layer designed to enable seamless context retention, transfer, and retrieval across multiple generative AI platforms (ChatGPT, Cursor, Claude, Gemini, VS Code, etc.).",
    },
    {
      title: "Feature Capabilities & Purpose",
      items: [
        "Persistent memory between chats and tools",
        "Seamless handoff between users, AI agents, and team members",
        "Unified knowledge mapping to eliminate repetitive prompting",
        "Context detection and automatic injection before prompt execution",
        "Visual memory mapping dashboard (graph/timeline view)",
        "Team-shared memory spaces with permission levels",
        "AI-aware context injection with transparency and trust",
        "Chrome/Brave and VS Code extensions",
      ],
    },
    {
      title: "User Goals & Use Cases",
      items: [
        "Quick finding and resuming past AI conversations",
        "Confident, transparent context injection into AI prompts",
        "Enhanced team collaboration and workflow continuity",
        "Personal knowledge mapping, documentation automation, agent memory layers",
        "Visual context management (memory maps, timelines)",
        "Privacy, compliance, and data security",
      ],
    },
  ],
};

export const timeline: TimelineEvent[] = [
  {
    type: "Major Revision",
    date: "Tuesday, Sep 15",
    detail: "Introduced adaptive components for agent feedback loops.",
  },
  {
    type: "Insight",
    date: "Tuesday, Sep 15",
    detail: "Lorem Ipsum here explaining the insight as a short form text.",
    ref: {
      title: "Reference to new update from Claude",
      body: "",
    },
  },
  {
    type: "Update",
    date: "Friday, Sep 5",
    detail: 'Users respond faster to agent motion cues than static icons." (from internal test).',
  },
  {
    type: "Creation",
    date: "Thursday, May 8",
    detail: "First draft of DS principles (clarity, abstraction, focus on AI interactions).",
  },
  {
    type: "Update",
    date: "Friday, Sep 5",
    detail: 'Users respond faster to agent motion cues than static icons." (from internal test).',
  },
];
