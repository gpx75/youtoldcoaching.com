import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// ── Reusable field schemas ────────────────────────────────────────────────────

const ctaSchema = z.object({
    label: z.string(),
    href: z.string(),
})

const pillarSchema = z.object({
    label: z.string(),
    body: z.string(),
    icon: z.string().optional(),
})

const statSchema = z.object({
    value: z.string(),
    label: z.string(),
})

// ── Section schemas (one per section type) ────────────────────────────────────

const sectionSchema = z.union([
    z.object({
        type: z.literal('recognition'),
        eyebrow: z.string().optional(),
        heading: z.string(),
        body: z.string().optional(),
    }),
    z.object({
        type: z.literal('framework'),
        eyebrow: z.string().optional(),
        heading: z.string(),
        pillars: z.array(pillarSchema).optional(),
        body: z.string().optional(),
    }),
    z.object({
        type: z.literal('differentiators'),
        eyebrow: z.string().optional(),
        heading: z.string(),
        pillars: z.array(pillarSchema).optional(),
    }),
    z.object({
        type: z.literal('credibility'),
        eyebrow: z.string().optional(),
        stats: z.array(statSchema),
    }),
    z.object({
        type: z.literal('action'),
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        body: z.string().optional(),
        cta: ctaSchema.optional(),
        cta2: ctaSchema.optional(),
    }),
])

// ── Page schema (used by all content/*.md files) ──────────────────────────────

const pageSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    subtitleFont: z.enum(['script', 'serif', 'sans']).optional(),
    // Heading displayed alongside the markdown body prose section
    bodyHeading: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cta: ctaSchema.optional(),
    cta2: ctaSchema.optional(),
    // Hero media — background image (single or light/dark pair)
    heroBgImage: z.string().optional(),
    heroBg: z.object({
        light: z.string(),
        dark: z.string(),
    }).optional(),
    // Portrait image (homepage)
    heroPortrait: z.string().optional(),
    // Hero behaviour
    heroIllustration: z.string().optional(),
    heroIllustrationFill: z.boolean().optional(),
    heroContentScroll: z.boolean().optional(),
    heroSlides: z.array(z.string()).optional(),
    // Contact / booking
    calendlyUrl: z.string().optional(),
    // Below-fold storytelling sections
    sections: z.array(sectionSchema).optional(),
})

// ── Navigation schema (content/navigation.yml) ────────────────────────────────

const navigationSchema = z.object({
    brand: z.object({
        name: z.string(),
        tagline: z.string().optional(),
    }),
    items: z.array(z.object({
        label: z.string(),
        to: z.string(),
        icon: z.string().optional(),
    })),
    cta: z.object({
        label: z.string(),
        to: z.string(),
    }).optional(),
})

// ── Site config schema (content/site.yml) ─────────────────────────────────────

const calendlyLabelsSchema = z.object({
    chooseSession: z.string().optional(),
    chooseSessionHint: z.string().optional(),
    pickTime: z.string().optional(),
    noSessionTypes: z.string().optional(),
    noSessionTypesHint: z.string().optional(),
    noAvailability: z.string().optional(),
    noAvailabilityHint: z.string().optional(),
    yourDetails: z.string().optional(),
    yourDetailsHint: z.string().optional(),
    nameLabel: z.string().optional(),
    namePlaceholder: z.string().optional(),
    emailLabel: z.string().optional(),
    emailPlaceholder: z.string().optional(),
    notesLabel: z.string().optional(),
    notesPlaceholder: z.string().optional(),
    submitButton: z.string().optional(),
    selectSlotHint: z.string().optional(),
    minutesSuffix: z.string().optional(),
    openSuffix: z.string().optional(),
    selected: z.string().optional(),
})

const siteSchema = z.object({
    brand: z.object({
        name: z.string(),
        tagline: z.string().optional(),
    }).optional(),
    metaDefaults: z.object({
        titleSuffix: z.string().optional(),
        description: z.string().optional(),
    }).optional(),
    footer: z.object({
        copyright: z.string(),
    }).optional(),
    contact: z.object({
        email: z.string(),
    }).optional(),
    background: z.object({
        darkPattern: z.string().optional(),
    }).optional(),
    calendly: z.object({
        labels: calendlyLabelsSchema.optional(),
    }).optional(),
})

// ── Collection definitions ────────────────────────────────────────────────────

export default defineContentConfig({
    collections: {
        // All page markdown files
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: pageSchema,
        }),

        // Global navigation (content/navigation.yml)
        navigation: defineCollection({
            type: 'data',
            source: 'navigation.yml',
            schema: navigationSchema,
        }),

        // Global site config (content/site.yml)
        site: defineCollection({
            type: 'data',
            source: 'site.yml',
            schema: siteSchema,
        }),
    },
})
