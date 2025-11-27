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

  // 🔹 Make the homepage *static* (fast from Google / SEO)
  routeRules: {
    // Pre-render '/' at build time and serve as a static asset
    '/': { prerender: true },
    // (optional) cache any API routes if you add them later
    // '/api/**': { swr: 60 } // cache 60s
  },

  // (optional but good for mostly-static sites)
  nitro: {
    prerender: {
      // explicitly ensure '/' is pre-rendered even if not crawled
      routes: ['/'],
    },
  },

  app: {
    head: {
      link: [
        { rel: 'canonical', href: siteUrl },
      ],
      meta: [
        { name: 'google-site-verification', content: 'vJtSnT92Xk-2eoIFsApufMNtER9CQDGXfPhHhPuI-5Y' },
        // (optional, but helps SEO/snippets)
        // { name: 'description', content: 'Winners Chapel International Limerick – service times, location, and upcoming events.' },
      ],
    },
  },

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

  // 🔹 Nuxt performance features stay reasonably up-to-date
  compatibilityDate: '2024-07-06',

  // (optional) small perf tweak for links, not critical for Google hits
  // experimental: {
  //   defaults: {
  //     nuxtLink: {
  //       prefetchOn: 'interaction',
  //     },
  //   },
  // },
})













