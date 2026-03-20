<script setup lang="ts">
// Site config driven by content/site.yml — editable in Nuxt Studio
const { data: siteData } = await useAsyncData('site', () => {
    return queryCollection('site').first();
});

const brandName = computed(() => siteData.value?.brand?.name ?? 'Moya James');
const brandTagline = computed(() => siteData.value?.brand?.tagline ?? 'Moya James Leadership');
const copyright = computed(
    () => siteData.value?.footer?.copyright ?? 'Moya James Leadership. All rights reserved.',
);
</script>

<template>
    <UFooter>
        <template #left>
            <Logo size="sm" :name="brandName" :tagline="brandTagline" />
        </template>
        <template #right>
            <p class="text-sm text-dimmed">
                &copy; {{ new Date().getFullYear() }} {{ copyright }}
            </p>
        </template>
    </UFooter>
</template>
