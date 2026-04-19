---
name: "Page Editor"
tagline: "Edit any webpage, copy your changes, paste to Claude."
description: "A browser bookmarklet that makes any webpage editable. Click any text, type your changes, then export a clean before/after diff to paste into Claude."
platform: "Browser"
status: "Live"
version: "1.0.0"
color: "#1c1410"
url: null
image: null
bookmarklet: 'javascript:(function()%7Bif(window.__pgEd)%7Breturn%7Dwindow.__pgEd%3D1%3Bvar%20orig%3Dnew%20Map()%3Bdocument.body.contentEditable%3D%27true%27%3Bdocument.designMode%3D%27on%27%3Bfunction%20walk(n)%7Bif(n.nodeType%3D%3D%3D3%26%26n.nodeValue.trim())%7Borig.set(n%2Cn.nodeValue)%7Delse%20if(n.nodeType%3D%3D%3D1)%7Bfor(var%20i%3D0%3Bi%3Cn.childNodes.length%3Bi%2B%2B)walk(n.childNodes%5Bi%5D)%7D%7Dwalk(document.body)%3Bvar%20bar%3Ddocument.createElement(%27div%27)%3Bbar.style.cssText%3D%27position%3Afixed%3Btop%3A0%3Bleft%3A0%3Bright%3A0%3Bbackground%3A%231a1a1a%3Bcolor%3A%23fff%3Bpadding%3A10px%2016px%3Bfont%3A14px%20-apple-system%2Csans-serif%3Bz-index%3A2147483647%3Bdisplay%3Aflex%3Bgap%3A12px%3Balign-items%3Acenter%3Bbox-shadow%3A0%204px%2012px%20rgba(0%2C0%2C0%2C.15)%27%3Bbar.contentEditable%3D%27false%27%3Bbar.innerHTML%3D%27%3Cspan%20style%3D%22flex%3A1%22%3E%E2%9C%8F%EF%B8%8F%20Edit%20mode%20on%20%E2%80%94%20click%20any%20text%20to%20change%20it%3C%2Fspan%3E%3Cbutton%20id%3D%22pgCopy%22%20style%3D%22background%3A%23c96442%3Bcolor%3A%23fff%3Bborder%3A0%3Bpadding%3A6px%2014px%3Bborder-radius%3A6px%3Bfont-weight%3A500%3Bcursor%3Apointer%22%3ECopy%20changes%3C%2Fbutton%3E%3Cbutton%20id%3D%22pgDone%22%20style%3D%22background%3Atransparent%3Bcolor%3A%23fff%3Bborder%3A1px%20solid%20%23555%3Bpadding%3A6px%2012px%3Bborder-radius%3A6px%3Bcursor%3Apointer%22%3EExit%3C%2Fbutton%3E%27%3Bdocument.body.appendChild(bar)%3Bdocument.body.style.paddingTop%3D(parseInt(getComputedStyle(document.body).paddingTop)%2B44)%2B%27px%27%3Bdocument.getElementById(%27pgCopy%27).onclick%3Dfunction()%7Bvar%20diffs%3D%5B%5D%3Borig.forEach(function(old%2Cnode)%7Bvar%20cur%3Dnode.nodeValue%3Bif(cur!%3D%3Dold)%7Bdiffs.push(%27---%20ORIGINAL%20---%5Cn%27%2Bold.trim()%2B%27%5Cn---%20EDITED%20---%5Cn%27%2Bcur.trim())%7D%7D)%3Bif(!diffs.length)%7Balert(%27No%20changes%20yet.%27)%3Breturn%7Dvar%20out%3D%27I%20edited%20text%20on%20%27%2Blocation.href%2B%27.%20Here%20are%20my%20changes%3A%5Cn%5Cn%27%2Bdiffs.join(%27%5Cn%5Cn%27)%3Bnavigator.clipboard.writeText(out).then(function()%7Bthis.textContent%3D%27%E2%9C%93%20Copied!%27%3B%7D.bind(this))%7D%3Bdocument.getElementById(%27pgDone%27).onclick%3Dfunction()%7Bdocument.body.contentEditable%3D%27false%27%3Bdocument.designMode%3D%27off%27%3Bbar.remove()%3Bwindow.__pgEd%3D0%7D%7D)()'
builtWith: ["Vanilla JS", "Bookmarklet", "Clipboard API"]
features:
  - "Makes any webpage fully editable with one click"
  - "Tracks every text change automatically in the background"
  - "Exports a clean before/after diff to your clipboard"
  - "Works on any site. No extension, no install, no account"
  - "Resets on page refresh. Nothing stored server-side"
next:
  - "Style and layout editing, not just text"
  - "Image swap support"
  - "Screenshot bundled with the exported diff"
changelog:
  - version: "1.0.0"
    date: "2026-04-15T12:00:00"
    notes:
      - "Initial release"
      - "Full-page text editing via contentEditable and designMode"
      - "Before/after diff copied to clipboard with page URL"
      - "Floating toolbar with Copy changes and Exit"
---

## What it is

Page Editor is a browser bookmarklet. Drag it to your bookmarks bar once, then click it on any page. Every word becomes editable. Click a headline, retype it. Click a paragraph, rewrite it. When you're done, hit "Copy changes" and it exports every edit as a clean before/after diff you can paste straight into Claude.

No browser extension. No login. No server. It runs entirely in your tab.

## Why I built it

Most feedback loops between a page and Claude are slow. You describe what you want changed, Claude rewrites it, you compare, you paste it back. It works, but it's indirect. You're narrating edits rather than making them.

Page Editor flips that. You make the edits directly on the page, exactly the way you'd mark up a printed draft. Then Claude handles the rest: applying the same changes to source files, tightening the tone, turning your edits into a changelog, or using your rewrites as a reference for a bigger piece.

The `ORIGINAL → EDITED` diff format is intentional. It gives Claude precise context about what changed and what direction you're moving in, so it can extend that intent rather than guess at it.

## How to use it with Claude

After copying your changes, paste them into Claude with any instruction:

- *"Apply these edits to my codebase"* — Claude finds the right files and makes the exact changes
- *"Keep this tone throughout the rest of the page"* — Claude uses your rewrites as a style reference
- *"Turn these into a changelog entry"* — Claude formats the diff as release notes
- *"What am I trying to improve here?"* — Claude reads your edits and names the pattern

The bookmarklet captures *what* you changed. You decide what to do with it.
