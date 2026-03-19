<script setup lang="ts">
const { data: page } = await useAsyncData('page-/about-moya', () => {
    return queryCollection('content').path('/about-moya').first();
});

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const meta = computed(() => {
    const current = page.value ?? {};
    return {
        eyebrow:     (current as any).eyebrow     ?? 'About Moya James',
        subtitle:    (current as any).subtitle,
        tags:        (current as any).tags        ?? [],
        cta:         (current as any).cta,
        cta2:        (current as any).cta2,
        heroBgImage: (current as any).heroBgImage,
        sections:    (current as any).sections    ?? [],
    };
});

useHead(() => ({
    title: page.value?.title
        ? `${page.value.title} · Moya James Leadership`
        : 'About Moya James · Moya James Leadership',
    meta: [
        {
            name: 'description',
            content: (page.value as any)?.description || (page.value as any)?.subtitle || '',
        },
    ],
}));
</script>

<template>
    <div v-if="page">

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 1 — HERO
             Full-viewport two-column grid. Left = text with solid teal
             background. Right = image with blend overlay on left edge.
             ═══════════════════════════════════════════════════════════ -->
        <div class="-mt-10 md:-mt-12 lg:mt-0">
            <section class="hero">

                <!-- Full-viewport background image -->
                <div class="hero-bg" aria-hidden="true">
                    <img
                        :src="meta.heroBgImage"
                        alt="Moya James"
                        class="hero-img"
                    />
                </div>

                <!-- Left text panel: semi-transparent overlay -->
                <div class="hero-left">
                    <div class="hero-content">

                        <!-- Eyebrow badge — light: teal pill; dark: on-dark pill -->
                        <div class="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] backdrop-blur-sm ring-1 bg-(--ui-primary)/6 ring-(--ui-primary)/30 text-(--ui-primary)/80 dark:bg-(--ui-on-dark-pill-bg) dark:ring-(--ui-on-dark-pill-ring) dark:text-(--ui-on-dark-text-soft)">
                            <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-(--ui-primary)/70 dark:bg-(--ui-on-dark-dot)" />
                            {{ meta.eyebrow }}
                        </div>

                        <!-- H1 -->
                        <h1 class="hero-h1 font-serif text-highlighted dark:text-(--ui-on-dark-text)">
                            {{ page.title }}
                        </h1>

                        <!-- Subheading -->
                        <p class="hero-sub text-muted dark:text-(--ui-on-dark-text-soft)">
                            {{ meta.subtitle }}
                        </p>

                        <!-- Credential badges -->
                        <div v-if="meta.tags?.length" class="credentials">
                            <span
                                v-for="tag in meta.tags"
                                :key="tag"
                                class="rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ring-1 bg-(--ui-bg)/80 ring-default text-muted dark:bg-(--ui-on-dark-pill-bg) dark:ring-(--ui-on-dark-pill-ring-sm) dark:text-(--ui-on-dark-text-muted)"
                            >{{ tag }}</span>
                        </div>

                        <!-- CTAs — matches PageHero light/dark split -->
                        <div class="cta-row">
                            <UButton
                                v-if="meta.cta"
                                :to="meta.cta.href"
                                color="secondary"
                                variant="solid"
                                size="lg"
                                trailing-icon="i-heroicons-arrow-right"
                                class="rounded-full"
                            >
                                {{ meta.cta.label }}
                            </UButton>
                            <UButton
                                v-if="meta.cta2"
                                :to="meta.cta2.href"
                                color="neutral"
                                variant="outline"
                                size="lg"
                                class="rounded-full dark:border-(--ui-on-dark-border) dark:text-(--ui-on-dark-text) dark:hover:bg-(--ui-on-dark-hover)"
                            >
                                {{ meta.cta2.label }}
                            </UButton>
                        </div>

                    </div>
                </div>

            </section>
        </div>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 2 — BIO
             Markdown body prose from content/about-moya.md
             ═══════════════════════════════════════════════════════════ -->
        <section class="bio-section">
            <div class="bio-inner">
                <ContentRenderer
                    :value="page"
                    class="prose prose-sm md:prose-base max-w-none"
                />
            </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTIONS 3–5 — DIFFERENTIATORS / CREDIBILITY / ACTION
             Driven by sections[] array in about-moya.md frontmatter
             ═══════════════════════════════════════════════════════════ -->
        <template v-for="section in meta.sections" :key="section.type">

            <!-- Differentiators -->
            <section
                v-if="section.type === 'differentiators'"
                class="border-t border-default"
            >
                <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                    <p v-if="section.eyebrow" class="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                        {{ section.eyebrow }}
                    </p>
                    <h2 class="mb-10 font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                        {{ section.heading }}
                    </h2>
                    <div v-if="section.pillars?.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div
                            v-for="pillar in section.pillars"
                            :key="pillar.label"
                            class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6"
                        >
                            <p class="mb-2 font-semibold text-highlighted">{{ pillar.label }}</p>
                            <p class="text-sm leading-relaxed text-muted">{{ pillar.body }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Credibility stats -->
            <section
                v-else-if="section.type === 'credibility'"
                class="border-t border-default bg-(--ui-bg-elevated)/40"
            >
                <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                    <p v-if="section.eyebrow" class="mb-8 text-center text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                        {{ section.eyebrow }}
                    </p>
                    <div v-if="section.stats?.length" class="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        <div v-for="stat in section.stats" :key="stat.value" class="text-center">
                            <p class="font-serif text-3xl font-bold text-highlighted">{{ stat.value }}</p>
                            <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">{{ stat.label }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Action / CTA -->
            <section
                v-else-if="section.type === 'action'"
                class="border-t border-default"
            >
                <div class="mx-auto max-w-3xl px-6 py-14 text-center md:px-10 md:py-20">
                    <p v-if="section.eyebrow" class="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                        {{ section.eyebrow }}
                    </p>
                    <h2 v-if="section.heading" class="mb-4 font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                        {{ section.heading }}
                    </h2>
                    <p v-if="section.body" class="mb-8 text-base leading-relaxed text-muted">
                        {{ section.body }}
                    </p>
                    <div class="flex flex-wrap justify-center gap-4">
                        <UButton
                            v-if="section.cta"
                            :to="section.cta.href"
                            color="secondary"
                            variant="solid"
                            size="lg"
                            class="rounded-full"
                        >
                            {{ section.cta.label }}
                        </UButton>
                        <UButton
                            v-if="section.cta2"
                            :to="section.cta2.href"
                            color="neutral"
                            variant="outline"
                            size="lg"
                            class="rounded-full"
                        >
                            {{ section.cta2.label }}
                        </UButton>
                    </div>
                </div>
            </section>

        </template>

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

.hero-h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.15;
    text-wrap: balance;
    margin: 0;
}

.hero-sub {
    font-size: 1.125rem;
    line-height: 1.6;
    margin: 0;
}

.credentials {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
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
