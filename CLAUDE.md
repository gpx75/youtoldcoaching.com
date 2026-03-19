You are designing and implementing a premium personal leadership coaching website.

Translate the following business brief into a refined, minimal, and highly credible website while respecting a strict design system and technical architecture.

The site must communicate authority, calm strategic thinking, clarity, and premium leadership positioning.

---

PROJECT CONTEXT

Brand:
Moya James Leadership

Domain:
moyajamescom.vercel.app

Tagline:
Define Your Path. Own Your Impact.

Methodology / Framework:
Pathwise™ Methodology – Activate → Align → Achieve
Guided by inner work: Clarity → Capability → Confidence

Pillars:

Activate: Start the journey, gain clarity, and take first steps
Align: Build capability, connect skills, values, and purpose
Achieve: Take confident action, create transformation, and deliver results

Primary markets:

United Kingdom
Switzerland
Global remote clients

Target audience:

Senior corporate leaders (Director to C-suite)
Entrepreneurs transitioning from corporate careers or scaling their businesses

Visitors typically arrive feeling:

uncertain
stuck in transition
overwhelmed by next career decisions

The website must help them feel:

understood
clear
confident about their next step

Client pain points:

lack of clarity on next career or business move
overwhelm with transition options
confidence erosion in new roles
fear of leaving corporate comfort zone

Client transformations:

clarity of purpose and actionable roadmap
leadership growth and capability development
increased confidence and executive presence
sustainable work-life integration

---

TECH STACK

Framework: Nuxt 4
UI system: Nuxt UI 4
CSS engine: Tailwind CSS v4
Content system: Nuxt Content 3

Fonts:

Fraunces (serif for headings)
Manrope (sans-serif for body text)

---

DESIGN SYSTEM RULES

Nuxt UI is the primary design system.

Tailwind utilities may be used only for layout and spacing.

Visual styling must rely on Nuxt UI tokens and semantic classes.

Do not introduce other UI frameworks.

Never hardcode tailwind coloring or hex colors in components.

Never create page-level styling systems.

All styling must come from centralized design tokens, means nuxtUI Semantic colors (https://ui.nuxt.com/docs/getting-started/theme/design-system)

---

THEMING ARCHITECTURE

All design tokens must live strictly in:

app/assets/css/main.css

Tokens must follow Nuxt UI semantic naming.

primary: 'teal', // Deep Teal Blue — navigation, structure, headings
secondary: 'rose', // Rose Gold — CTAs, interactive highlights
neutral: 'stone', // Warm neutral — body text, muted states

Examples:

--ui-primary
--ui-bg
--ui-text
--ui-muted
--ui-border

Components must reference tokens rather than colors.

Examples:

text-primary
bg-elevated
text-muted

Strictly Never use raw colors like:

bg-[#xxxxxx]
text-[#xxxxxx]
bg-white
text-white
bg-black
text-black
bg-white/10
text-white/80
ring-white/25
border-white/30
hover:bg-white/10
... or any Tailwind literal colour name with or without opacity modifier.

The only exception is elements on an always-dark surface (e.g. a hero section with a
full-bleed dark image). In that case use the dedicated on-dark tokens from main.css —
never raw white utilities:

bg-(--ui-on-dark-pill-bg)        instead of  bg-white/10
bg-(--ui-on-dark-dot)            instead of  bg-white/60
text-(--ui-on-dark-text)         instead of  text-white
text-(--ui-on-dark-text-soft)    instead of  text-white/80
text-(--ui-on-dark-text-muted)   instead of  text-white/70
ring-(--ui-on-dark-pill-ring)    instead of  ring-white/25
ring-(--ui-on-dark-pill-ring-sm) instead of  ring-white/20
border-(--ui-on-dark-border)     instead of  border-white/30
hover:bg-(--ui-on-dark-hover)    instead of  hover:bg-white/10

---

TAILWIND THEME CASCADE

Ensure correct override order:

@import 'tailwindcss'
@import '@nuxt/ui'

@theme { ... }

:root { ... }

.dark { ... }

The :root overrides must always win over Tailwind defaults.

---

COMPONENT CUSTOMIZATION

Components must never be styled directly.

All component configuration must live in:

app.config.ts

Example:

defineAppConfig({
ui: {
button: {
default: {
size: 'lg'
}
}
}
})

---

COLOR PALETTE

Primary color:

Deep Teal Blue (#007C91)

Used for:

navigation
structure
headings
active states

Secondary color:

Rose Gold (#B76E79)

Used for:

CTA buttons
interactive highlights
accent elements

Supporting colors:

White (#FFFFFF)
Warm Grey (#E5E1DF)
Dark Grey (#333333)

Visual tone must feel:

premium
calm
strategic
feminine leadership strength

Avoid:

saturated colors
generic corporate palettes
trendy UI gimmicks

Style:

sophisticated
premium
warm
uncluttered
modern
globally appealing

Imagery: Professional photography only, lifestyle shots. Avoid stock or AI-generated images.

---

LIGHT / DARK THEME CONSISTENCY

Dark and light modes must share the same identity.

Dark mode is not a separate design.

Light mode:

white / cream backgrounds
deep teal headings
rose gold CTAs

Dark mode:

deep teal backgrounds
cream text
rose gold accents preserved

Hierarchy and layout rhythm must remain identical.

---

BACKGROUND DESIGN

Backgrounds must remain subtle.

Primary backgrounds:

white or soft cream

Optional gradients:

cream → white
deep teal → darker teal

Gradients must remain extremely subtle.

Optional patterns:

fine editorial grid
dot grid
subtle line pattern

Opacity must remain ≤5%.

Avoid visual noise.

---

LAYOUT PRINCIPLES

The website should feel like a sequence of narrative hero panels.

Each page should prioritize strong above-the-fold clarity.

Avoid long scrolling layouts where possible.

Allow scrolling only when necessary for readability and mobile usability.

Whitespace must be generous.

Content density must remain low.

The visual experience must feel calm and editorial.

---

HERO STORYTELLING STRUCTURE

Each page should follow the same narrative arc.

Question
Recognition
Framework
Credibility
Action

Example structure:

Hero headline (question)

Recognition of the visitor's transition challenge

Introduction of the Pathwise™ framework (Activate → Align → Achieve)

Credibility signals

Call to action

This structure mirrors how leaders make strategic decisions.

---

SITE STRUCTURE

Navigation:

Home
About Moya
Services
Pathwise™ Framework
Client Success Stories
Contact

Home

Hero headline:

Lead the Story You Want to Tell

Subheadline:

Navigate your next chapter with intention, impact, and the leadership you aspire to deliver.

Include:

clear value proposition
recognition of leadership transition pain
Pathwise™ overview: Activate → Align → Achieve
coaching explanation
credibility signals
primary CTA: Book Alignment Session (£120)
secondary CTA: Complimentary 30-minute call

---

About Moya

First-person bio:

"I help senior leaders and entrepreneurs navigate pivotal career transitions through the Pathwise™ framework. I guide clients from uncertainty to empowered leadership, enabling them to step into their next chapter with authority and purpose."

Professional credibility.

20+ years pharmaceutical industry leadership.

Global experience.

Transition to entrepreneurship in 2016.

Creation of the Pathwise™ methodology.

---

Work With Me

Explain coaching approach.

Programmes:

Pathway (Activate pillar)
3 months, 12 sessions, weekly 60-min
Investment: CHF 2,000
Find your direction, gain clarity, and set your next steps in motion

Momentum (Align pillar)
6 months, 18 sessions, biweekly 60-min
Investment: CHF 5,000
Build growth, develop your capabilities, and accelerate your leadership impact

Impact (Achieve pillar)
12 months, 24 sessions, biweekly 90-min
Investment: CHF 9,000
Reach new heights, achieve lasting transformation, and fully step into your leadership potential

Additional offerings:

Pathwise Strategy Day (half-day and full-day intensives)
Bespoke programmes tailored to urgent needs or specific outcomes
Alignment Session (£120)

---

Pathwise™ Framework

Explain the methodology: Activate → Align → Achieve

Clarity
Capability
Confidence

Explain how narrative coaching powers the framework.

---

Client Success

Testimonials and leadership transformation stories.

Focus on real outcomes aligned to Activate → Align → Achieve stages.

Placeholder testimonials:

Sophie Clarke
Rajesh Kapoor
Clara Müller
David Thompson
Elena Rossi

---

Book / Contact

Two primary actions:

Schedule Alignment Session (£120)
Book Complimentary 30-Min Call

Include calendar integration.

Conversion funnel:

Awareness → Interest → Evaluation → Action → Programme enrolment

---

CREDIBILITY SIGNALS

Prominently highlight:

400+ leaders coached
2,000+ coaching hours
ICF Level 2 certified
Proven Pathwise™ methodology

These proof signals should appear on the homepage.

---

INDUSTRY EXPERTISE

Highlight leadership experience across:

Pharmaceutical
Banking
Technology

This builds trust with senior leaders.

---

SEO STRUCTURE

Optimize the site for leadership transition coaching searches.

Primary keyword themes:

leadership transition coaching
executive career transition
C-suite coaching
corporate to entrepreneur transition
career change coaching
executive coaching Switzerland
leadership coaching UK

Secondary keyword themes:

senior leadership development
career pivot coaching
strategic career planning
leadership confidence
bespoke executive coaching
global leadership coaching
narrative coaching

Ensure:

clean heading hierarchy
semantic HTML
meta descriptions
structured content

---

COMPETITOR DIFFERENTIATION

Deep corporate sector expertise across pharmaceutical, banking, and technology.

Global and cross-cultural experience spanning UK, Switzerland, and emerging markets.

Proprietary Pathwise™ methodology: Activate → Align → Achieve.

Bespoke, high-touch programming.

Story-driven, journey-focused framework.

Internal leadership and external impact focus.

---

NUXT CONTENT AUTHORITY STRATEGY

Use Nuxt Content to support authority content.

Future articles may include:

The Hidden Cost of Staying in the Wrong Role
Why Leadership Transitions Fail
Pathwise™ Framework Explained
From Corporate Leader to Entrepreneur

Articles should strengthen SEO authority and thought leadership.

---

USER EXPERIENCE GOAL

The website must feel like a calm strategic conversation with a trusted advisor.

Visitors should immediately feel:

"This person understands my situation."

The site must communicate:

clarity
strategic thinking
leadership authority
trust
premium coaching experience

---

DESIGN PHILOSOPHY

Story-centered design.

The website must visually reflect leadership transition and narrative transformation.

Every page should guide visitors through the progression:

uncertainty → clarity → confidence → action

The overall aesthetic must feel sophisticated, calm, editorial, and premium.

## Execution Instruction

Use this document as the single source of truth for the implementation.

Now execute the redesign and refactor the project accordingly.

Priorities:

1. Apply the design system and theme architecture first
2. Fix light/dark theme consistency
3. Refactor layout and hero-based page structure
4. Refactor content pages to align with the business brief
5. Centralize component styling through Nuxt UI and app.config.ts
6. Simplify main.css and remove redundant styling
7. Ensure the final result is visually consistent, responsive, and production-ready

Constraints:

- Do not rewrite the brief
- Do not explain the brief
- Implement it directly
- Preserve maintainability and clean architecture
- If an existing implementation conflicts with this document, refactor it to match this specification

Expected output:

- Updated codebase
- Updated theme tokens
- Refactored components
- Refactored page structure
- Working dark/light themes
- Final result aligned with the premium brand and business requirements

## Final Instruction

Read this file as the implementation specification.
Then execute the required changes directly in the codebase.
Do not summarize the document.
Do not restate the requirements.
Apply them.

## Additional Constraints

- If specific content is missing, preserve the structure and use clearly marked placeholders rather than inventing claims, testimonials, or credentials.
- Prefer refactoring existing components and architecture where possible instead of rebuilding from scratch.
- Preserve SEO-critical structure, semantic markup, and content hierarchy during refactoring.
- Validate all changes against responsive behavior across mobile, tablet, and desktop, with mobile-first priority.

---

## CONTENT ARCHITECTURE — STRICT RULE

All user-editable content must live exclusively in the `content/` folder.

No hardcoded strings, labels, headings, body copy, navigation items, image paths, or brand settings are permitted in Vue components, composables, or layouts.

Vue components are renderers only. They receive data. They do not define it.

### Content file structure

```
content/
├── navigation.yml       ← Site navigation items + header CTA button
├── site.yml             ← Brand name, tagline, footer text, contact email
├── index.md             ← Homepage content (frontmatter + body prose)
├── about-moya.md        ← About page content (frontmatter + bio body)
├── services.md          ← Services / programmes page
├── pathwise-framework.md
├── client-success.md
└── contact.md
```

### Frontmatter as structured data

Every page `content/*.md` file uses frontmatter to declare structured, editable data:

- `title` — H1 hero headline
- `eyebrow` — small badge label above the headline
- `subtitle` — supporting sub-headline
- `bodyHeading` — heading above the body prose section (optional; renders two-column layout when set)
- `tags` — credential pills rendered in the hero
- `cta` / `cta2` — primary and secondary call-to-action buttons with `label` and `href`
- `heroBgImage` — hero background image path
- `heroBg.light` / `heroBg.dark` — separate light/dark background images (used on homepage)
- `heroPortrait` — portrait image path (used on homepage)
- `sections[]` — below-fold storytelling sections (recognition, framework, differentiators, credibility, action)
- `calendlyUrl` — Calendly embed URL for booking pages

### Global config files

`content/navigation.yml` — editable navigation:

- `brand.name` and `brand.tagline` — rendered in Logo component
- `items[]` — nav links with `label` and `to`
- `cta.label` and `cta.to` — header call-to-action button

`content/site.yml` — site-wide settings:

- `footer.copyright` — footer legal text
- `contact.email` — contact email address

### Page rendering rules

`app/pages/[...slug].vue` is the universal page renderer for all content pages.

It must:

- Fetch the page from Nuxt Content by route path
- Pass all frontmatter fields to the `PageHero` component
- Render body prose when `page.body` has content:
    - Two-column layout when `bodyHeading` is set (heading left, prose right)
    - Full-width centred prose when `bodyHeading` is absent
- Render `sections[]` in sequence: recognition → framework/differentiators → credibility → action

`app/pages/index.vue` follows the same content-driven rule:

- All image paths come from `heroMeta.heroBg.light`, `.dark`, and `heroMeta.heroPortrait`
- `bodyHeading` comes from frontmatter — never hardcoded

`app/pages/about-moya.vue` exists as a **bespoke page** because its full-viewport two-column hero layout (`.hero-left` / `.hero-bg` CSS grid) cannot be reproduced by `[...slug].vue` + `PageHero`. It must remain content-driven (all strings from `content/about-moya.md`) and must follow the hero token rules below.

---

## HERO CONSISTENCY — BESPOKE PAGES vs SLUG PAGES

All hero sections across the site — whether rendered by `PageHero.vue` (slug pages) or by a bespoke page (`index.vue`, `about-moya.vue`) — must use the **same token vocabulary** and follow the same surface rules. No bespoke page may invent its own colour classes.

### Hero surface types

Every hero has one of three surface types. The surface type determines which token set to use for all text, badges, and buttons inside it.

**Light surface** — cream/white background, no background image or video.

- Used when: no `heroBgImage`, no `heroVideo`, and no dark gradient overlay.
- Tokens: standard semantic tokens.
  - H1: `text-highlighted`
  - Subtitle: `text-muted`
  - Eyebrow pill: `bg-(--ui-primary)/6 ring-(--ui-primary)/30 text-(--ui-primary)/80`
  - Eyebrow dot: `bg-(--ui-primary)/70`
  - Tags: `bg-(--ui-bg)/80 ring-default text-muted`
  - CTA2: `rounded-full` only (no extra border/text classes needed)

**Dark surface** — full-bleed background image or video with an overlay.

- Used when: `heroBgImage` or `heroVideo` is set (and a teal/dark overlay is applied).
- In `PageHero.vue` this is detected by `hasDarkBg = !!(bgImage || videoSrc)`.
- Tokens: `--ui-on-dark-*` tokens throughout, no `dark:` prefix needed (the surface is always dark).
  - H1: `text-(--ui-on-dark-text)`
  - Subtitle: `text-(--ui-on-dark-text-soft)`
  - Eyebrow pill: `bg-(--ui-on-dark-pill-bg) ring-(--ui-on-dark-pill-ring) text-(--ui-on-dark-text-soft)`
  - Eyebrow dot: `bg-(--ui-on-dark-dot)`
  - Tags: `bg-(--ui-on-dark-pill-bg) ring-(--ui-on-dark-pill-ring-sm) text-(--ui-on-dark-text-muted)`
  - CTA2: `rounded-full border-(--ui-on-dark-border) text-(--ui-on-dark-text) hover:bg-(--ui-on-dark-hover)`

**Mixed surface** — cream gradient in light mode, teal gradient in dark mode (used on `index.vue` and `about-moya.vue`).

- The hero background image spans the full viewport; a gradient panel overlays the left text area.
- In light mode the text sits on cream → use standard semantic tokens.
- In dark mode the gradient turns teal → use on-dark tokens via `dark:` variant prefix.
- Pattern: pair every standard token class with its `dark:` on-dark counterpart:
  - H1: `text-highlighted dark:text-(--ui-on-dark-text)`
  - Subtitle: `text-muted dark:text-(--ui-on-dark-text-soft)`
  - Eyebrow pill: `bg-(--ui-primary)/6 ring-(--ui-primary)/30 text-(--ui-primary)/80 dark:bg-(--ui-on-dark-pill-bg) dark:ring-(--ui-on-dark-pill-ring) dark:text-(--ui-on-dark-text-soft)`
  - Eyebrow dot: `bg-(--ui-primary)/70 dark:bg-(--ui-on-dark-dot)`
  - Tags: `bg-(--ui-bg)/80 ring-default text-muted dark:bg-(--ui-on-dark-pill-bg) dark:ring-(--ui-on-dark-pill-ring-sm) dark:text-(--ui-on-dark-text-muted)`
  - CTA2: `rounded-full dark:border-(--ui-on-dark-border) dark:text-(--ui-on-dark-text) dark:hover:bg-(--ui-on-dark-hover)`

### CTA button conventions (all hero types)

Primary CTA is always:
```html
<UButton color="secondary" variant="solid" size="lg" trailing-icon="i-heroicons-arrow-right" class="rounded-full">
```

Secondary CTA on light surface:
```html
<UButton color="neutral" variant="outline" size="lg" class="rounded-full">
```

Secondary CTA on dark or mixed surface (add dark-surface overrides):
```html
<UButton color="neutral" variant="outline" size="lg" class="rounded-full dark:border-(--ui-on-dark-border) dark:text-(--ui-on-dark-text) dark:hover:bg-(--ui-on-dark-hover)">
```

Never use `!important` overrides or scoped CSS to force button colours. Always use Nuxt UI `color` + `variant` props.

### H1 font sizes

`PageHero.vue` defines two size scales — match these in bespoke pages:

- With illustration: `text-[2.4rem] sm:text-5xl lg:text-[3.5rem]`
- Without illustration (standard): `text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-7xl`

All hero H1s must include `break-words` to prevent single long words from overflowing a constrained column.

### Gradient panel rule (mixed-surface bespoke pages)

On bespoke pages with a full-bleed background image and a cream/teal gradient text panel:

- The gradient must be an **absolutely positioned sibling element** (`position: absolute; inset: 0; left: 0`) inside the section, **not** a `background` property on the text column div.
- This ensures the gradient starts from `left: 0` of the viewport, not from the `max-w-7xl` container boundary.
- The gradient panel sits at `z-[1]` (above background images at `z-0`, below all content at `z-10`).
- Use `pointer-events: none` and `aria-hidden="true"`.

Light mode gradient (cream):
```css
background: linear-gradient(
    to right,
    color-mix(in srgb, var(--ui-bg-elevated) 95%, transparent) 0%,
    color-mix(in srgb, var(--ui-bg-elevated) 95%, transparent) 38%,
    color-mix(in srgb, var(--ui-bg-elevated) 25%, transparent) 52%,
    transparent 62%
);
```

Dark mode gradient (teal):
```css
background: linear-gradient(
    to right,
    rgba(0, 95, 112, 0.95) 0%,
    rgba(0, 95, 112, 0.95) 38%,
    rgba(0, 95, 112, 0.20) 52%,
    transparent 62%
);
```

### Bespoke page checklist

Before shipping any bespoke hero page, verify:

- [ ] Hero surface type is identified (light / dark / mixed)
- [ ] All text, badge, tag, and button classes match the surface type token set above
- [ ] No raw colour utilities (`text-white`, `bg-white/10`, hex values, `!important` overrides)
- [ ] H1 includes `break-words` and uses the standard size scale
- [ ] Gradient panel (if used) is an absolutely positioned element from `left: 0`, not a `background` on the text column
- [ ] All content strings come from `content/*.md` frontmatter — nothing hardcoded in the template

### Nuxt Studio compatibility

This site is edited through Nuxt Studio.

All content must be Studio-editable without touching code.

Do not:

- Hardcode any string that a client might want to edit
- Embed image paths directly in `<img src="...">` attributes in templates
- Define navigation items in JavaScript arrays inside components
- Write brand names or copyright text in component templates

Do:

- Put all editable strings in `content/*.md` frontmatter or body
- Put navigation and global config in `content/navigation.yml` and `content/site.yml`
- Fetch global config in layout-level components using `queryCollection`
- Use `ContentRenderer` for all markdown body prose
- Use fallback defaults in components only as a last resort during migration
