You are designing and implementing a premium personal leadership coaching website.

Translate the following business brief into a refined, minimal, and highly credible website while respecting a strict design system and technical architecture.

The site must communicate authority, calm strategic thinking, clarity, and premium leadership positioning.

---

PROJECT CONTEXT

Brand:
Moya James Leadership

Domain:
moyajames.com

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
