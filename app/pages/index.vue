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



const hasSections = computed(() => (heroMeta.value.sections?.length ?? 0) > 0);
</script>

<template>
    <div v-if="page">

        <!-- ── Homepage Hero: London aerial + Moya portrait ──────────── -->
        <section class="relative flex w-full flex-col overflow-hidden lg:h-dvh">

            <!-- Background: London aerial with deep teal overlay -->
            <div class="pointer-events-none absolute inset-0 z-0">
                <img
                    src="/images/pexels-pierre-blache-651604-2834219.jpg"
                    alt=""
                    aria-hidden="true"
                    class="h-full w-full object-cover object-center"
                />
                <div class="absolute inset-0 bg-(--ui-primary)/55" />
            </div>

            <!-- Bottom fade: blend hero into page background -->
            <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 bg-linear-to-t from-default to-transparent" />

            <!-- Content row -->
            <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 md:px-10 lg:flex-row lg:items-stretch lg:px-16">

                <!-- Left column (60%): tagline, headline, CTAs -->
                <div class="flex flex-col justify-start pb-10 lg:w-[58%] lg:justify-center lg:py-20 lg:pr-14">

                    <!-- Eyebrow -->
                    <div
                        v-if="heroMeta.eyebrow"
                        class="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/80 ring-1 ring-white/25 backdrop-blur-sm"
                    >
                        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                        {{ heroMeta.eyebrow }}
                    </div>

                    <!-- Headline -->
                    <h1 class="mb-5 font-serif font-bold text-balance text-white text-[2.4rem] leading-tight sm:text-5xl lg:text-[3.8rem] lg:leading-[1.1]">
                        {{ page.title }}
                    </h1>

                    <!-- Subtitle -->
                    <p
                        v-if="heroMeta.subtitle"
                        class="mb-8 max-w-lg text-base leading-relaxed text-white/80 text-balance sm:text-lg"
                    >
                        {{ heroMeta.subtitle }}
                    </p>

                    <!-- Tags -->
                    <div v-if="heroMeta.tags?.length" class="mb-8 flex flex-wrap gap-2">
                        <span
                            v-for="tag in heroMeta.tags"
                            :key="tag"
                            class="rounded-full bg-white/10 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/70 ring-1 ring-white/20 backdrop-blur-sm"
                        >
                            {{ tag }}
                        </span>
                    </div>

                    <!-- CTAs -->
                    <div class="flex flex-wrap gap-3">
                        <UButton
                            v-if="heroMeta.cta"
                            :to="heroMeta.cta.href"
                            color="secondary"
                            variant="solid"
                            size="lg"
                            trailing-icon="i-heroicons-arrow-right"
                            class="rounded-full"
                        >
                            {{ heroMeta.cta.label }}
                        </UButton>
                        <UButton
                            v-if="heroMeta.cta2"
                            :to="heroMeta.cta2.href"
                            color="neutral"
                            variant="ghost"
                            size="lg"
                            class="rounded-full border border-white/30 text-white hover:bg-white/10"
                        >
                            {{ heroMeta.cta2.label }}
                        </UButton>
                    </div>
                </div>

                <!-- Right column (42%): Moya portrait — mobile in flow, desktop absolute -->
                <div class="flex justify-center pb-8 lg:hidden">
                    <img
                        src="/images/moya.png"
                        alt="Moya James"
                        class="w-64 max-w-xs object-contain"
                    />
                </div>

            </div>

            <!-- Desktop portrait: absolutely anchored, fades in from left -->
            <img
                src="/images/moya.png"
                alt="Moya James"
                aria-hidden="true"
                class="pointer-events-none absolute bottom-0 right-6 hidden h-[105dvh] w-auto object-contain object-bottom lg:block mask-[linear-gradient(to_right,transparent_0%,black_18%)]"
            />
        </section>

        <!-- ── Recognition: body prose from index.md ────────────────── -->
        <section class="border-t border-default" aria-label="Recognition">
            <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                <div class="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
                    <h2 class="font-serif text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
                        Where are you right now?
                    </h2>
                    <ContentRenderer
                        :value="page"
                        class="prose prose-sm md:prose-base max-w-none text-muted"
                    />
                </div>
            </div>
        </section>

        <!-- ── Below-fold: storytelling sections ─────────────────────── -->
        <!-- Structure: Framework → Credibility → Action -->
        <template v-if="hasSections">
            <template v-for="section in heroMeta.sections" :key="section.type">

                <!-- Recognition: visitor's situation acknowledged -->
                <section
                    v-if="section.type === 'recognition'"
                    class="border-t border-default"
                    :aria-label="section.eyebrow || 'Recognition'"
                >
                    <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20 lg:px-16">
                        <p v-if="section.eyebrow" class="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70">
                            {{ section.eyebrow }}
                        </p>
                        <div class="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-start">
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

                <!-- Action: primary CTA band -->
                <section
                    v-else-if="section.type === 'action'"
                    class="border-t border-default"
                    :aria-label="section.eyebrow || 'Call to action'"
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
        </template>

        <!-- ── Below-fold: booking widget (Contact page) ─────────────── -->
        <CalendlyWidget v-if="heroMeta.calendlyUrl" :url="heroMeta.calendlyUrl" />

    </div>
</template>
