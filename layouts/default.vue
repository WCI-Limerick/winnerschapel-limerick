<!-- /layouts/default.vue -->
<template>
  <div><slot /></div>
</template>

<script setup lang="ts">
const siteName = 'Winners Chapel International Limerick'
const siteDesc = 'Winners Chapel International Limerick is a vibrant community dedicated to spiritual growth and fellowship.'
const siteUrl  = 'https://winnerschapel-limerick.vercel.app'

const route = useRoute()
const canonical = computed(() => new URL(route.fullPath || '/', siteUrl).toString())

useHead({
  titleTemplate: (title?: string) => title ? `${title} • ${siteName}` : siteName,
  meta: [
    { name: 'description', content: siteDesc },
    { property: 'og:title', content: siteName },
    { property: 'og:description', content: siteDesc },
    { property: 'og:url', content: siteUrl },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: siteName },
    { name: 'twitter:description', content: siteDesc },
  ],
  link: [{ rel: 'canonical', href: canonical.value }]
})
</script>
