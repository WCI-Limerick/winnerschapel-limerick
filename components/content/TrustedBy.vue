<template>
  <!-- Clients -->
  <div class="max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Title -->
    <div class="sm:w-1/2 xl:w-1/3 mx-auto text-center mb-6 md:mb-12">
      <h2 class="text-xl font-semibold md:text-2xl md:leading-tight text-foreground">
        {{ title }}
      </h2>
    </div>
    <!-- End Title -->

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-2 lg:gap-3 max-w-md mx-auto">
      <NuxtLink
        v-for="logo in logos"
        :key="logo.alt"
        :to="logo.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="logo.alt"
        class="p-6 md:p-8 bg-surface rounded-lg flex items-center justify-center transition-colors hover:bg-surface/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <img
          :src="logo.src"
          :alt="logo.alt"
          class="w-auto h-18 md:h-16 lg:h-20 mx-auto"
        >
      </NuxtLink>
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Clients -->
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'Connect with Us',
  }
)

const logos = [
  { src: '/instagram.webp', alt: 'Instagram', href: 'https://www.instagram.com/yaf_limerick?igsi=MTNwamswY2x0dWJkcg==' },
  { src: '/whatsapp.webp', alt: 'Whatsapp', href: 'https://chat.whatsapp.com/CZhWc1tnZNy6V2CbUWtapR' },
]
</script>