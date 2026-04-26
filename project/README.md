# Dojo Sabre Design System

> A dark, cinematic **neo-samurai / shinobi** visual language for 3D gallery and showcase interfaces. Forge-black backdrops, oxidized-crimson lacquer, and ember-gold glow — under misty torii gates.

---

## Product Context

**Dojo Sabre** is a zero-JS, CSS-only **3D rotating image gallery** — a 10-image cylinder that slowly rotates around a central vertical axis with a cinematic katana-and-torii backdrop. It pauses on hover. Each panel is a portrait tile with a double-border frame, rounded corners, and a soft reflection underneath.

The attached source is a single HTML file + stylesheet demonstrating the effect. The imagery is a curated set of **cinematic warrior portraits** — hooded figures, masked shinobi, mythic fire-cloaked entities, rune-faced oracles, Japanese kanji, red maple leaves, and a torii-gate hero shot.

There is **no existing written brand, logo, or typography system** — this design system is a ground-up extrapolation of the visual DNA carried in the imagery and the 3D carousel code. The goal is to give future designers a coherent language to build around: showcase pages, product cards, landing shells, gallery tools, and prototype UIs that feel like they belong to the same cinematic universe as the source artifact.

### Products covered by this system

1. **Dojo Sabre Showcase** — the canonical 3D rotating gallery, wrapped in a proper site chrome (nav, hero, caption rail, pause/play).
2. **Sabre Codex** — a web "codex" / catalogue interface for browsing the full gallery as cards with metadata (name, rune, clan, kanji).

### Sources

- **`ROTATION_3D/`** — attached codebase. `index.html` (29 lines, CSS-only 3D carousel) + `style.css` (71 lines). Images referenced from `./images/`.
- **`images/`** — attached image folder. 16 images total: `1.png`–`15.png/jpg` (character portraits, mostly 9:16 vertical) + `dojosabre.jpg` (torii-gate + katana hero, used as body background).
- **No Figma file, no logos, no brand guide** — everything in this system is original derived work from the two sources above.

---

## CONTENT FUNDAMENTALS

Copy is **ceremonial, terse, and lightly mythic**. Think Kurosawa titles, old sword inscriptions, and modern product copywriting held at arm's length.

**Voice**
- Third-person / imperative. **"Draw the blade."** Not "You can draw the blade!"
- Short lines. Fragments welcome. Full sentences when needed for clarity.
- No corporate softeners — no "we're excited to," no "let's," no "just."
- Bilingual flourishes: an occasional kanji or romaji subtitle (e.g. **DOJO SABRE · 道場 剣**) — decorative, never load-bearing.

**Casing**
- **ALL CAPS** for display headings and section labels (tracked `+60/1000`).
- Sentence case for body paragraphs.
- **Lowercase monospace** for runes, tags, timestamps, and system chrome (`codex.log · 10.23.26`).

**Examples (do)**
- *"Eleven figures circle the blade."*
- *"Pause to observe. Hover holds the rotation."*
- *"No. 07 · The Ember Mendicant"*
- *"Forged in crimson. Bound in bone."*

**Counterexamples (don't)**
- ~~"Welcome to Dojo Sabre, your new favorite 3D gallery! 🎉"~~
- ~~"Click here to learn more about our awesome rotating images."~~
- ~~"Check it out — you won't be disappointed!"~~

**Tone keywords**: reverent, quiet, exact, a little ominous, never cute.

**Emoji**: never. Use a kanji glyph, a rune character (`✦ ◈ ⛩ 刃 影`), or nothing.

---

## VISUAL FOUNDATIONS

### Color vibe
**Dark-mode default, always.** Light mode is not part of this system. The palette is ink-black foundations, **oxidized-blood crimson** (`#a3161f`) for primary accent, and **forge-ember gold** (`#e09620`) for runic / decorative accent. A cool fog-grey supports mist backgrounds. Bone-parchment off-white for body text.

- **Ink** `#070506 → #4a3e41` — backgrounds, panels, cards
- **Bone** `#f5ede3 → #8f8275` — primary text on dark
- **Crimson** `#a3161f` — primary accent, CTA, rune highlights
- **Ember** `#e09620` — secondary accent, glyphs, active state glows
- **Fog** `#20252a → #cdd3d9` — neutral greys, secondary surfaces

### Type
- **Display** — Cinzel (Roman-carved, ceremonial, tracked wide).
- **Headline / bilingual** — Noto Serif JP (supports kanji natively).
- **Body / UI** — Inter (quiet neutral sans).
- **Mono / rune tags** — JetBrains Mono (all-lowercase, heavily tracked).
- **Brush kanji accent** — Yuji Mai (handwritten brush).

All display text is **tracked +40 to +80 per em** and set UPPERCASE. Body remains sentence-case, normal tracking.

### Imagery
- Portrait 9:16 orientation, always.
- **Cinematic, moody, AI-rendered warrior aesthetic** — hooded silhouettes, masked shinobi, fire-cloak mystics, rune-faced oracles.
- Color-grading: **deep black shadows, crushed blacks, saturated crimson + ember highlights, occasional cool teal/fog backgrounds.** Warm overall. Slight grain.
- Images are displayed inside **rounded rectangles with a 4px double-border in pure black** (inherited from the carousel code) and a subtle bottom reflection.

### Backgrounds
- Default: solid `--ink-900` or `--ink-950`.
- Hero / ceremonial: full-bleed `dojosabre.jpg` (torii + katana) with a radial dark vignette over the top to push contrast to the center.
- Never use the purple-blue gradient from the source CSS (it's a buggy line; ignored). Use crimson-to-black or ember-to-black radial gradients when a gradient is called for.

### Animation
- **Slow. Ceremonial.** 20-second full rotations (from the source carousel). Hover pauses.
- Easing: use `--ease-blade` (`cubic-bezier(0.16,1,0.3,1)`) for entrances — slow start, confident finish, no bounce.
- Fades are preferred over slides. No spring bounces. No wiggles.
- Rune / ember glows pulse at `2.4s ease-in-out infinite` (subtle, ±20% opacity).

### Hover states
- Images: very subtle `translateY(-2px)` + crimson glow outer ring.
- Buttons: darken background by 8%, outer crimson glow appears (`--glow-crimson-sm`).
- Links: underline gains ember color + glow; text stays bone.

### Press / active states
- Buttons: scale `0.98`, glow intensifies to `--glow-crimson-md`, no color swap.
- Tiles: brief double-border flash from black → crimson, then settles.

### Borders
- **Signature pattern: 4px double-border black** on image tiles (literal heritage from the carousel — keep it).
- Hairline `1px solid var(--border)` (`--ink-600`) on cards, panels, dividers.
- Hot: `1px solid var(--border-hot)` (`--crimson-700`) on selected / active.
- Gold: `1px solid var(--border-gold)` for ceremonial dividers / header rules.

### Shadows
- Drop shadows are **dense and inky**, not soft diffused lifts. Use `--shadow-md` for cards, `--shadow-lg` for modals.
- **Glows are the signature.** Crimson `--glow-crimson-md` for primary CTAs; ember `--glow-ember-md` for runes, stars, and alert glyphs.
- Cards use an inset highlight (`--shadow-inset`) to suggest lacquered edges.

### Transparency / blur
- Used sparingly. **Modal / overlay surfaces** get `backdrop-filter: blur(18px)` over `rgba(7,5,6,0.7)`.
- Hero captions sit behind a soft radial darkening, never a blur.
- Menu chrome is solid; no glassmorphism on navigation.

### Corner radii
- Cards: `16px` (`--r-5`).
- Buttons: `4px` (`--r-2`) or pill (`--r-pill`) depending on ceremony.
- Image tiles: `15px` (from the source carousel — keep for continuity).
- Input fields: `8px` (`--r-3`).

### Layout
- Max content width `1200px`, gutter `24–32px`.
- Grids: 12-col desktop, 6-col tablet, 4-col mobile.
- Generous vertical rhythm — sections separated by `96px` (`--s-9`).
- Fixed elements: top nav only. No sticky CTA rails, no chat bubbles.

### Reflection
The source carousel applies `-webkit-box-reflect: below 2px linear-gradient(transparent, transparent, rgba(4,4,4,0.267))` to each tile. **Keep this effect** for any floating / showcase imagery — it's the system's visual signature.

---

## ICONOGRAPHY

The source project **ships no icons**. This system fills that gap with a consistent, lightweight approach:

### Primary: Lucide (CDN)
- **Library**: Lucide Icons via CDN (`https://unpkg.com/lucide-static@0.469.0/`).
- **Stroke weight**: 1.5px default, 2px for button-affixed icons.
- **Color**: inherit `currentColor` — typically `--fg-2` at rest, `--accent` on hover.
- **Size scale**: 14 / 16 / 20 / 24 / 32px.

*Why Lucide:* its fine 1.5px stroke fits the ceremonial, engraved vibe better than thick filled icons would. Flagged as a substitution — if the user wants a more "katana" icon family later (e.g. custom SVGs of swords, torii, runes), swap it out.

### Secondary: Unicode rune glyphs
Used decoratively, never as primary action icons:
- `⛩` torii gate · `✦ ✧` sparks · `◈ ◆` diamond · `刃` blade · `影` shadow · `道` way · `剣` sword · `·` beat / separator

These appear inline in headings, eyebrow labels, and breadcrumbs.

### Brush kanji (Yuji Mai font)
For hero-scale decorative glyphs, use the Yuji Mai font (already loaded in `colors_and_type.css`) rather than an SVG. This keeps things editable and selectable.

### What this system does NOT do
- ❌ No emoji. Ever.
- ❌ No fill-heavy Material Icons.
- ❌ No hand-drawn logo SVGs inside copy.
- ❌ No gradient-fill icons.

### Logo
A ceremonial wordmark **"DOJO SABRE"** set in Cinzel Black 900, tracked `+80/1000`, with a hairline rule above and a kanji subtitle **道場 剣** below in Yuji Mai. See `assets/logo/` for a ready-to-use SVG / HTML component in the UI kit.

---

## Index

Root files:
- **`README.md`** — this file
- **`SKILL.md`** — cross-compat Agent Skill manifest
- **`colors_and_type.css`** — all CSS variables, font imports, semantic classes

Folders:
- **`assets/`** — imagery, logo, icons
  - `assets/images/` — 16 portrait tiles + `dojosabre.jpg` hero
  - `assets/logo/` — wordmark SVG
- **`preview/`** — design-system cards (shown in the Design System tab)
- **`ui_kits/`** — product recreations
  - `ui_kits/showcase/` — **Dojo Sabre Showcase** (the canonical 3D gallery, properly chromed)
  - `ui_kits/codex/` — **Sabre Codex** (catalogue / grid browser)
- **`fonts/`** — all fonts are loaded from Google Fonts CDN; no local files shipped

### Known gaps / substitutions
- **Iconography** → Lucide (CDN), flagged as a substitute until a bespoke set exists.
- **Fonts** → all loaded from Google Fonts; no TTF/WOFF files copied locally.
- **No real brand exists** — every guideline here is extrapolated from the two attached sources. Iterate with the user to refine.
