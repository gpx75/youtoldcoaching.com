export default defineAppConfig({
    ui: {
        // ── Brand colour mapping ──────────────────────────────────────────
        colors: {
            primary:   'teal',    // Deep Teal Blue — navigation, structure, headings
            secondary: 'rose',    // Rose Gold — CTAs, interactive highlights
            tertiary:  'gold',    // Antique Gold — secondary CTAs, decorative accents
            success:   'emerald', // Emerald Stone — conferma, crescita
            info:      'blue',    // Bleu Gemme — sapphire, profondità
            warning:   'amber',   // Baltic Amber — calore fossile, attenzione
            error:     'red',     // Rosso Porpora — garnet, urgenza nobile
            neutral:   'stone',   // Granito — base solida, struttura
        },

        // ── Button ──────────────────────────────────────────────────────────
        // Pill-shaped, semibold — premium brand vocabulary
        // 3 visual tiers: solid (filled + shadow), outline (bordered), soft (tinted bg)
        // Hover/active scale + shadow applied per-instance via utility classes
        button: {
            defaultVariants: {
                size: 'xl',
            },
            slots: {
                base: 'rounded-full font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
            },
        },

        // ── Card ────────────────────────────────────────────────────────────
        // Premium rounded corners
        card: {
            slots: {
                root: 'rounded-xl',
            },
        },

        // ── Alert ───────────────────────────────────────────────────────────
        // Rounded to match card styling
        alert: {
            slots: {
                root: 'rounded-xl',
            },
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
        formField: {
            slots: {
                label: 'text-sm font-semibold text-highlighted',
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
        // Frosted glass: translucent bg with strong blur
        header: {
            slots: {
                root: 'h-(--ui-header-height) sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out',
                right: 'flex items-center justify-end shrink-0 gap-2',
            },
        },

        // ── Footer ──────────────────────────────────────────────────────────
        // Calm border, generous breathing room
        footer: {
            slots: {
                root: 'border-t border-(--ui-border-muted) bg-default',
                container: 'py-6 lg:py-8 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
            },
        },

        // ── NavigationMenu ──────────────────────────────────────────────────
        // Pill-shaped links to match button vocabulary
        navigationMenu: {
            slots: {
                link: 'rounded-full px-2.5 py-1.5 text-[13px] font-medium',
                leadingIcon: 'hidden',
            },
        },

        // ── PageSection ─────────────────────────────────────────────────────
        // Generous whitespace, serif headings, larger title scale
        pageSection: {
            slots: {
                container: 'py-16 md:py-24 lg:py-28',
                title: 'font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight',
                headline: 'text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-primary',
                description: 'text-base sm:text-lg leading-relaxed max-w-2xl',
            },
        },
    },
})
