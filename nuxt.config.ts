// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = 'https://winnerschapel-limerick.vercel.app'

export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  modules: [
    '@nuxtjs/color-mode',
    // '@nuxt/content'
  ],

  // ✅ ADD THIS BLOCK
  app: {
    head: {
      // optional but nice to have:
      link: [{ rel: 'canonical', href: siteUrl }],
      meta: [
        // ✅ Google Search Console verification — paste your token here
        { name: 'google-site-verification', content: 'vJtSnT92Xk-2eoIFsApufMNtER9CQDGXfPhHhPuI-5Y' },
      ],
    },
  },
  // ✅ END ADD

  colorMode: {
    preference: 'light',
    fallback: 'light',
    detectBrowserColorScheme: false,
    classSuffix: '',
  },

  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English', language: 'en-US' }],
  },

  compatibilityDate: '2024-07-06',
})












