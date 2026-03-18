<template>
    <div class="flex min-h-dvh flex-col">
        <BackgroundPattern />
        <SiteHeader />
        <main class="flex-1 pt-10 md:pt-12 lg:pt-0">
            <slot />
        </main>
        <SiteFooter />
    </div>
</template>
