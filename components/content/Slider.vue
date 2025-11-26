<template>
  <!-- Slider container -->
  <div id="slider-wrapper"
       data-hs-carousel='{
         "loadingClasses": "opacity-0",
         "dotsItemClasses": "hs-carousel-active:bg-rose-700 hs-carousel-active:border-rose-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-rose-500 dark:hs-carousel-active:border-rose-500",
         "isAutoPlay": true
       }'
       class="relative">
    <div class="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
      <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
        <div class="hs-carousel-slide">
          <img src="/WhatsApp Image 2025-07-06 at 14.23.53_fd680873.webp"
               alt="Slide 2"
               class="w-full h-130 object-cover shadow-sm rounded-lg" />
        </div>
        <div class="hs-carousel-slide">
          <img src="/IMG-20240919-WA0012.jpg"
               alt="Slide 3"
               class="w-full h-130 object-cover shadow-sm rounded-lg" />
        </div>
      </div>
    </div>

    <!-- Previous button -->
    <button type="button"
            class="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
      <span class="text-2xl" aria-hidden="true">
        <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </span>
      <span class="sr-only">Previous</span>
    </button>

    <!-- Next button -->
    <button type="button"
            class="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
      <span class="sr-only">Next</span>
      <span class="text-2xl" aria-hidden="true">
        <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </span>
    </button>

    <!-- Pagination dots -->
    <div class="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 flex gap-x-2"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// When the component mounts, re‑initialise Preline to recognise the carousel
onMounted(() => {
  if (typeof window !== 'undefined' && window.HSStaticMethods) {
    window.HSStaticMethods.autoInit();
  }
});
</script>
