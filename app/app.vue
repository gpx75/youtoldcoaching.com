<script setup lang="ts">
const { data: siteData } = await useAsyncData('site-meta', () => {
    return queryCollection('site').first()
})

const brandName = computed(() => siteData.value?.brand?.name ?? '')
const titleSuffix = computed(() => siteData.value?.metaDefaults?.titleSuffix ?? brandName.value)
const siteDescription = computed(() => siteData.value?.metaDefaults?.description ?? '')

useHead(() => ({
  title: titleSuffix.value,
  htmlAttrs: { lang: 'en' },
  link: [],
  meta: [
    { name: 'description', content: siteDescription.value },
  ],
}))
</script>

<template>
  <UApp>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </UApp>
</template>
