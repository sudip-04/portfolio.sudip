# Sudip Timalsina — Built Environment Portfolio

An academic portfolio website for a University of Canberra Building and
Construction Management student, built around the concept of "an evolving
professional map." Pure HTML5 / CSS3 / vanilla JavaScript — no build step,
no framework, no backend.

## Run it

Just open `index.html` in a browser. Nothing to install, nothing to build.

For the best local experience (so relative asset paths behave exactly like
they will online), you can also serve the folder with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## File structure

```
portfolio/
├── index.html      → page structure & content
├── style.css        → all visual design (CSS variables at the top)
├── script.js         → interactions (orbit nav, modal, filters, etc.)
├── README.md
└── assets/
    ├── hero.jpg                     (homepage orbit centre image)
    ├── qantas.jpg / -02 / -03       (Qantas Maintenance Hangar)
    ├── canberra-houses.jpg / -02    (Canberra Houses)
    ├── revit.jpg / -02              (Revit Studies)
    └── westfield.jpg / -02          (Westfield Belconnen)
```

## Replacing images

Every image file in `/assets` is currently an elegant placeholder (a simple
architectural line pattern) so the site never shows a broken-image icon.

To use your own photos or renders: **just save a new file with the exact
same filename into `/assets`**, overwriting the placeholder. No code changes
needed anywhere — `index.html` and `script.js` already point at these paths.

Recommended: JPG, landscape orientation, roughly 1600×1200px, kept under
~500KB each so the site stays fast.

## Editing text content

- **Hero, Identity, Direction, Career, References text** — edit directly
  inside `index.html`, inside the relevant `<section id="…">` block. Each
  section is clearly commented (`<!-- 01 — EMERGING DESIGN IDENTITY -->` etc.).
- **Skills, Study Pathway, Ethics chips, Currently Developing labels** — also
  plain HTML inside `index.html`; each item is a small repeated block you can
  copy/edit/delete.
- **Selected Work projects** — edit the `PROJECTS` array at the top of
  `script.js`. Each project object controls the grid card *and* the modal
  detail view (title, category, tags used by the filter, tools, description,
  "what I learned," "why it matters," and the image list). Add a new project
  by copying an existing object and giving it a new `id`.
- **Discipline Map nodes** (section 03) — edit the `DISCIPLINE_NODES` array
  in `script.js`; the diagram and connecting lines are drawn automatically.

## Notes on content

Per the brief, no academic references, image credits or specific "what I
learned" reflections were invented. The References section (07) contains
clearly labelled placeholder blocks for UC readings, lecture material,
project sources and image credits — fill these in with real APA 7 citations
before submission. The `learned` / `why` fields inside `PROJECTS` in
`script.js` are placeholders for the same reason — replace with your own
reflections.

## Deploying

This is a fully static site, so any of the following work with zero
configuration:

- **GitHub Pages** — push this folder to a repo, then enable Pages on the
  `main` branch (root folder).
- **Netlify** — drag-and-drop the `portfolio` folder onto
  [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel** — `vercel deploy` from inside the folder, framework preset "Other."
- **Cloudflare Pages** — connect the repo, build command: none, output
  directory: `/`.

## Accessibility & performance

- Semantic HTML, visible focus states, `aria-*` attributes on the menu,
  orbit nodes and project modal.
- `prefers-reduced-motion` is respected — the orbit ring stops spinning, the
  "currently developing" marquee stops animating, and scroll/reveal
  animations are disabled.
- The orbital navigation has a fully accessible, non-overlapping stacked
  equivalent below 860px width and is entirely keyboard-operable (Tab to
  move between nodes, Enter/Space to activate, Esc to close menu/modal).
- Images use `loading="lazy"` and have graceful fallbacks if a file is
  missing, so the layout never breaks.

## Colour & type reference

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F3F0E8` | primary background |
| `--ink` | `#15140F` | primary text / near-black |
| `--concrete` | `#8B887E` | secondary/meta text |
| `--beige` | `#DAD3C1` | image placeholder fill |
| `--accent` | `#4E5D5A` | sparing linework/interaction accent |

Headings: **Space Grotesk** · Body: **Inter** · Editorial emphasis: **Newsreader** (italic)

All loaded from Google Fonts in the `<head>` of `index.html` — swap the
`<link>` there if you'd prefer self-hosted fonts.
