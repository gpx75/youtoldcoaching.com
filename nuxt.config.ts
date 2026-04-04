// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    calendly: {
      apiKey: process.env.CALENDLY_API_KEY || '',
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY || '',
    },
    contactEmail: process.env.CONTACT_EMAIL || 'hello@hildakilama.com',
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-studio',
    'motion-v/nuxt',
  ],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'error'],
    },
  },
  nitro: {
    preset: 'vercel',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'gpx75',
      repo: 'hildakilama.com',
      branch: 'main',
    },
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})