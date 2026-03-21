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
        heroBgImage:  (current as any).heroBgImage,
        subtitleFont: (current as any).subtitleFont,
        sections:     (current as any).sections    ?? [],
    };
});

const { titleSuffix, defaultDescription } = useSiteConfig()

useHead(() => ({
    title: page.value?.title
        ? `${page.value.title} · ${titleSuffix.value}`
        : titleSuffix.value,
    meta: [
        {
            name: 'description',
            content: (page.value as any)?.description || (page.value as any)?.subtitle || defaultDescription.value,
        },
    ],
}));
</script>

<template>
    <div v-if="page">

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 1 — HERO
             Full-viewport two-column grid. Left = text with gradient
             overlay. Right = background image visible through grid.
             ═══════════════════════════════════════════════════════════ -->
        <div>
            <section class="relative grid grid-cols-1 lg:grid-cols-2 min-h-dvh lg:h-dvh w-full overflow-hidden">

                <!-- Full-viewport background image -->
                <div class="absolute inset-0 z-0" aria-hidden="true">
                    <img
                        :src="meta.heroBgImage"
                        alt="Moya James"
                        class="block h-full w-full object-cover object-[60%_top]"
                    />
                </div>

                <!-- Left text panel: gradient overlay + content -->
                <div class="about-hero-gradient relative z-[1] flex flex-col justify-center p-8 pt-[55dvh] md:px-8 md:py-12 lg:p-16 lg:pt-16 max-md:pb-12">
                    <div class="flex max-w-[560px] flex-col gap-6">

                        <!-- Eyebrow badge — light: teal pill; dark: on-dark pill -->
                        <div class="inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] backdrop-blur-sm ring-1 bg-(--ui-primary)/6 ring-(--ui-primary)/30 text-(--ui-primary)/80 dark:bg-(--ui-on-dark-pill-bg) dark:ring-(--ui-on-dark-pill-ring) dark:text-(--ui-on-dark-text-soft)">
                            <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-(--ui-primary)/70 dark:bg-(--ui-on-dark-dot)" />
                            {{ meta.eyebrow }}
                        </div>

                        <!-- H1 -->
                        <h1 class="hero-title m-0 text-highlighted dark:text-(--ui-on-dark-text)">
                            {{ page.title }}
                        </h1>

                        <!-- Subheading -->
                        <p
                            class="m-0 leading-relaxed text-muted dark:text-(--ui-on-dark-text-soft)"
                            :class="meta.subtitleFont === 'script' ? 'subtitle-script' : 'text-lg'"
                        >
                            {{ meta.subtitle }}
                        </p>

                        <!-- Credential badges -->
                        <div v-if="meta.tags?.length" class="flex flex-wrap gap-2">
                            <span
                                v-for="tag in meta.tags"
                                :key="tag"
                                class="rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ring-1 bg-(--ui-bg)/80 ring-default text-muted dark:bg-(--ui-on-dark-pill-bg) dark:ring-(--ui-on-dark-pill-ring-sm) dark:text-(--ui-on-dark-text-muted)"
                            >{{ tag }}</span>
                        </div>

                        <!-- CTAs — matches PageHero light/dark split -->
                        <div class="flex flex-wrap gap-3">
                            <UButton
                                v-if="meta.cta"
                                :to="meta.cta.href"
                                color="secondary"
                                variant="solid"
                                size="lg"
                                trailing-icon="i-heroicons-arrow-right"
                            >
                                {{ meta.cta.label }}
                            </UButton>
                            <UButton
                                v-if="meta.cta2"
                                :to="meta.cta2.href"
                                color="warning"
                                variant="solid"
                                size="lg"
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
        <section class="bg-default py-20 px-8">
            <div class="mx-auto max-w-[800px]">
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
        <StorySection
            v-for="section in meta.sections"
            :key="section.type"
            :section="section"
        />

    </div>
</template>
