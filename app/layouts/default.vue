<template>
    <div class="flex flex-col lg:h-dvh lg:overflow-hidden">
        <BackgroundPattern />
        <SiteHeader />
        <main class="flex-1 lg:min-h-0 lg:overflow-hidden">
            <slot />
        </main>
        <SiteFooter />
    </div>
</template>
