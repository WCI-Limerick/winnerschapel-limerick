// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],

  // Enforce light mode regardless of browser/OS
  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    preference: 'light',                  // Start in light mode
    fallback: 'light',                    // Fallback if no saved preference
    detectBrowserColorScheme: false,      // 🔒 Ignore system/browser preference
    classSuffix: '',                      // Use 'dark' class without suffix (e.g., 'dark', not 'dark-mode')
  },

  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
      },
    ],
  },

  compatibilityDate: '2024-07-06',
});

