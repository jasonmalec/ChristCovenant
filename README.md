# Resurgens — Christ Covenant campaign pillar (Phase 0 site)

A lightweight, gated, internal-alignment website for **Resurgens**, a pillar of
the Christ Covenant campaign. Its first job is **alignment, not awareness**:
give leaders, elders, and key ministry partners one shared place to understand
what Resurgens is and how it fits — before any public push.

> **Phase 0 = gated + noindex.** Shared by link only. Resurgens is a pillar
> *inside* Christ Covenant — never a separate brand or competing campaign.

---

## What's here

| Page | File | Purpose |
|---|---|---|
| Home / one-pager | `index.html` | The full narrative: problem → proof → campaign fit → model → numbers → structure → CTA |
| Sandy Springs | `sandy-springs.html` | The proof, with before/after and a photo/testimony set |
| The Numbers | `numbers.html` | Proforma headline, per-campus + build-new comparison, how giving works |
| For Leaders (gated) | `leaders.html` | FAQ (incl. the Buckhead question), downloads, "start a conversation" |
| Executive Summary | `executive-summary.html` | One-page, print-to-PDF pre-read |
| Deck outline | `downloads/resurgens-deck.md` | Slide-by-slide content for a briefing deck |

No build step, no framework, no database. Just open `index.html` in a browser.

---

## Editing the text (no coding needed)

All wording lives directly inside the `.html` files as plain text. Open a file
in any text editor, change the words between the tags, and save. The design,
colors, and fonts are all in `assets/css/styles.css` (you rarely need to touch
it — the brand colors are at the very top in the `:root` block).

**Placeholders to replace before sharing widely** (search for these):
- Sandy Springs **photos** → drop real images into `assets/img/` and update `sandy-springs.html`.
- Sandy Springs **testimony** → quote + attribution in `sandy-springs.html`.
- **Generosity team** email/phone → in `leaders.html` (search `generosity@christcovenant.com`).
- **Campus names 2–5** in `numbers.html` (placeholders for alignment).

---

## The leader password (the gate)

The "For Leaders" area is protected by one shared password.

- **Default password:** `resurgens2026`
- To change it: open `assets/js/gate.js` and follow the short instructions at
  the top (you load the page, run `await sha256('your-new-password')` in the
  browser console, and paste the result into the `PASSWORD_HASH` line).

> This is a lightweight alignment gate, not bank-grade security — it keeps the
> materials off the open web while the narrative is being set. For anything
> truly sensitive, host the downloads behind real authentication.

---

## Publishing it (pick one)

**Option A — GitHub Pages (free, fastest to share a link):**
1. In the GitHub repo: **Settings → Pages**.
2. Source: **Deploy from a branch** → branch `claude/resurgens-mvp-site-6wwv2b` (or `main`) → `/ (root)` → Save.
3. GitHub gives you a link like `https://<org>.github.io/christcovenant/`. Share that with leaders.
   - The site is already set to `noindex` + `robots.txt Disallow`, so it stays out of search.

**Option B — Lift into Squarespace / Framer / christcovenant.com:** the brief's
recommended long-term home. The copy, structure, stats, FAQ, and deck outline
here are all reusable — paste them into the builder a non-developer will edit.

**Phasing:** Phase 0 (now) = this gated one-pager. Phase 1 (campaign launch) =
republish as `christcovenant.com/resurgens` inside the campaign frame, then
remove the `noindex` tags. Phase 2 = add the annual impact report + new campus
stories.

---

## Analytics

`assets/js/main.js` already tracks **page views, scroll depth, CTA clicks (by
audience), and downloads** — currently logged to the browser console and pushed
to `window.dataLayer`. To send them somewhere real, drop a GA4, Plausible, or
Fathom snippet into the `<head>` of each page; the events are already firing.

---

## Open questions (from the brief) — for Jason / the campaign team

These need a human decision; flagging rather than guessing:

1. **Who owns edits** — campaign/comms team or Jason? (Affects whether long-term home should be Squarespace/Framer vs. this repo.)
2. **Umbrella site** — does the campaign already have a site this should live inside from day one (i.e., skip straight to `christcovenant.com/resurgens`)?
3. **Photography & testimony rights** for Sandy Springs — needed before any photos/quotes go in.

---

*Confidential — Phase 0 internal-alignment material. Not for public distribution.*
