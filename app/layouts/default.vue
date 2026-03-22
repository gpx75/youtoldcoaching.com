<template>
    <div class="page-frame pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true" />
    <div class="flex min-h-dvh flex-col">
        <BackgroundPattern />
        <SiteHeader />
        <main class="flex-1">
            <slot />
        </main>
        <SiteFooter />
    </div>
</template>
