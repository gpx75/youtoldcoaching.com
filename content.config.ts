import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  eyebrow: z.string().optional(),
  subtitle: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  heroIllustration: z.string().optional(),
  heroIllustrationFill: z.boolean().optional(),
  heroContentScroll: z.boolean().optional(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: pageSchema,
    }),
  },
})
