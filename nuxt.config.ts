// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  runtimeConfig: {
    calendly: {
      apiKey: process.env.CALENDLY_API_KEY || '',
    },
  },
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about-moya', '/services', '/pathwise-framework', '/client-success', '/contact'],
    },
  },
  modules: [
    '@nuxt/content', '@nuxt/ui', 'nuxt-studio',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'gpx75',
      repo: 'youtoldcoaching.com',
      branch: 'main',
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
