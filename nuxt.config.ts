// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  modules: [
    '@nuxtjs/color-mode',
    'nuxt-site-config',
    'nuxt-simple-sitemap',
    '@nuxtjs/schema-org',
  ],

  site: {
    url: 'https://winnerschapel-limerick.vercel.app', // ← Your real domain
    name: 'Winners Chapel International Limerick',
    description:
      'Winners Chapel International Limerick is a vibrant community dedicated to spiritual growth and fellowship.',
  },

  sitemap: {
    autoLastmod: true,
    credits: false,
    xsl: false,
  },

  schemaOrg: {
    canonicalHost: 'https://winnerschapel-limerick.vercel.app', // same as site.url
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

  compatibilityDate: '2024-07-06',
})






