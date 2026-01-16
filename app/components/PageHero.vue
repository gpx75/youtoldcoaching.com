<script setup lang="ts">
const props = defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  tags?: string[]
  cta?: { label: string; href: string }
}>()
</script>

<template>
  <section class="hero bg-base-200 py-10">
    <div class="hero-content text-center">
      <div class="max-w-4xl space-y-6">
        <p v-if="props.eyebrow" class="text-xs font-semibold uppercase tracking-[0.3em] text-base-content/60">
          {{ props.eyebrow }}
        </p>
        <h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">
          {{ props.title }}
        </h1>
        <p v-if="props.subtitle" class="text-base text-base-content/70 sm:text-lg">
          {{ props.subtitle }}
        </p>
        <div v-if="props.tags?.length" class="flex flex-wrap justify-center gap-3">
          <span
            v-for="tag in props.tags"
            :key="tag"
            class="badge badge-outline px-4 py-3 text-xs font-semibold uppercase tracking-wide"
          >
            {{ tag }}
          </span>
        </div>
        <div v-if="props.cta">
          <NuxtLink :to="props.cta.href" class="btn btn-secondary rounded-full">
            {{ props.cta.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
