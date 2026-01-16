<template>
    <div class="min-h-screen bg-base-200">
        <div class="flex min-h-screen flex-col">
            <SiteHeader />
            <main class="w-full flex-1 px-6 pb-16 pt-8 sm:px-10 lg:px-16">
                <slot />
            </main>
            <SiteFooter class="mt-auto" />
        </div>
    </div>
</template>
