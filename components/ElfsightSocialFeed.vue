<template>
  <ClientOnly>
    <div
      class="elfsight-app-6d72c42f-cd38-43b2-97ac-5c7ffd644011"
      data-elfsight-app-lazy
    />
  </ClientOnly>
</template>

<script setup lang="ts">
// key: dedupes the script tag if this component ends up rendered
// more than once on the same page
useHead({
  script: [
    {
      src: 'https://elfsightcdn.com/platform.js',
      async: true,
      key: 'elfsight-platform',
    },
  ],
})
</script>
