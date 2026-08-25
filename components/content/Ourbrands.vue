<template>
  <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 text-center">
    <h2 class="text-xl font-semibold md:text-2xl md:leading-tight text-foreground mb-4">
      Our Brands
    </h2>
    <p class="max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed text-foreground/70">
      Within YAF, members are structured into three key groups, known as brands, to effectively serve different stages of life.
    </p>

    <div class="flex flex-wrap justify-center items-start gap-10 lg:gap-16">
      <div
        v-for="brand in brands"
        :key="brand.alt"
        class="text-center w-40"
      >
        <div class="h-62 md:h-70 lg:h-78 flex items-center justify-center mb-1">
          <img
            :src="brand.src"
            :alt="brand.alt"
            class="max-h-full max-w-full w-auto object-contain"
          >
        </div>
        <p class="text-sm md:text-base text-foreground">
          {{ brand.caption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const brands = [
  { src: '/Picture1_1_cropped.png', alt: 'Seekers', caption: 'Seekers (ages 18 to 24)' },
  { src: '/Picture12_cropped.png', alt: 'The Bridge', caption: 'Bridge (ages 24 to 34)' },
  { src: '/Picture13_cropped.png', alt: 'Harvesters', caption: 'Harvesters (ages 35 and above)' },
]
</script>