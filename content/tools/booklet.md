---
hidden: true
name: "Booklet"
tagline: "Read more. Remember what you read."
description: "A reading companion that helps you collect highlights, surface them later, and actually retain what you've read."
platform: "iOS / macOS"
status: "In progress"
version: ""
color: "#2d1a4a"
url: null
image: null
builtWith: ["Swift", "SwiftUI", "CloudKit"]
features:
  - "Capture highlights from any book — physical or digital"
  - "Spaced-repetition surfacing so you don't forget"
  - "Clean reading log with cover art and progress tracking"
  - "Works offline, syncs quietly via iCloud"
next:
  - "Kindle highlight import"
  - "Daily highlight card (like a quote of the day, but yours)"
  - "Book recommendations based on your highlights"
changelog:
  - version: "0.2.0"
    date: "2026-04-01T09:00:00"
    notes:
      - "Core highlight capture flow working end-to-end"
      - "iCloud sync prototype running between iPhone and Mac"
      - "Book search via Open Library API"
  - version: "0.1.0"
    date: "2026-02-20T14:00:00"
    notes:
      - "Project started"
      - "Basic data model and SwiftUI scaffold"
---

## What it is

Booklet is a reading companion app for iOS and macOS. It lets you capture highlights from any book — whether you're reading on Kindle, a physical copy, or an ebook — and resurfaces them later using spaced repetition so you actually remember what you've read.

Most people read a book, enjoy it, and forget 90% of it within a month. Booklet is built around the idea that the value of reading compounds when you retain it.

## Why I'm building it

I've tried every reading app. Most of them are good at storing highlights and bad at surfacing them. The highlight graveyard problem: you capture something, it goes into a list, you never see it again.

The insight I'm building around is that retention isn't about storage — it's about timing. Show someone a highlight at the right moment (a few days after they captured it, then a week later, then a month) and it sticks. Booklet is essentially a spaced-repetition system where your own words and ideas are the flashcards.

## Status

Booklet is in active development. The core capture and sync flows are working. I'm currently building the spaced-repetition surfacing logic and the daily highlight experience.

If you want to follow along or be notified when it launches, check back here — I'll post updates as they happen.
