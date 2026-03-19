<template>
    <!-- Light mode: subtle dot grid -->
    <div
        aria-hidden="true"
        class="dark:hidden pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.045] text-(--ui-border)"
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                    <circle cx="0" cy="0" r="0.75" fill="currentColor"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)"/>
        </svg>
    </div>

    <!-- Dark mode: teal texture -->
    <div
        aria-hidden="true"
        class="hidden dark:block pointer-events-none fixed inset-0 z-0"
        style="background: url('/images/pattern169.jpg') center / cover no-repeat; opacity: 0.15;"
    />
</template>
