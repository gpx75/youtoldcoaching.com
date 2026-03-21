<script setup lang="ts">
// Navigation driven by content/navigation.yml — editable in Nuxt Studio
const { data: navData } = await useAsyncData('navigation', () => {
    return queryCollection('navigation').first();
});

const navigation = computed(() => navData.value?.items ?? []);
const navCta = computed(() => navData.value?.cta);
const brandName = computed(() => navData.value?.brand?.name ?? 'Moya James');
const brandTagline = computed(() => navData.value?.brand?.tagline ?? '');
</script>

<template>
    <UHeader :title="brandName">
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
                color="secondary"
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
                color="secondary"
                variant="solid"
                class="mt-4 sm:hidden"
            >
                {{ navCta.label }}
            </UButton>
        </template>
    </UHeader>
</template>
