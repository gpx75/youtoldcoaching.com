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
    icon?: string;
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
    <Motion
        v-if="section.type === 'recognition'"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :in-view-options="{ once: true }"
    >
        <UPageSection
            :headline="section.eyebrow"
            :title="section.heading"
            :description="section.body"
            orientation="horizontal"
            :aria-label="section.eyebrow || 'Recognition'"
            :ui="{
                root: 'border-t border-default',
            }"
        />
    </Motion>

    <!-- Framework / Differentiators: methodology pillars -->
    <Motion
        v-else-if="section.type === 'framework' || section.type === 'differentiators'"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :in-view-options="{ once: true }"
    >
        <UPageSection
            :headline="section.eyebrow"
            :title="section.heading"
            :aria-label="section.eyebrow || 'Framework'"
            :ui="{
                root: 'border-t border-default',
            }"
        >
            <template #body>
                <div v-if="section.pillars?.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Motion
                        v-for="(pillar, i) in section.pillars"
                        :key="pillar.label"
                        :initial="{ opacity: 0, y: 16 }"
                        :while-in-view="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.5, delay: 0.1 * i }"
                        :in-view-options="{ once: true }"
                        class="rounded-xl border border-default bg-(--ui-bg-elevated)/60 p-6 transition-colors duration-200 hover:border-(--ui-border-accented)"
                    >
                        <UIcon v-if="pillar.icon" :name="pillar.icon" class="mb-2 size-5 text-primary" />
                        <p class="mb-2 font-semibold text-highlighted">{{ pillar.label }}</p>
                        <p class="text-sm leading-relaxed text-muted">{{ pillar.body }}</p>
                    </Motion>
                </div>
                <p v-else-if="section.body" class="max-w-2xl text-base leading-relaxed text-muted">
                    {{ section.body }}
                </p>
            </template>
        </UPageSection>
    </Motion>

    <!-- Credibility: proof stats -->
    <Motion
        v-else-if="section.type === 'credibility'"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :in-view-options="{ once: true }"
    >
        <UPageSection
            :headline="section.eyebrow"
            :aria-label="section.eyebrow || 'Credibility'"
            :ui="{
                root: 'border-t border-default bg-(--ui-bg-elevated)/40',
                headline: 'justify-center text-center',
            }"
        >
            <template #body>
                <div v-if="section.stats?.length" class="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <Motion
                        v-for="(stat, i) in section.stats"
                        :key="stat.value"
                        :initial="{ opacity: 0, y: 12 }"
                        :while-in-view="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.5, delay: 0.1 * i }"
                        :in-view-options="{ once: true }"
                        class="text-center"
                    >
                        <p class="font-serif text-2xl font-bold text-highlighted sm:text-4xl">{{ stat.value }}</p>
                        <p class="mt-1.5 text-xs uppercase tracking-wide text-muted">{{ stat.label }}</p>
                    </Motion>
                </div>
            </template>
        </UPageSection>
    </Motion>

    <!-- Action: primary CTA band -->
    <Motion
        v-else-if="section.type === 'action'"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :in-view-options="{ once: true }"
    >
        <UPageSection
            :headline="section.eyebrow"
            :title="section.heading"
            :description="section.body"
            :links="[
                ...(section.cta ? [{ label: section.cta.label, to: section.cta.href, color: 'secondary' as const, variant: 'solid' as const, size: 'lg' as const }] : []),
                ...(section.cta2 ? [{ label: section.cta2.label, to: section.cta2.href, color: 'warning' as const, variant: 'solid' as const, size: 'lg' as const }] : []),
            ]"
            :aria-label="section.eyebrow || 'Call to action'"
            :ui="{
                root: 'border-t border-default',
                container: 'max-w-3xl',
            }"
        />
    </Motion>
</template>
