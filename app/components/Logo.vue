<script setup lang="ts">
defineProps<{
    size?: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
    <div class="flex flex-col leading-none gap-0.5">
        <div
            :class="{ 'text-lg': size === 'sm', 'text-xl': size === 'md', 'text-3xl': size === 'lg' }"
            class="font-serif font-semibold tracking-tight text-highlighted"
        >
            Moya James
        </div>
        <span
            :class="{ 'text-[0.5rem]': size === 'sm', 'text-[0.55rem]': size === 'md', 'text-[0.65rem]': size === 'lg' }"
            class="font-sans font-medium tracking-[0.25em] uppercase text-dimmed"
        >Youtold Coaching</span>
    </div>
</template>
