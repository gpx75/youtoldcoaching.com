<script setup lang="ts">
const navigation = [
    { label: 'Home',                    to: '/' },
    { label: 'About Moya',              to: '/about-moya' },
    { label: 'Services',                to: '/services' },
    { label: 'Pathwise™ Framework',     to: '/pathwise-framework' },
    { label: 'Client Success Stories',  to: '/client-success' },
    { label: 'Contact',                 to: '/contact' },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
const toggleTheme = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark';
};

const isMenuOpen = ref(false);
const route = useRoute();
watch(() => route.path, () => { isMenuOpen.value = false; });
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-default bg-default/80 backdrop-blur-md">
        <!-- Primary accent bar -->
        <div class="h-0.5 bg-primary" />
        <div class="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <!-- Logo -->
            <NuxtLink to="/" class="mr-2 shrink-0">
                <Logo size="md" />
            </NuxtLink>

            <!-- Desktop nav -->
            <nav class="hidden flex-1 items-center gap-0.5 lg:flex">
                <ULink
                    v-for="item in navigation"
                    :key="item.to"
                    :to="item.to"
                    :exact="item.to === '/'"
                    class="rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors"
                    active-class="text-primary font-semibold underline decoration-(--ui-primary)/40 underline-offset-4 decoration-2"
                    inactive-class="text-muted hover:text-default hover:bg-elevated"
                >
                    {{ item.label }}
                </ULink>
            </nav>

            <!-- Actions -->
            <div class="ml-auto flex items-center gap-1.5">
                <UButton
                    to="/contact"
                    color="secondary"
                    variant="solid"
                    size="sm"
                    class="hidden rounded-full sm:flex"
                >
                    Book a Session
                </UButton>

                <UButton
                    :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                    @click="toggleTheme"
                />

                <UButton
                    :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    aria-label="Toggle menu"
                    class="lg:hidden"
                    @click="isMenuOpen = !isMenuOpen"
                />
            </div>
        </div>

        <!-- Mobile nav -->
        <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="-translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-1 opacity-0"
        >
            <div v-if="isMenuOpen" class="border-t border-default bg-default lg:hidden">
                <nav class="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-3">
                    <ULink
                        v-for="item in navigation"
                        :key="item.to + '-mobile'"
                        :to="item.to"
                        :exact="item.to === '/'"
                        class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
                        active-class="text-primary font-semibold bg-(--ui-primary)/8"
                        inactive-class="text-muted hover:text-default hover:bg-elevated"
                    >
                        {{ item.label }}
                    </ULink>
                    <UButton
                        to="/contact"
                        color="secondary"
                        variant="solid"
                        class="mt-2 rounded-full sm:hidden"
                    >
                        Book a Session
                    </UButton>
                </nav>
            </div>
        </Transition>
    </header>
</template>
