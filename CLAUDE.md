You are designing and implementing a premium personal leadership coaching website.

Translate the following business brief into a refined, minimal, and highly credible website while respecting a strict design system and technical architecture.

The site must communicate authority, calm strategic thinking, clarity, and premium leadership positioning.

---

PROJECT CONTEXT

Brand:
Moya James Leadership

Methodology:
Youtold narrative coaching

Framework:
The Transition Triad

Clarity  
Capability  
Confidence

Primary markets:

United Kingdom  
Switzerland  
Global remote clients

Target audience:

Senior corporate leaders (Director to C-suite)
Entrepreneurs transitioning from corporate careers or scaling their businesses.

Visitors typically arrive feeling:

uncertain  
stuck in transition  
overwhelmed by next career decisions

The website must help them feel:

understood  
clear  
confident about their next step.

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

Never hardcode hex colors in components.

Never create page-level styling systems.

All styling must come from centralized design tokens.

---

THEMING ARCHITECTURE

All design tokens must live in:

app/assets/css/main.css

Tokens must follow Nuxt UI semantic naming.

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

Never use raw colors like:

bg-[#xxxxxx]

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

Deep Teal Blue

Used for:

navigation  
structure  
headings  
active states

Secondary color:

Rose Gold

Used for:

CTA buttons  
interactive highlights  
accent elements

Supporting colors:

White  
Soft Cream  
Warm Grey

Visual tone must feel:

premium  
calm  
strategic  
feminine leadership strength

Avoid:

saturated colors  
generic corporate palettes  
trendy UI gimmicks

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

Introduction of the Transition Triad framework

Credibility signals

Call to action

This structure mirrors how leaders make strategic decisions.

---

SITE STRUCTURE

Home

Hero headline:

What's Your Next Story?

Subheadline:

Thinking about your next chapter? Let's get clear on what it looks like.

Include:

clear value proposition  
recognition of leadership transition pain  
Transition Triad overview  
Youtold narrative coaching explanation  
credibility signals  
primary CTA: Schedule 15-minute call  
secondary CTA: £200 Alignment Session

---

About Moya

Professional credibility.

17 years pharmaceutical industry leadership.

Global experience.

Transition to entrepreneurship in 2016.

Creation of the Youtold methodology.

---

Work With Me

Explain coaching approach.

Programmes:

3-month intensive  
6-month programme  
12-month programme  
VIP day intensives

Alignment Session (£200)

---

Transition Triad

Explain the methodology.

Clarity  
Capability  
Confidence

Explain how narrative coaching powers the framework.

---

Client Success

Testimonials and leadership transformation stories.

Focus on real outcomes.

---

Book / Contact

Two primary actions:

Schedule 15-minute call  
Book Alignment Session

Include calendar integration.

---

CREDIBILITY SIGNALS

Prominently highlight:

150+ leaders coached  
2000+ coaching hours  
80%+ successful transitions

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
career transition coaching for executives  
narrative coaching  
executive leadership transition  
leadership coaching UK  
leadership coaching Switzerland

Ensure:

clean heading hierarchy  
semantic HTML  
meta descriptions  
structured content.

---

NUXT CONTENT AUTHORITY STRATEGY

Use Nuxt Content to support authority content.

Future articles may include:

The Hidden Cost of Staying in the Wrong Role  
Why Leadership Transitions Fail  
The Transition Triad Explained  
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
- Prefer refactoring existing components and architecture where possible instead of rebuilding everything from scratch.
- Preserve SEO-critical structure, semantic markup, and content hierarchy during refactoring.
- Validate all changes against responsive behavior across mobile, tablet, and desktop, with mobile-first priority.
