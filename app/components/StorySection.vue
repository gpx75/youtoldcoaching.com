<script setup lang="ts">
/**
 * StorySection — shared renderer for below-fold storytelling sections.
 *
 * Driven by the `sections[]` array in page frontmatter.
 * Supports: recognition, framework, differentiators, credibility, action.
 */

interface SectionCta {
    label: string;
    href: string;
}

interface Pillar {
    label: string;
    body: string;
}

interface Stat {
    value: string;
    label: string;
}

interface StorySection {
    type: 'recognition' | 'framework' | 'differentiators' | 'credibility' | 'action';
    eyebrow?: string;
    heading?: string;
    body?: string;
    pillars?: Pillar[];
    stats?: Stat[];
    cta?: SectionCta;
    cta2?: SectionCta;
}

defineProps<{
    section: StorySection;
}>();
</script>

<template>
    <!-- Recognition: visitor's situation acknowledged (two-column layout) -->
    <UPageSection
        v-if="section.type === 'recognition'"
        :headline="section.eyebrow"
        :title="section.heading"
        :description="section.body"
        orientation="horizontal"
        :aria-label="section.eyebrow || 'Recognition'"
        :ui="{
            root: 'border-t border-default',
        }"
    />

    <!-- Framework / Differentiators: methodology pillars -->
    <UPageSection
        v-else-if="section.type === 'framework' || section.type === 'differentiators'"
        :headline="section.eyebrow"
        :title="section.heading"
        :aria-label="section.eyebrow || 'Framework'"
        :ui="{
            root: 'border-t border-default',
        }"
    >
        <template #body>
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
        </template>
    </UPageSection>

    <!-- Credibility: proof stats -->
    <UPageSection
        v-else-if="section.type === 'credibility'"
        :headline="section.eyebrow"
        :aria-label="section.eyebrow || 'Credibility'"
        :ui="{
            root: 'border-t border-default bg-(--ui-bg-elevated)/40',
            headline: 'justify-center text-center',
        }"
    >
        <template #body>
            <div v-if="section.stats?.length" class="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div v-for="stat in section.stats" :key="stat.value" class="text-center">
                    <p class="font-serif text-3xl font-bold text-highlighted">{{ stat.value }}</p>
                    <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">{{ stat.label }}</p>
                </div>
            </div>
        </template>
    </UPageSection>

    <!-- Action: primary CTA band -->
    <UPageSection
        v-else-if="section.type === 'action'"
        :headline="section.eyebrow"
        :title="section.heading"
        :description="section.body"
        :links="[
            ...(section.cta ? [{ label: section.cta.label, to: section.cta.href, color: 'secondary' as const, variant: 'solid' as const, size: 'lg' as const, class: 'rounded-full' }] : []),
            ...(section.cta2 ? [{ label: section.cta2.label, to: section.cta2.href, color: 'warning' as const, variant: 'solid' as const, size: 'lg' as const, class: 'rounded-full' }] : []),
        ]"
        :aria-label="section.eyebrow || 'Call to action'"
        :ui="{
            root: 'border-t border-default',
            container: 'max-w-3xl',
        }"
    />
</template>
