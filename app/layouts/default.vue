<template>
    <div class="flex min-h-dvh flex-col">
        <BackgroundPattern />
        <SiteHeader />
        <main class="flex-1">
            <slot />
        </main>
        <SiteFooter />
    </div>
</template>
