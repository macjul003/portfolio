---
title: "Git for Designers: Ship UI Without Breaking Things"
date: "2026-02-22"
description: "You don't need to become a developer to use Git. Just enough to collaborate confidently — make changes, save them, and ship."
---

You don't need to become a developer to use Git. You just need enough to collaborate confidently — make changes, save them, and get them into the product without stepping on anyone's work. That's what this guide is for.

---

## 1. The Mental Model

Forget the technical definitions. Here's Git in terms you already know:

- **Repo** — the project folder, but with full history of every change ever made
- **Branch** — your own working copy, like duplicating a Figma file before editing it
- **Commit** — a checkpoint, like hitting Save with a label attached
- **PR (Pull Request)** — "hey team, I made changes, can someone review before we merge?"
- **Main** — the live, production version. Never work directly here.

---

## 2. The Only Commands You Need

No terminal theory. Just what each command does in practice.

```bash
git clone <url>         # Download the project
git pull                # Get latest changes
git status              # See what you changed
git checkout -b <name>  # Create a branch
git add .               # Stage changes
git commit -m "..."     # Save a checkpoint
git push                # Upload to GitHub
```

That's it. Seven commands cover 95% of your day-to-day.

---

## 3. Your Daily Workflow

Follow this every time you start working on something new.

**Step 1 — Pull the latest main**
```bash
git checkout main
git pull
```

**Step 2 — Create a feature branch**
```bash
git checkout -b feature/update-hero-copy
```

**Step 3 — Make your changes**
Edit the files you need — copy, spacing, colors, icons.

**Step 4 — Commit with a clear message**
```bash
git add .
git commit -m "feat: update hero headline copy"
```

**Step 5 — Push your branch**
```bash
git push
```

**Step 6 — Open a PR on GitHub**
Go to the repo on GitHub, click "Compare & pull request", fill in what you changed, and submit for review.

---

## 4. Naming Rules

Good names help your whole team — especially devs reviewing your work.

**Branches**
```
feature/button-hover-state
fix/nav-spacing-mobile
update/onboarding-copy
```

**Commits**
```
feat: add hover state to primary button
fix: correct padding on mobile nav
update: revise step 2 onboarding copy
```

Why it matters: devs scan dozens of branches and commits a week. Clear names mean your work gets reviewed faster and merged with fewer questions.

---

## 5. What Designers Will Actually Change

These are safe to edit without worrying about breaking logic:

| File type | Examples | Risk |
|---|---|---|
| Copy | `.jsx`, `.html`, `.json` strings | ✅ Safe |
| Spacing tokens | `tokens.json`, `variables.css` | ✅ Safe |
| Colors | CSS variables, token files | ✅ Safe |
| Icons | `.svg` files in `/assets` | ✅ Safe |
| Images | `/public` or `/assets` folder | ✅ Safe |
| Simple CSS | `styles.css`, `.module.css` | ✅ Safe |
| Component logic | `.js`, `.ts` files | ⚠️ Ask first |
| Config files | `package.json`, `.env` | 🚫 Don't touch |

When in doubt, ask a dev before editing an unfamiliar file.

---

## 6. Merge Conflicts (Designer Version)

**What it means:** two people edited the same file, and Git doesn't know which version to keep.

**When it happens:** usually when you've been on a branch for a while and main has moved on.

**VS Code**
1. Open the conflicted file — VS Code highlights it in red in the sidebar
2. You'll see two versions: **Current Change** (yours) and **Incoming Change** (theirs)
3. Click **Accept Current**, **Accept Incoming**, or **Accept Both**
4. Save the file, then stage and commit:
```bash
git add .
git commit -m "fix: resolve merge conflict on hero component"
```

Still unsure? Ping a dev — conflicts are normal and nothing to panic about.

---

## 7. PR Etiquette

A good PR gets reviewed and merged faster. Here's the formula:

- **Keep it small** — one feature or fix per PR, not a week's worth of changes
- **Add a screenshot** — show before and after, especially for visual changes
- **Describe what changed** — one or two sentences is enough: "Updated the primary button hover state to match the new design system spec"

Small, clear PRs are a gift to your team.

---

## 8. Design Tokens Workflow

If your team uses design tokens, here's the full loop:

```
Figma (design) → tokens.json (export) → codebase (paste/update) → commit → PR → merge → live
```

```bash
git checkout -b update/color-tokens
# paste updated tokens.json into the repo
git add tokens.json
git commit -m "update: sync color tokens from Figma"
git push
# open PR
```

Ask your dev team where token files live and whether there's an automated export plugin set up.

---

## 9. Do / Don't

| Do | Don't |
|---|---|
| Pull before starting work | Push directly to main |
| One feature per branch | Bundle multiple changes in one PR |
| Write descriptive commit messages | Commit with "fix" or "updates" |
| Ask before editing unfamiliar files | Edit config or logic files alone |
| Add a screenshot to your PR | Open a PR without context |

---

## 10. Tool Setup

You don't have to live in the terminal. **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)) gives you a visual interface for everything — clone, commit, push, open a PR — with no commands. **VS Code** also has built-in Git controls in the left sidebar if you're already coding there.

---

## 11. Recovery Guide (Panic Buttons)

Something went wrong? Here's how to fix the most common situations.

**Undo your last commit (keep the changes)**
```bash
git reset --soft HEAD~1
```

**Discard all changes to a file**
```bash
git checkout -- <filename>
```

**Delete a branch you no longer need**
```bash
git branch -d feature/old-branch
```

**Accidentally worked on main?**
```bash
git checkout -b feature/my-actual-branch
# your changes move with you
```

The golden rule: as long as you haven't pushed to main, almost anything is fixable.

---

## 12. Your First 30-Minute Exercise

The fastest way to learn Git is to use it on something real. Try this:

1. Clone a repo (ask a dev for a safe practice one, or create your own on GitHub)
2. Create a branch: `git checkout -b practice/your-name`
3. Open any `.html` or content file and change a single word
4. Stage and commit: `git add . && git commit -m "feat: test edit"`
5. Push: `git push`
6. Open a PR on GitHub
7. Merge it yourself
8. See the change live (or in preview)

One full loop. That's the whole thing. Once you've done it once, it stops feeling scary.

---

Git is a collaboration tool, not a developer-only tool. The more designers speak the language, the faster great design ships.
