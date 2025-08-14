// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],

  // Auto-import Vue components so you can use <PrismCarousel /> in .vue and .md
  components: [
    { path: '~/components', pathPrefix: false },          // <MyThing />
    // Optional: scan extra folders with a prefix
    // { path: '~/components/ui', prefix: 'Ui' },         // <UiButton />
  ],

  modules: [
    '@nuxtjs/color-mode',
    // If you want Vue components inside Markdown, make sure Content is installed:
    // '@nuxt/content'
  ],

  // (If using @nuxt/content, you can keep MDC on to use components in .md)
  // content: { markdown: { mdc: true } },

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





