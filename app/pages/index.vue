<script setup lang="ts">
const { data: page } = await useAsyncData('page-/', () => {
    return queryCollection('content').path('/').first();
});

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const { titleSuffix, defaultDescription } = useSiteSettings()

useHead(() => ({
    title: page.value?.title ? `${page.value.title} · ${titleSuffix.value}` : titleSuffix.value,
    meta: [
        {
            name: 'description',
            content:
                page.value?.description ||
                page.value?.subtitle ||
                defaultDescription.value,
        },
    ],
}));

const heroMeta = computed(() => {
    const current = page.value ?? {};
    const meta = (current as { meta?: Record<string, unknown> }).meta ?? {};
    return {
        eyebrow:              (current as any).eyebrow              ?? (meta as any).eyebrow,
        subtitle:             (current as any).subtitle             ?? (meta as any).subtitle,
        bodyHeading:          (current as any).bodyHeading          ?? (meta as any).bodyHeading,
        tags:                 (current as any).tags                 ?? (meta as any).tags,
        cta:                  (current as any).cta                  ?? (meta as any).cta,
        cta2:                 (current as any).cta2                 ?? (meta as any).cta2,
        heroVideo:            (current as any).heroVideo            ?? (meta as any).heroVideo,
        heroVideoPoster:      (current as any).heroVideoPoster      ?? (meta as any).heroVideoPoster,
        heroIllustration:     (current as any).heroIllustration     ?? (meta as any).heroIllustration,
        heroIllustrationFill: (current as any).heroIllustrationFill ?? (meta as any).heroIllustrationFill,
        heroSlides:           (current as any).heroSlides           ?? (meta as any).heroSlides,
        heroContentScroll:    (current as any).heroContentScroll    ?? (meta as any).heroContentScroll,
        calendlyUrl:          (current as any).calendlyUrl          ?? (meta as any).calendlyUrl,
        subtitleFont:         (current as any).subtitleFont         ?? (meta as any).subtitleFont,
        sections:             (current as any).sections             ?? (meta as any).sections ?? null,
        // Light/dark background images and portrait — from frontmatter
        heroBgLight:   (current as any).heroBg?.light   ?? (meta as any).heroBg?.light,
        heroBgDark:    (current as any).heroBg?.dark    ?? (meta as any).heroBg?.dark,
        heroPortrait:  (current as any).heroPortrait    ?? (meta as any).heroPortrait,
    };
});



const hasSections = computed(() => (heroMeta.value.sections?.length ?? 0) > 0);
</script>

<template>
    <div v-if="page">

        <!-- ── Homepage Hero: London aerial + Moya portrait ──────────── -->
        <section class="relative flex w-full flex-col overflow-hidden lg:h-dvh">

            <!-- Background: London day (light) / London night (dark) with teal overlay -->
            <div class="pointer-events-none absolute inset-0 z-0">
                <UColorModeImage
                    :light="heroMeta.heroBgLight"
                    :dark="heroMeta.heroBgDark"
                    alt=""
                    aria-hidden="true"
                    class="h-full w-full object-cover object-center"
                />
            </div>

            <!-- Cream/teal gradient from viewport left:0 — sits above bg, below content -->
            <div class="hero-gradient-panel pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

            <!-- Bottom fade: blend hero into page background -->
            <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 bg-linear-to-t from-default to-transparent" />

            <!-- Content row -->
            <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 md:px-10 lg:flex-row lg:items-stretch lg:px-16">

                <!-- Left column (60%): tagline, headline, CTAs -->
                <div class="flex flex-col justify-start pt-6 pb-10 lg:w-[58%] lg:justify-center lg:py-20 lg:pr-14">

                    <!-- Eyebrow -->
                    <Motion
                        v-if="heroMeta.eyebrow"
                        :initial="{ opacity: 0, filter: 'blur(10px)', y: 8 }"
                        :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                        :transition="{ duration: 0.5, delay: 0.1 }"
                        class="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-(--ui-primary)/6 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/80 ring-1 ring-(--ui-primary)/30 backdrop-blur-sm dark:bg-(--ui-on-dark-pill-bg) dark:text-(--ui-on-dark-text-soft) dark:ring-(--ui-on-dark-pill-ring)"
                    >
                        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-(--ui-primary)/70 dark:bg-(--ui-on-dark-dot)" />
                        {{ heroMeta.eyebrow }}
                    </Motion>

                    <!-- Headline -->
                    <Motion
                        tag="h1"
                        :initial="{ opacity: 0, filter: 'blur(12px)', y: 12 }"
                        :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                        :transition="{ duration: 0.6, delay: 0.2 }"
                        class="hero-title mb-5 text-highlighted dark:text-(--ui-on-dark-text)"
                    >
                        {{ page.title }}
                    </Motion>

                    <!-- Subtitle -->
                    <Motion
                        v-if="heroMeta.subtitle"
                        tag="p"
                        :initial="{ opacity: 0, y: 10 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.5, delay: 0.4 }"
                        class="mb-8 max-w-lg leading-relaxed text-muted dark:text-(--ui-on-dark-text-soft) text-balance"
                        :class="heroMeta.subtitleFont === 'script' ? 'subtitle-script' : 'text-base sm:text-lg'"
                    >
                        {{ heroMeta.subtitle }}
                    </Motion>

                    <!-- Tags -->
                    <Motion
                        v-if="heroMeta.tags?.length"
                        :initial="{ opacity: 0, y: 10 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.5, delay: 0.5 }"
                        class="mb-8 flex flex-wrap gap-2"
                    >
                        <span
                            v-for="tag in heroMeta.tags"
                            :key="tag"
                            class="rounded-full bg-(--ui-bg)/80 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted ring-1 ring-default backdrop-blur-sm dark:bg-(--ui-on-dark-pill-bg) dark:text-(--ui-on-dark-text-muted) dark:ring-(--ui-on-dark-pill-ring-sm)"
                        >
                            {{ tag }}
                        </span>
                    </Motion>

                    <!-- CTAs -->
                    <Motion
                        :initial="{ opacity: 0, y: 10 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.5, delay: 0.6 }"
                        class="flex flex-wrap gap-3"
                    >
                        <UButton
                            v-if="heroMeta.cta"
                            :to="heroMeta.cta.href"
                            color="secondary"
                            variant="solid"
                            size="lg"
                            trailing-icon="i-heroicons-arrow-right"
                        >
                            {{ heroMeta.cta.label }}
                        </UButton>
                        <UButton
                            v-if="heroMeta.cta2"
                            :to="heroMeta.cta2.href"
                            color="warning"
                            variant="solid"
                            size="lg"
                        >
                            {{ heroMeta.cta2.label }}
                        </UButton>
                    </Motion>
                </div>

                <!-- Right column: Moya portrait — mobile: cropped half-body anchored at bottom -->
                <Motion
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.7, delay: 0.5 }"
                    class="flex justify-end items-end overflow-hidden lg:hidden"
                >
                    <img
                        :src="heroMeta.heroPortrait"
                        alt="Moya James"
                        class="h-80 w-auto max-w-[75%] object-cover object-top"
                    />
                </Motion>

            </div>

            <!-- Desktop portrait: absolutely anchored, fades in from right -->
            <Motion
                :initial="{ opacity: 0, x: 40 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.8, delay: 0.4 }"
                class="pointer-events-none absolute bottom-0 -right-32 hidden lg:block"
            >
                <img
                    :src="heroMeta.heroPortrait"
                    alt="Moya James"
                    aria-hidden="true"
                    class="h-[95dvh] w-auto object-contain object-bottom mask-[linear-gradient(to_right,transparent_0%,black_18%)]"
                />
            </Motion>
        </section>

        <!-- ── Recognition: body prose from index.md ────────────────── -->
        <Motion
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6 }"
            :in-view-options="{ once: true }"
            tag="section"
            class="border-t border-default"
            aria-label="Recognition"
        >
            <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                <div class="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
                    <h2 class="font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                        {{ heroMeta.bodyHeading }}
                    </h2>
                    <ContentRenderer
                        :value="page"
                        class="prose prose-sm md:prose-base max-w-none text-muted"
                    />
                </div>
            </div>
        </Motion>

        <!-- ── Below-fold: storytelling sections ─────────────────────── -->
        <template v-if="hasSections">
            <StorySection
                v-for="section in heroMeta.sections"
                :key="section.type"
                :section="section"
            />
        </template>

        <!-- ── Below-fold: booking widget (Contact page) ─────────────── -->
        <CalendlyWidget v-if="heroMeta.calendlyUrl" :url="heroMeta.calendlyUrl" />

    </div>
</template>
