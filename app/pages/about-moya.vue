<script setup lang="ts">
useHead({
    title: 'About Moya James · Moya James Leadership',
    meta: [
        {
            name: 'description',
            content: 'Moya James — ICF Level 2 certified leadership coach with 20+ years in pharmaceutical industry leadership. Creator of the Pathwise™ methodology.',
        },
    ],
});
</script>

<template>
    <div>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 1 — HERO
             Full-viewport two-column grid. Left = text with solid teal
             background. Right = image with blend overlay on left edge.
             Outer div uses negative margin to compensate for main's
             top padding so the hero truly touches the navbar bottom.
             ═══════════════════════════════════════════════════════════ -->
        <div class="-mt-10 md:-mt-12 lg:mt-0">
            <section class="hero">

                <!-- Full-viewport background image -->
                <div class="hero-bg" aria-hidden="true">
                    <img
                        src="/images/about-hero.jpg"
                        alt="Moya James"
                        class="hero-img"
                    />
                </div>

                <!-- Left text panel: semi-transparent overlay -->
                <div class="hero-left">
                    <div class="hero-content">

                        <!-- Eyebrow badge -->
                        <div class="badge">
                            <span class="badge-dot" />
                            About Moya James
                        </div>

                        <!-- H1 -->
                        <h1 class="hero-h1 font-serif">
                            Guiding leaders from uncertainty to empowered leadership.
                        </h1>

                        <!-- Subheading -->
                        <p class="hero-sub">
                            I know what it feels like to leave behind a version of yourself that everyone else thought was working fine.
                        </p>

                        <!-- Credential badges -->
                        <div class="credentials">
                            <span class="cred-badge">20+ Years Pharmaceutical Leadership</span>
                            <span class="cred-badge">ICF Level 2 Certified</span>
                            <span class="cred-badge">Pathwise™ Creator</span>
                        </div>

                        <!-- CTAs -->
                        <div class="cta-row">
                            <UButton
                                to="/services"
                                size="lg"
                                class="cta-primary rounded-full"
                                trailing-icon="i-heroicons-arrow-right"
                            >
                                View programmes
                            </UButton>
                            <UButton
                                to="/contact?type=30"
                                size="lg"
                                class="cta-secondary rounded-full"
                            >
                                Complimentary 30-min call
                            </UButton>
                        </div>

                    </div>
                </div>

            </section>
        </div>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 2 — BIO
             Revealed on scroll. White / dark-teal backgrounds.
             ═══════════════════════════════════════════════════════════ -->
        <section class="bio-section">
            <div class="bio-inner">

                <p>I help senior leaders and entrepreneurs navigate pivotal career transitions through the Pathwise™ framework. I guide clients from uncertainty to empowered leadership, enabling them to step into their next chapter with authority and purpose.</p>

                <p>After more than 20 years leading teams across global pharmaceutical organisations — spanning the UK, Switzerland, and emerging markets — I made a deliberate choice to leave corporate life. Not because something was wrong. Because something else was calling.</p>

                <p>In 2016 I founded my coaching practice, built on a conviction I had tested in boardrooms, in transitions, and in my own professional evolution: the story you tell about your transition shapes the leader you become on the other side of it.</p>

                <p>That conviction became the Pathwise™ methodology. It is narrative-centred, evidence-informed, and designed specifically for the kind of pivotal transitions that senior leaders face — not entry-level career changes, but identity-level reinventions.</p>

                <p class="last-p">My industry background spans <strong>Pharmaceutical · Banking · Technology</strong>. My clients come from those sectors because I understand them from the inside.</p>

            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 3 — DIFFERENTIATORS
             ═══════════════════════════════════════════════════════════ -->
        <section class="border-t border-default">
            <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                <p class="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                    What makes this approach different
                </p>
                <h2 class="mb-10 font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                    Deep expertise. Proprietary methodology. Bespoke outcomes.
                </h2>
                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6">
                        <p class="mb-2 font-semibold text-highlighted">Corporate sector depth</p>
                        <p class="text-sm leading-relaxed text-muted">20+ years leading in pharmaceutical, banking, and technology — the sectors where most of my clients come from. I understand the culture, the politics, and the identity costs of leaving.</p>
                    </div>
                    <div class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6">
                        <p class="mb-2 font-semibold text-highlighted">Global and cross-cultural reach</p>
                        <p class="text-sm leading-relaxed text-muted">Based across the UK and Switzerland with clients in emerging markets. Leadership transitions are shaped by context. Cultural fluency is built into the work.</p>
                    </div>
                    <div class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6">
                        <p class="mb-2 font-semibold text-highlighted">Pathwise™ Methodology</p>
                        <p class="text-sm leading-relaxed text-muted">A proprietary framework — Activate → Align → Achieve — developed across hundreds of engagements. Not adapted from a generic model. Built from the transitions themselves.</p>
                    </div>
                    <div class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6">
                        <p class="mb-2 font-semibold text-highlighted">Bespoke, high-touch programming</p>
                        <p class="text-sm leading-relaxed text-muted">No cohorts. No group sessions. Every programme is designed around your specific transition, timeline, and leadership identity.</p>
                    </div>
                    <div class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6">
                        <p class="mb-2 font-semibold text-highlighted">Story-driven, journey-focused</p>
                        <p class="text-sm leading-relaxed text-muted">Narrative coaching at the core. The story you tell about your transition shapes the leader you become on the other side of it. This is the foundational conviction.</p>
                    </div>
                    <div class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6">
                        <p class="mb-2 font-semibold text-highlighted">Internal and external impact</p>
                        <p class="text-sm leading-relaxed text-muted">The work addresses both inner leadership development — clarity, capability, confidence — and external executive presence, stakeholder influence, and career trajectory.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 4 — CREDIBILITY STATS
             ═══════════════════════════════════════════════════════════ -->
        <section class="border-t border-default bg-(--ui-bg-elevated)/40">
            <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                <p class="mb-8 text-center text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                    Background and credentials
                </p>
                <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <div class="text-center">
                        <p class="font-serif text-3xl font-bold text-highlighted">20+</p>
                        <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">Years pharmaceutical leadership</p>
                    </div>
                    <div class="text-center">
                        <p class="font-serif text-3xl font-bold text-highlighted">2016</p>
                        <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">Founded coaching practice</p>
                    </div>
                    <div class="text-center">
                        <p class="font-serif text-3xl font-bold text-highlighted">ICF L2</p>
                        <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">Certified coach</p>
                    </div>
                    <div class="text-center">
                        <p class="font-serif text-3xl font-bold text-highlighted">400+</p>
                        <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">Leaders coached</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 5 — CALL TO ACTION
             ═══════════════════════════════════════════════════════════ -->
        <section class="border-t border-default">
            <div class="mx-auto max-w-3xl px-6 py-14 text-center md:px-10 md:py-20">
                <p class="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                    Work with Moya
                </p>
                <h2 class="mb-4 font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                    Ready to begin? Let's find out if this is the right fit.
                </h2>
                <p class="mb-8 text-base leading-relaxed text-muted">
                    Start with a complimentary 30-minute conversation. No obligation, no pitch — a real discussion about where you are and what your transition requires.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <UButton
                        to="/contact?type=90"
                        color="secondary"
                        variant="solid"
                        size="lg"
                        class="rounded-full"
                    >
                        Book Alignment Session — £120
                    </UButton>
                    <UButton
                        to="/contact?type=30"
                        color="neutral"
                        variant="outline"
                        size="lg"
                        class="rounded-full"
                    >
                        Complimentary 30-min call
                    </UButton>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
/* ─── HERO WRAPPER ──────────────────────────────────────────────────────── */
.hero {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
}

/* ─── FULL-VIEWPORT BACKGROUND IMAGE ───────────────────────────────────── */
.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

/* ─── LEFT TEXT PANEL ───────────────────────────────────────────────────── */
/* Semi-transparent cream overlay in light, semi-transparent teal in dark */
.hero-left {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    background: linear-gradient(
        to right,
        color-mix(in srgb, var(--ui-bg-elevated) 95%, transparent) 0%,
        color-mix(in srgb, var(--ui-bg-elevated) 95%, transparent) 65%,
        color-mix(in srgb, var(--ui-bg-elevated) 50%, transparent) 82%,
        transparent 100%
    );
    color: var(--ui-text-highlighted);
}

:global(.dark) .hero-left {
    background: linear-gradient(
        to right,
        rgba(0, 95, 112, 0.95) 0%,
        rgba(0, 95, 112, 0.95) 65%,
        rgba(0, 95, 112, 0.50) 82%,
        transparent 100%
    );
    color: #ffffff;
}

.hero-content {
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Badge — light: teal-tinted pill on cream; dark: white-tinted pill on teal */
.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    width: fit-content;
    border-radius: 9999px;
    background-color: rgba(0, 124, 145, 0.08);
    padding: 0.375rem 1rem;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--ui-text-toned);
    box-shadow: 0 0 0 1px rgba(0, 124, 145, 0.2);
}

:global(.dark) .badge {
    background-color: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25);
}

.badge-dot {
    display: block;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 9999px;
    background-color: var(--ui-primary);
    flex-shrink: 0;
}

:global(.dark) .badge-dot {
    background-color: rgba(255, 255, 255, 0.6);
}

.hero-h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--ui-text-highlighted);
    text-wrap: balance;
    margin: 0;
}

:global(.dark) .hero-h1 {
    color: #ffffff;
}

.hero-sub {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--ui-text);
    margin: 0;
}

:global(.dark) .hero-sub {
    color: rgba(255, 255, 255, 0.85);
}

.credentials {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.cred-badge {
    border-radius: 9999px;
    background-color: rgba(0, 124, 145, 0.08);
    padding: 0.375rem 0.875rem;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ui-text-toned);
    box-shadow: 0 0 0 1px rgba(0, 124, 145, 0.2);
}

:global(.dark) .cred-badge {
    background-color: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.75);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

/* Force CTA button colors via scoped selectors */
.cta-primary {
    background-color: #B76E79 !important;
    color: #ffffff !important;
    border-color: #B76E79 !important;
}

/* Light: dark text, teal border; Dark: white text, white border */
.cta-secondary {
    background-color: transparent !important;
    color: var(--ui-text-highlighted) !important;
    border: 1px solid rgba(0, 124, 145, 0.4) !important;
}

.cta-secondary:hover {
    background-color: rgba(0, 124, 145, 0.06) !important;
}

:global(.dark) .cta-secondary {
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

:global(.dark) .cta-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}

/* ─── RIGHT COLUMN ──────────────────────────────────────────────────────── */
.hero-right {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 60% top;
    display: block;
}

/* ─── BIO SECTION ───────────────────────────────────────────────────────── */
.bio-section {
    background-color: #ffffff;
    color: #333333;
    padding: 5rem 2rem;
}

:global(.dark) .bio-section {
    background-color: #1a1a1a;
    color: #F5F0EB;
}

.bio-inner {
    max-width: 800px;
    margin: 0 auto;
}

.bio-inner p {
    font-size: 1.0625rem;
    line-height: 1.75;
    margin-bottom: 1.5rem;
}

.bio-inner p.last-p {
    margin-bottom: 0;
}

.bio-inner strong {
    font-weight: 600;
}

/* ─── TABLET (768px – 1024px) ───────────────────────────────────────────── */
@media (max-width: 1024px) {
    .hero {
        grid-template-columns: 1fr;
        height: 100vh;
    }

    .hero-left {
        padding: 3rem 2rem;
    }
}

/* ─── MOBILE (< 768px) ──────────────────────────────────────────────────── */
@media (max-width: 768px) {
    .hero-left {
        padding: 2rem;
        justify-content: flex-end;
        padding-bottom: 3rem;
    }

    .hero-h1 {
        font-size: 1.75rem;
    }
}
</style>
