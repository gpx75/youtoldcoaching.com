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
        eyebrow: (current as { eyebrow?: string }).eyebrow ?? (meta as { eyebrow?: string }).eyebrow,
        subtitle: (current as { subtitle?: string }).subtitle ?? (meta as { subtitle?: string }).subtitle,
        tags: (current as { tags?: string[] }).tags ?? (meta as { tags?: string[] }).tags,
        cta: (current as { cta?: { label: string; href: string } }).cta ?? (meta as { cta?: { label: string; href: string } }).cta,
        cta2: (current as { cta2?: { label: string; href: string } }).cta2 ?? (meta as { cta2?: { label: string; href: string } }).cta2,
        heroVideo: (current as { heroVideo?: string }).heroVideo ?? (meta as { heroVideo?: string }).heroVideo,
        heroVideoPoster: (current as { heroVideoPoster?: string }).heroVideoPoster ?? (meta as { heroVideoPoster?: string }).heroVideoPoster,
        heroIllustration: (current as { heroIllustration?: string }).heroIllustration ?? (meta as { heroIllustration?: string }).heroIllustration,
        heroIllustrationFill: (current as { heroIllustrationFill?: boolean }).heroIllustrationFill ?? (meta as { heroIllustrationFill?: boolean }).heroIllustrationFill,
        heroSlides: (current as { heroSlides?: string[] }).heroSlides ?? (meta as { heroSlides?: string[] }).heroSlides,
        heroContentScroll: (current as { heroContentScroll?: boolean }).heroContentScroll ?? (meta as { heroContentScroll?: boolean }).heroContentScroll,
    };
});

const { data: extraSlides } = await useAsyncData('slides-' + route.path, async () => {
    const paths = heroMeta.value.heroSlides;
    if (!paths?.length) return [];
    return Promise.all(paths.map(p => queryCollection('content').path(p).first()));
});

const contentSlides = computed(() => [
    page.value,
    ...(extraSlides.value?.filter(Boolean) ?? []),
]);
</script>

<template>
    <div v-if="page" class="lg:h-full">
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
</template>
