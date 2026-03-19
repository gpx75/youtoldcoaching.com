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
    <footer class="border-t border-(--ui-primary)/25 bg-default px-4 py-5 sm:px-6 lg:px-8">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
            <Logo size="sm" :name="brandName" :tagline="brandTagline" />
            <p class="text-sm text-dimmed">
                &copy; {{ new Date().getFullYear() }} {{ copyright }}
            </p>
        </div>
    </footer>
</template>
