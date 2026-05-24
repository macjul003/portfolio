---
title: "Git for Designers: Ship UI Without Breaking Things"
date: "2026-03-12"
image: "https://framerusercontent.com/images/R0MqIB9TVcnRWyQSaXnpPFCYJ4.jpeg"
subtitle: "You don't need to become a developer to use Git. You just need enough to collaborate confidently — make changes, save them, and get them into the product without stepping on anyone's work. That's what this guide is for."
draft: false
---

<h4>1. The Mental Model</h4>
<p>Forget the technical definitions. Here's Git in terms you already know:</p>
<ul>
  <li><p><strong>Repo</strong> — the project folder, but with full history of every change ever made</p></li>
  <li><p><strong>Branch</strong> — your own working copy, like duplicating a Figma file before editing it</p></li>
  <li><p><strong>Commit</strong> — a checkpoint, like hitting Save with a label attached</p></li>
  <li><p><strong>PR (Pull Request)</strong> — "hey team, I made changes, can someone review before we merge?"</p></li>
  <li><p><strong>Main</strong> — the live, production version. Never work directly here.</p></li>
</ul>

<h4>2. The Only Commands You Need</h4>
<p>No terminal theory. Just what each command does in practice.</p>
<pre><code>git clone &lt;url&gt;         # Download the project
git pull                # Get latest changes
git status              # See what you changed
git checkout -b &lt;name&gt;  # Create a branch
git add .               # Stage changes
git commit -m "..."     # Save a checkpoint
git push                # Upload to GitHub</code></pre>
<p>That's it. Seven commands cover 95% of your day-to-day.</p>

<h4>3. Your Daily Workflow</h4>
<p>Follow this every time you start working on something new.</p>
<p><strong>Step 1 — Pull the latest main</strong></p>
<pre><code>git checkout main
git pull</code></pre>
<p><strong>Step 2 — Create a feature branch</strong></p>
<pre><code>git checkout -b feature/update-hero-copy</code></pre>
<p><strong>Step 3 — Make your changes</strong> Edit the files you need — copy, spacing, colors, icons.</p>
<p><strong>Step 4 — Commit with a clear message</strong></p>
<pre><code>git add .
git commit -m "feat: update hero headline copy"</code></pre>
<p><strong>Step 5 — Push your branch</strong></p>
<pre><code>git push</code></pre>
<p><strong>Step 6 — Open a PR on GitHub</strong> Go to the repo on GitHub, click "Compare &amp; pull request", fill in what you changed, and submit for review.</p>

<h4>4. Naming Rules</h4>
<p>Good names help your whole team — especially devs reviewing your work.</p>
<p><strong>Branches</strong></p>
<pre><code>feature/button-hover-state
fix/nav-spacing-mobile
update/onboarding-copy</code></pre>
<p><strong>Commits</strong></p>
<pre><code>feat: add hover state to primary button
fix: correct padding on mobile nav
update: revise step 2 onboarding copy</code></pre>
<p>Why it matters: devs scan dozens of branches and commits a week. Clear names mean your work gets reviewed faster and merged with fewer questions.</p>

<h4>5. What Designers Will Actually Change</h4>
<p>These are safe to edit without worrying about breaking logic:</p>
<table>
  <tbody>
    <tr><th><p>File type</p></th><th><p>Examples</p></th><th><p>Risk</p></th></tr>
    <tr><td><p>Copy</p></td><td><p><code>.jsx</code>, <code>.html</code>, <code>.json</code> strings</p></td><td><p>✅ Safe</p></td></tr>
    <tr><td><p>Spacing tokens</p></td><td><p><code>tokens.json</code>, <code>variables.css</code></p></td><td><p>✅ Safe</p></td></tr>
    <tr><td><p>Colors</p></td><td><p>CSS variables, token files</p></td><td><p>✅ Safe</p></td></tr>
    <tr><td><p>Icons</p></td><td><p><code>.svg</code> files in <code>/assets</code></p></td><td><p>✅ Safe</p></td></tr>
    <tr><td><p>Images</p></td><td><p><code>/public</code> or <code>/assets</code> folder</p></td><td><p>✅ Safe</p></td></tr>
    <tr><td><p>Simple CSS</p></td><td><p><code>styles.css</code>, <code>.module.css</code></p></td><td><p>✅ Safe</p></td></tr>
    <tr><td><p>Component logic</p></td><td><p><code>.js</code>, <code>.ts</code> files</p></td><td><p>⚠️ Ask first</p></td></tr>
    <tr><td><p>Config files</p></td><td><p><code>package.json</code>, <code>.env</code></p></td><td><p>🚫 Don't touch</p></td></tr>
  </tbody>
</table>
<p>When in doubt, ask a dev before editing an unfamiliar file.</p>

<h4>6. Merge Conflicts (Designer Version)</h4>
<p><strong>What it means:</strong> two people edited the same file, and Git doesn't know which version to keep.</p>
<p><strong>When it happens:</strong> usually when you've been on a branch for a while and main has moved on.</p>
<p><strong>VS Code</strong></p>
<ol>
  <li><p>Open the conflicted file — VS Code highlights it in red in the sidebar</p></li>
  <li><p>You'll see two versions: <strong>Current Change</strong> (yours) and <strong>Incoming Change</strong> (theirs)</p></li>
  <li><p>Click <strong>Accept Current</strong>, <strong>Accept Incoming</strong>, or <strong>Accept Both</strong></p></li>
  <li><p>Save the file, then stage and commit:</p></li>
</ol>
<pre><code>git add .
git commit -m "fix: resolve merge conflict on hero component"</code></pre>
<p>Still unsure? Ping a dev — conflicts are normal and nothing to panic about.</p>

<h4>7. PR Etiquette</h4>
<p>A good PR gets reviewed and merged faster. Here's the formula:</p>
<ul>
  <li><p><strong>Keep it small</strong> — one feature or fix per PR, not a week's worth of changes</p></li>
  <li><p><strong>Add a screenshot</strong> — show before and after, especially for visual changes</p></li>
  <li><p><strong>Describe what changed</strong> — one or two sentences is enough: "Updated the primary button hover state to match the new design system spec"</p></li>
</ul>
<p>Small, clear PRs are a gift to your team.</p>

<h4>8. Design Tokens Workflow</h4>
<p>If your team uses design tokens, here's the full loop:</p>
<pre><code>Figma (design) → tokens.json (export) → codebase (paste/update) → commit → PR → merge → live</code></pre>
<pre><code>git checkout -b update/color-tokens
# paste updated tokens.json into the repo
git add tokens.json
git commit -m "update: sync color tokens from Figma"
git push
# open PR</code></pre>
<p>Ask your dev team where token files live and whether there's an automated export plugin set up.</p>

<h4>9. Do / Don't</h4>
<table>
  <tbody>
    <tr><th><p>Do</p></th><th><p>Don't</p></th></tr>
    <tr><td><p>Pull before starting work</p></td><td><p>Push directly to main</p></td></tr>
    <tr><td><p>One feature per branch</p></td><td><p>Bundle multiple changes in one PR</p></td></tr>
    <tr><td><p>Write descriptive commit messages</p></td><td><p>Commit with "fix" or "updates"</p></td></tr>
    <tr><td><p>Ask before editing unfamiliar files</p></td><td><p>Edit config or logic files alone</p></td></tr>
    <tr><td><p>Add a screenshot to your PR</p></td><td><p>Open a PR without context</p></td></tr>
  </tbody>
</table>

<h4>10. Tool Setup</h4>
<p>You don't have to live in the terminal. <strong>GitHub Desktop</strong> (<a href="https://desktop.github.com/">desktop.github.com</a>) gives you a visual interface for everything — clone, commit, push, open a PR — with no commands. <strong>VS Code</strong> also has built-in Git controls in the left sidebar if you're already coding there.</p>

<h4>11. Recovery Guide (Panic Buttons)</h4>
<p>Something went wrong? Here's how to fix the most common situations.</p>
<p><strong>Undo your last commit (keep the changes)</strong></p>
<pre><code>git reset --soft HEAD~1</code></pre>
<p><strong>Discard all changes to a file</strong></p>
<pre><code>git checkout -- &lt;filename&gt;</code></pre>
<p><strong>Delete a branch you no longer need</strong></p>
<pre><code>git branch -d feature/old-branch</code></pre>
<p><strong>Accidentally worked on main?</strong></p>
<pre><code>git checkout -b feature/my-actual-branch
# your changes move with you</code></pre>
<p>The golden rule: as long as you haven't pushed to main, almost anything is fixable.</p>

<h4>12. Your First 30-Minute Exercise</h4>
<p>The fastest way to learn Git is to use it on something real. Try this:</p>
<ol>
  <li><p>Clone a repo (ask a dev for a safe practice one, or create your own on GitHub)</p></li>
  <li><p>Create a branch: <code>git checkout -b practice/your-name</code></p></li>
  <li><p>Open any <code>.html</code> or content file and change a single word</p></li>
  <li><p>Stage and commit: <code>git add . &amp;&amp; git commit -m "feat: test edit"</code></p></li>
  <li><p>Push: <code>git push</code></p></li>
  <li><p>Open a PR on GitHub</p></li>
  <li><p>Merge it yourself</p></li>
  <li><p>See the change live (or in preview)</p></li>
</ol>
<p>One full loop. That's the whole thing. Once you've done it once, it stops feeling scary.</p>
<p>Git is a collaboration tool, not a developer-only tool. The more designers speak the language, the faster great design ships.</p>
