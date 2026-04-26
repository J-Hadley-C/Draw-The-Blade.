---
name: dojo-sabre-design
description: Use this skill to generate well-branded interfaces and assets for Dojo Sabre, either for production or throwaway prototypes/mocks/etc. Dojo Sabre is a dark cinematic neo-samurai / shinobi visual language built around a 3D rotating image gallery. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **`colors_and_type.css`** — always import this; it's the source of truth for all CSS variables and font imports.
- **`assets/images/`** — 16 cinematic 9:16 warrior portraits + `dojosabre.jpg` torii hero.
- **`assets/logo/wordmark.html`** — logo lockup (Cinzel + Yuji Mai brush kanji).
- **`ui_kits/showcase/`** — canonical 3D rotating gallery product. Use `Carousel3D.jsx` for the signature effect.
- **`ui_kits/codex/`** — catalog / browse interface pattern.
- **`preview/`** — every design-system card (colors, type, components, brand) — the best reference for what "correct" looks like.

## Signature rules (never break without asking)

1. **Dark mode always.** `--ink-900` backgrounds. No light mode.
2. **Image tiles wear a 4px double-border in pure black** with `-webkit-box-reflect` below. This is the brand's most recognizable detail.
3. **Display type is ALL CAPS, Cinzel, tracked +60 to +80.** Never sentence-case a hero.
4. **Accents are crimson (#a3161f) and ember (#e09620).** No purple. No bluish-purple gradient.
5. **Copy is ceremonial and terse.** Third-person/imperative. No emoji. Kanji accents OK.
6. **Motion is slow.** 20s+ rotations. `--ease-blade` for entrances. No bounces.
