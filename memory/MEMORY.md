# Hilda Kilama Leadership — Project Memory

## Stack
- Nuxt 4, Nuxt UI 4, Tailwind CSS v4, Nuxt Content 3
- Fonts: Fraunces (serif/headings), Manrope (sans/body)
- All design tokens in `app/assets/css/main.css`
- Component config in `app.config.ts` (colors: primary=teal, secondary=rose, neutral=stone)

## Architecture
- Single dynamic route: `app/pages/[...slug].vue` → queries Nuxt Content → renders `PageHero`
- Page metadata (eyebrow, subtitle, cta, cta2, heroIllustration, heroSlides, etc.) lives in content frontmatter
- `PageHero.vue` is the primary display component — handles slides, illustration, dual CTAs, video bg
- Layout: `app/layouts/default.vue` — full-height desktop, scrollable mobile

## Design Rules
- Never hardcode hex colors in components — use `currentColor` + CSS token class, or `var(--ui-*)` directly
- No raw Tailwind colors (e.g. `bg-teal-700`) — use semantic tokens (`text-primary`, `bg-elevated`, etc.)
- No page-level styling — all tokens in main.css, component config in app.config.ts

## Key Files
- `app/assets/css/main.css` — all `--ui-*` tokens, light (:root) and dark (.dark)
- `app/components/PageHero.vue` — props: eyebrow, title, subtitle, tags, cta, cta2, contentSlides, videoSrc, illustration, illustrationFill, contentScroll
- `content/*.md` — one file per page, frontmatter drives hero config
- `app/components/BackgroundPattern.vue` — dot grid, uses `currentColor` + `text-(--ui-border)`

## Content Pages
- `/` → index.md — dual CTAs (15-min call + £200 Alignment Session), credibility signals (150+/2000+/80%+), industry tags (Pharma/Banking/Tech)
- `/about-moya` — 17 years pharma, founded 2016
- `/work-with-me` — £200 Alignment, 3/6/12-month programmes, VIP Days
- `/transition-triad` — Clarity/Capability/Confidence framework
- `/client-success` — 4 testimonials (placeholders)
- `/book` — Calendly link (https://calendly.com/hilda_k), email hello@hildakilama.com

## Completed Refactors
- BackgroundPattern: hex → currentColor/token
- PageHero: added cta2 (secondary outline button)
- index.md: spec subtitle, credibility signals, dual CTAs, industry tags, SEO description
- about-moya.md: "17 years" (not fifteen)
- package.json: removed unused daisyui
