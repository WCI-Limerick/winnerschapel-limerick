<template>
  <div><slot /></div>
</template>

<script setup lang="ts">
// Site-wide fallbacks
const SITE_NAME = 'Winners Chapel Limerick'
const SITE_DESC = 'Winners Chapel Limerick is a vibrant community dedicated to spiritual growth and fellowship.'
const SITE_URL  = 'https://winnerschapel-limerick.vercel.app'

const route = useRoute()

// Many doc themes (incl. shadcn-docs-nuxt) expose frontmatter into route.meta.
// If a page has frontmatter, use it; otherwise fall back to site defaults.
const pageTitle = computed(() => (route.meta as any)?.title ?? SITE_NAME)
const pageDesc  = computed(() => (route.meta as any)?.description ?? SITE_DESC)

// Canonical for the current route
const canonical = computed(
  () => new URL(route.fullPath || '/', SITE_URL).toString()
)

useHead({
  titleTemplate: (title?: string) =>
    title ? `${title} • ${SITE_NAME}` : SITE_NAME,
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDesc.value },

    // Open Graph basics
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:description', content: pageDesc.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonical.value },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:description', content: pageDesc.value },
  ],
  link: [{ rel: 'canonical', href: canonical.value }]
})
</script>

