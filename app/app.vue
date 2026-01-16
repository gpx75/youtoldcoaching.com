<script setup lang="ts">
useHead(() => ({
  title: 'You Told Coaching',
  htmlAttrs: { lang: 'en', 'data-theme': 'cupcake' },
  link: [],
  meta: [
    { name: 'description', content: 'Coaching for leaders who want grounded clarity and sustainable momentum.' },
  ],
}))
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
