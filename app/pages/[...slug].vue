<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
    return queryCollection('content').path(route.path).first();
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
        bodyHeading:          (current as any).bodyHeading          ?? (meta as any).bodyHeading,
        tags:                 (current as any).tags                 ?? (meta as any).tags,
        cta:                  (current as any).cta                  ?? (meta as any).cta,
        cta2:                 (current as any).cta2                 ?? (meta as any).cta2,
        heroVideo:            (current as any).heroVideo            ?? (meta as any).heroVideo,
        heroVideoPoster:      (current as any).heroVideoPoster      ?? (meta as any).heroVideoPoster,
        heroBgImage:          (current as any).heroBgImage          ?? (meta as any).heroBgImage,
        heroIllustration:     (current as any).heroIllustration     ?? (meta as any).heroIllustration,
        heroIllustrationFill: (current as any).heroIllustrationFill ?? (meta as any).heroIllustrationFill,
        heroSlides:           (current as any).heroSlides           ?? (meta as any).heroSlides,
        heroContentScroll:    (current as any).heroContentScroll    ?? (meta as any).heroContentScroll,
        calendlyUrl:          (current as any).calendlyUrl          ?? (meta as any).calendlyUrl,
        sections:             (current as any).sections             ?? (meta as any).sections ?? null,
    };
});

const { data: extraSlides } = await useAsyncData('slides-' + route.path, async () => {
    const paths = heroMeta.value.heroSlides;
    if (!paths?.length) return [];
    return Promise.all(paths.map((p: string) => queryCollection('content').path(p).first()));
});

const contentSlides = computed(() => [
    page.value,
    ...(extraSlides.value?.filter(Boolean) ?? []),
]);

const hasSections = computed(() => (heroMeta.value.sections?.length ?? 0) > 0);

// True when the markdown body has actual content (not just an empty AST)
const hasBody = computed(() => {
    const children = (page.value?.body as any)?.children;
    return Array.isArray(children) && children.length > 0;
});
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
                :bg-image="heroMeta.heroBgImage"
                :video-src="heroMeta.heroVideo"
                :video-poster="heroMeta.heroVideoPoster"
                :illustration="heroMeta.heroIllustration"
                :illustration-fill="heroMeta.heroIllustrationFill"
                :content-scroll="heroMeta.heroContentScroll"
            />
        </div>

        <!-- ── Body prose: bio, recognition, or any markdown body ──────── -->
        <!-- Two-column when bodyHeading is set; full-width prose otherwise -->
        <section
            v-if="hasBody"
            class="border-t border-default"
            :aria-label="heroMeta.bodyHeading || 'Content'"
        >
            <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                <div v-if="heroMeta.bodyHeading" class="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
                    <h2 class="font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                        {{ heroMeta.bodyHeading }}
                    </h2>
                    <ContentRenderer
                        :value="page"
                        class="prose prose-sm md:prose-base max-w-none text-muted"
                    />
                </div>
                <div v-else class="mx-auto max-w-3xl">
                    <ContentRenderer
                        :value="page"
                        class="prose prose-sm md:prose-base max-w-none text-muted"
                    />
                </div>
            </div>
        </section>

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
