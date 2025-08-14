export default defineNuxtConfig({
  devtools: { enabled: true },

  extends: ['shadcn-docs-nuxt'],

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content', // ✅ Required for Markdown + components
  ],

  content: {
    markdown: {
      mdc: true, // ✅ Enables ::Component{} syntax in Markdown
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

  compatibilityDate: '2024-07-06',
})



