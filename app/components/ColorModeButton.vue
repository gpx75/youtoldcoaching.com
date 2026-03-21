<script setup lang="ts">
const colorMode = useColorMode()

const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

const switchTheme = () => {
    colorMode.preference = nextTheme.value
}

const startViewTransition = (event: MouseEvent) => {
    if (!(document as any).startViewTransition) {
        switchTheme()
        return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
    )

    const transition = (document as any).startViewTransition(() => {
        switchTheme()
    })

    transition.ready.then(() => {
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 650,
                easing: 'cubic-bezier(.76,.32,.29,.99)',
                pseudoElement: '::view-transition-new(root)',
            },
        )
    })
}
</script>

<template>
    <ClientOnly>
        <UButton
            :aria-label="`Switch to ${nextTheme} mode`"
            :icon="nextTheme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-full"
            @click="startViewTransition"
        />
    </ClientOnly>
</template>
