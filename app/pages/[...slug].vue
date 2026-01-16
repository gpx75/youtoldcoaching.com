<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead(() => ({
  title: page.value?.title ? `${page.value.title} · You Told Coaching` : 'You Told Coaching',
  meta: [
    {
      name: 'description',
      content: page.value?.description || page.value?.subtitle || 'Coaching for leaders who want grounded clarity.',
    },
  ],
}))
</script>

<template>
  <div v-if="page" class="space-y-0">
    <PageHero
      :eyebrow="page.eyebrow"
      :title="page.title"
      :subtitle="page.subtitle"
      :tags="page.tags"
      :cta="page.cta"
    />

    <div class="divider" />
    <section class="w-full bg-base-100 px-6 py-12 text-center sm:px-10 lg:px-16">
      <ContentRenderer
        :value="page"
        class="prose prose-lg mx-auto max-w-3xl prose-headings:text-center prose-p:text-center prose-li:text-center prose-p:text-base-content/80 prose-li:text-base-content/80 prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-secondary"
      />
    </section>
  </div>
</template>
