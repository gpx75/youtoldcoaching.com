<script setup lang="ts">
// Site + navigation config — editable in Nuxt Studio
const { data: siteData } = await useAsyncData('site', () => {
    return queryCollection('site').first();
});
const { data: navData } = await useAsyncData('footer-nav', () => {
    return queryCollection('navigation').first();
});

const brandName = computed(() => siteData.value?.brand?.name ?? 'Hilda Kilama');
const brandTagline = computed(() => siteData.value?.brand?.tagline ?? 'Hilda Kilama Leadership');
const copyright = computed(
    () => siteData.value?.footer?.copyright ?? 'Hilda Kilama Leadership. All rights reserved.',
);
const contactEmail = computed(() => siteData.value?.contact?.email ?? 'hello@hildakilama.com');
const socialLinks = computed(() => siteData.value?.social ?? []);
const navItems = computed(() => navData.value?.items ?? []);
const navCta = computed(() => navData.value?.cta);
</script>

<template>
    <footer class="relative z-[10000] border-t border-(--ui-gold-accent)/20 bg-(--ui-footer-bg) text-(--ui-on-dark-text)">
        <div class="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <!-- Top section: 3 columns -->
            <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <!-- Column 1: Brand -->
                <div>
                    <div class="flex flex-col leading-none gap-0.5">
                        <span class="font-serif text-xl font-semibold tracking-tight text-(--ui-on-dark-text)">
                            {{ brandName }}
                        </span>
                        <span class="font-sans text-[0.55rem] font-medium tracking-[0.25em] uppercase text-(--ui-gold-accent)">
                            {{ brandTagline }}
                        </span>
                    </div>
                    <p class="mt-4 max-w-xs text-sm leading-relaxed text-(--ui-on-dark-text-soft)">
                        Define Your Path. Own Your Impact.
                    </p>
                    <!-- Social icons -->
                    <div v-if="socialLinks.length" class="mt-5 flex gap-3">
                        <UButton
                            v-for="social in socialLinks"
                            :key="social.label"
                            :to="social.href"
                            target="_blank"
                            :aria-label="social.label"
                            :icon="social.icon"
                            color="neutral"
                            variant="ghost"
                            size="lg"
                            class="text-(--ui-on-dark-text-muted) hover:text-(--ui-gold-accent)"
                        />
                    </div>
                </div>

                <!-- Column 2: Navigation -->
                <div>
                    <h3 class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-(--ui-gold-accent)">
                        Navigation
                    </h3>
                    <ul class="space-y-2.5">
                        <li v-for="item in navItems" :key="item.to">
                            <NuxtLink
                                :to="item.to"
                                class="text-sm text-(--ui-on-dark-text-muted) transition-colors hover:text-(--ui-on-dark-text)"
                            >
                                {{ item.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Column 3: Contact + CTA -->
                <div>
                    <h3 class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-(--ui-gold-accent)">
                        Get in Touch
                    </h3>
                    <a
                        :href="`mailto:${contactEmail}`"
                        class="text-sm text-(--ui-on-dark-text-muted) transition-colors hover:text-(--ui-on-dark-text)"
                    >
                        {{ contactEmail }}
                    </a>
                    <div v-if="navCta" class="mt-5">
                        <UButton
                            :to="navCta.to"
                            color="tertiary"
                            variant="solid"
                            size="md"
                            trailing-icon="i-heroicons-arrow-right"
                            class="rounded-full"
                        >
                            {{ navCta.label }}
                        </UButton>
                    </div>
                </div>
            </div>

            <!-- Bottom bar: separator + copyright -->
            <div class="mt-10 border-t border-(--ui-gold-accent)/15 pt-6 text-center">
                <p class="text-xs text-(--ui-on-dark-text-muted)">
                    &copy; {{ new Date().getFullYear() }} {{ copyright }}
                </p>
            </div>
        </div>
    </footer>
</template>
