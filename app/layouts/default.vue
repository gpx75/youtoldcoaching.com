<script setup lang="ts">
const route = useRoute()
const pageScrollable = computed(() => route.path === '/book')
</script>

<template>
    <div :class="['flex flex-col', !pageScrollable && 'lg:h-dvh lg:overflow-hidden']">
        <BackgroundPattern />
        <SiteHeader />
        <main :class="['flex-1', !pageScrollable && 'lg:min-h-0 lg:overflow-hidden']">
            <slot />
        </main>
        <SiteFooter />
    </div>
</template>
