---
name: "DayTracker"
tagline: "Stay on top of your day, without thinking about it."
description: "A macOS menu bar app for daily task management. Tracks streaks, surfaces missed tasks, and shows a 16-week heatmap — designed to stay out of your way."
platform: "macOS"
status: "Live"
version: "1.3.0"
color: "#1a1a2e"
url: null
image: null
builtWith: ["Swift", "SwiftUI", "macOS"]
features:
  - "Lives in your menu bar — never in your way"
  - "16-week heatmap to visualise consistency over time"
  - "Missed tasks surface automatically at next launch"
  - "Streak counter that resets cleanly each day"
  - "No account, no sync, no noise — just your tasks"
next:
  - "iCloud sync across devices"
  - "Recurring tasks support"
  - "Flexible reminders (not just time-based)"
changelog:
  - version: "1.3.0"
    date: "2026-04-10T14:30:00"
    notes:
      - "Added 16-week heatmap view to the streak panel"
      - "Missed tasks from previous sessions now resurface on next launch"
      - "Reduced memory footprint by ~30%"
  - version: "1.2.0"
    date: "2026-03-01T09:15:00"
    notes:
      - "Streak tracking with daily counter"
      - "Menu bar icon changes state — idle, active, and all-done"
  - version: "1.1.0"
    date: "2026-02-10T11:00:00"
    notes:
      - "Task reordering via drag and drop"
      - "Fixed a bug where completed tasks weren't persisting after restart"
  - version: "1.0.0"
    date: "2026-01-15T18:00:00"
    notes:
      - "Initial release"
      - "Basic task list with menu bar integration"
      - "Lightweight local persistence"
---

## What it is

DayTracker is a macOS app that lives quietly in your menu bar. Click it, add your tasks for the day, check them off. That's it.

It was built to solve a specific frustration: every task manager I tried was either too heavy (projects, labels, due dates, integrations) or too simple to be useful. I wanted something that matched how I actually think about my day — a short list, done by evening, reset tomorrow.

## Why I built it

Most productivity tools are built around the assumption that you have a backlog. DayTracker assumes you don't. You wake up, you decide what matters today, and you do it. Tomorrow, you decide again.

The streak mechanic isn't about gamification. It's a quiet signal — a way to see at a glance whether you've been consistent without having to think about it. The heatmap does the same thing at a longer timescale: 16 weeks of context in a single view.

The "missed tasks resurface" feature came from a real pattern. If you don't finish something and close the app, it's gone. DayTracker brings it back the next time you open it, so nothing slips through because of a bad day.

## Design principles

**Invisible until needed.** The app lives in your menu bar and gets out of the way. No dock icon, no splash screen, no mandatory onboarding.

**Day-scoped by default.** Every task belongs to today. There's no backlog by design — if something didn't happen, DayTracker resurfaces it tomorrow rather than burying it in a list you'll never look at.

**Local first.** No account required. Your data lives on your machine.
