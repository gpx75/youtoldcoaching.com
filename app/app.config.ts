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
    },
})
