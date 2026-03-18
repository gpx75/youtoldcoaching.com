<script setup lang="ts">
const { data: page } = await useAsyncData('page-/', () => {
    return queryCollection('content').path('/').first();
});

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

useHead(() => ({
    title: page.value?.title ? `${page.value.title} · Moya James Leadership` : 'Moya James Leadership',
    meta: [
        {
            name: 'description',
            content:
                page.value?.description ||
                page.value?.subtitle ||
                'Coaching for leaders who want grounded clarity.',
        },
    ],
}));

const heroMeta = computed(() => {
    const current = page.value ?? {};
    const meta = (current as { meta?: Record<string, unknown> }).meta ?? {};
    return {
        eyebrow:              (current as any).eyebrow              ?? (meta as any).eyebrow,
        subtitle:             (current as any).subtitle             ?? (meta as any).subtitle,
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
        sections:             (current as any).sections             ?? (meta as any).sections ?? null,
    };
});

const { data: extraSlides } = await useAsyncData('slides-/', async () => {
    const paths = heroMeta.value.heroSlides;
    if (!paths?.length) return [];
    return Promise.all(paths.map((p: string) => queryCollection('content').path(p).first()));
});

const contentSlides = computed(() => [
    page.value,
    ...(extraSlides.value?.filter(Boolean) ?? []),
]);

const hasSections = computed(() => (heroMeta.value.sections?.length ?? 0) > 0);
</script>

<template>
    <div v-if="page">

        <!-- ── Hero panel: fills viewport on desktop ─────────────────── -->
        <div class="lg:flex lg:h-[calc(100dvh-3.5rem)] lg:flex-col lg:overflow-hidden">
            <PageHero
                :eyebrow="heroMeta.eyebrow"
                :title="page.title"
                :subtitle="heroMeta.subtitle"
                :tags="heroMeta.tags"
                :cta="heroMeta.cta"
                :cta2="heroMeta.cta2"
                :content-slides="contentSlides"
                :video-src="heroMeta.heroVideo"
                :video-poster="heroMeta.heroVideoPoster"
                :illustration="heroMeta.heroIllustration"
                :illustration-fill="heroMeta.heroIllustrationFill"
                :content-scroll="heroMeta.heroContentScroll"
            />
        </div>

        <!-- ── Below-fold: storytelling sections ─────────────────────── -->
        <template v-if="hasSections">
            <template v-for="section in heroMeta.sections" :key="section.type">

                <!-- Recognition: visitor's situation acknowledged -->
                <section
                    v-if="section.type === 'recognition'"
                    class="border-t border-default"
                    :aria-label="section.eyebrow || 'Recognition'"
                >
                    <div class="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14 lg:px-16">
                        <p v-if="section.eyebrow" class="mb-6 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                            {{ section.eyebrow }}
                        </p>
                        <div class="grid gap-6 lg:grid-cols-2 lg:gap-10 lg:items-start">
                            <h2 class="font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                                {{ section.heading }}
                            </h2>
                            <p v-if="section.body" class="text-base leading-relaxed text-muted">
                                {{ section.body }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Framework: methodology or pillars -->
                <section
                    v-else-if="section.type === 'framework' || section.type === 'differentiators'"
                    class="border-t border-default"
                    :aria-label="section.eyebrow || 'Framework'"
                >
                    <div class="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14 lg:px-16">
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
                        <p v-else-if="section.body" class="max-w-2xl text-base leading-relaxed text-muted">
                            {{ section.body }}
                        </p>
                    </div>
                </section>

                <!-- Credibility: proof stats -->
                <section
                    v-else-if="section.type === 'credibility'"
                    class="border-t border-default bg-(--ui-bg-elevated)/40"
                    :aria-label="section.eyebrow || 'Credibility'"
                >
                    <div class="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12 lg:px-16">
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

                <!-- Action: primary CTA band -->
                <section
                    v-else-if="section.type === 'action'"
                    class="border-t border-default"
                    :aria-label="section.eyebrow || 'Call to action'"
                >
                    <div class="mx-auto max-w-3xl px-6 py-12 text-center md:px-10 md:py-16">
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
        </template>

        <!-- ── Below-fold: booking widget (Contact page) ─────────────── -->
        <CalendlyWidget v-if="heroMeta.calendlyUrl" :url="heroMeta.calendlyUrl" />

    </div>
</template>
