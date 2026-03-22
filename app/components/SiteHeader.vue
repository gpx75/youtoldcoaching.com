<script setup lang="ts">
// Navigation driven by content/navigation.yml — editable in Nuxt Studio
const { data: navData } = await useAsyncData('navigation', () => {
    return queryCollection('navigation').first();
});

const navigation = computed(() => navData.value?.items ?? []);
const navCta = computed(() => navData.value?.cta);
const brandName = computed(() => navData.value?.brand?.name ?? 'Moya James');
const brandTagline = computed(() => navData.value?.brand?.tagline ?? '');

// Scroll-aware header: transparent at top, frosted glass + rose accent when scrolled
const scrolled = ref(false);
function onScroll() {
    scrolled.value = window.scrollY > 40;
}
onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});

const headerUi = computed(() => ({
    root: scrolled.value
        ? 'bg-default/80 backdrop-blur-lg border-b-2 border-(--ui-color-secondary-400) shadow-sm'
        : 'bg-transparent backdrop-blur-none border-b border-transparent',
}));
</script>

<template>
    <UHeader :title="brandName" :ui="headerUi">
        <!-- Primary accent bar above the header -->
        <template #top>
            <div class="h-0.5 bg-primary" />
        </template>

        <!-- Logo replaces default title -->
        <template #title>
            <Logo size="md" :name="brandName" :tagline="brandTagline" />
        </template>

        <!-- Desktop nav: horizontal navigation menu -->
        <template #default>
            <UNavigationMenu :items="navigation" />
        </template>

        <!-- Right side: CTA + color mode toggle -->
        <template #right>
            <UButton
                v-if="navCta"
                :to="navCta.to"
                color="tertiary"
                variant="solid"
                size="sm"
                class="hidden sm:flex"
            >
                {{ navCta.label }}
            </UButton>
            <ColorModeButton />
        </template>

        <!-- Mobile menu body -->
        <template #body>
            <UNavigationMenu orientation="vertical" :items="navigation" />
            <UButton
                v-if="navCta"
                :to="navCta.to"
                color="tertiary"
                variant="solid"
                class="mt-4 sm:hidden"
            >
                {{ navCta.label }}
            </UButton>
        </template>
    </UHeader>
</template>
