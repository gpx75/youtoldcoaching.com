// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
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
