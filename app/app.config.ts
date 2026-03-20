export default defineAppConfig({
    ui: {
        // ── Brand colour mapping ──────────────────────────────────────────
        colors: {
            primary:   'teal',   // Deep Teal Blue — navigation, structure, headings
            secondary: 'rose',   // Rose Gold — CTAs, interactive highlights
            neutral:   'stone',  // Warm neutral — body text, muted states
            warning:   'gold',   // Antique Gold — complimentary call CTA, decorative accents
        },

        // ── Form elements ─────────────────────────────────────────────────
        // lg size throughout: accessible, premium feel consistent with brand
        input: {
            defaultVariants: {
                size: 'lg',
            },
        },
        textarea: {
            defaultVariants: {
                size: 'lg',
            },
        },
        select: {
            defaultVariants: {
                size: 'lg',
            },
        },

        // ── Badge ─────────────────────────────────────────────────────────
        // All site badges are duration/metadata labels: neutral soft small
        badge: {
            defaultVariants: {
                color:   'neutral',
                variant: 'soft',
                size:    'sm',
            },
        },

        // ── Header ──────────────────────────────────────────────────────────
        // Match existing brand header: slightly more opaque bg, primary accent bar
        header: {
            slots: {
                root: 'bg-default/80 backdrop-blur-md border-b border-default h-(--ui-header-height) sticky top-0 z-50',
            },
        },

        // ── Footer ──────────────────────────────────────────────────────────
        // Compact padding, primary-tinted top border
        footer: {
            slots: {
                root: 'border-t border-(--ui-primary)/25 bg-default',
                container: 'py-5 lg:py-5 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
            },
        },

        // ── NavigationMenu ──────────────────────────────────────────────────
        // Match existing nav link styling
        navigationMenu: {
            slots: {
                link: 'rounded-md px-2.5 py-1.5 text-sm font-medium',
            },
        },

        // ── PageSection ─────────────────────────────────────────────────────
        // Compact padding to match current site rhythm; serif headings
        pageSection: {
            slots: {
                container: 'py-14 md:py-20 lg:py-20',
                title: 'font-serif text-2xl sm:text-3xl font-semibold tracking-tight',
                headline: 'text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ui-primary)/70',
                description: 'text-base leading-relaxed',
            },
        },
    },
})
