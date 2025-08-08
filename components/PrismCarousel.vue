<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const slides = ref([
  {
    title: 'Digital Prism',
    desc: 'Where geometry meets art in a stunning display of light and form.',
    img: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80',
    overlay: 'from-violet-500/40 to-purple-500/40'
  },
  {
    title: 'Tech Haven',
    desc: 'Immerse yourself in the cutting edge of technology and innovation.',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
    overlay: 'from-fuchsia-500/40 to-pink-500/40'
  },
  {
    title: 'Neural Dreams',
    desc: 'AI-generated masterpieces that blur the line between human and machine creativity.',
    img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80',
    overlay: 'from-pink-500/40 to-rose-500/40'
  }
])

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  current.value = (current.value + 1) % slides.value.length
}
function prev() {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}
function go(i: number) {
  current.value = i
}

function start() {
  stop()
  timer = setInterval(next, 5000)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

// touch handling
const track = ref<HTMLElement | null>(null)
let touchStartX = 0
let touchEndX = 0
function onTouchStart(e: TouchEvent) { touchStartX = e.changedTouches[0].screenX }
function onTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0].screenX
  const diff = touchStartX - touchEndX
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  start()
}

onMounted(() => start())
onBeforeUnmount(() => stop())
</script>

<template>
  <section class="bg-black min-h-[60vh] flex items-center justify-center overflow-hidden p-4 sm:p-8 relative">
    <!-- Background effects -->
    <div class="fixed inset-0 -z-10 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-fuchsia-900/20"></div>
      <div class="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-violet-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-fuchsia-500/10 rounded-full filter blur-3xl"></div>
    </div>

    <div class="w-full max-w-6xl mx-auto relative">
      <!-- Progress bar -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-20">
        <div
          class="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[width] duration-500"
          :style="{ width: ((current + 1) / slides.length * 100) + '%' }"
        />
      </div>

      <!-- Nav buttons -->
      <button
        class="nav-button absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-white touch-manipulation"
        @click="prev" aria-label="Previous slide"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        class="nav-button absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-white touch-manipulation"
        @click="next" aria-label="Next slide"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Track -->
      <div
        ref="track"
        class="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden carousel-container"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div
          v-for="(s, i) in slides"
          :key="s.title"
          class="carousel-item absolute top-0 left-0 w-full h-full"
          :class="{
            'active': i === current,
            'next': i === (current + 1) % slides.length,
            'prev': i === (current - 1 + slides.length) % slides.length,
            'hidden': ![current, (current + 1) % slides.length, (current - 1 + slides.length) % slides.length].includes(i)
          }"
        >
          <div class="w-full h-full p-4 sm:p-8">
            <div class="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative group">
              <img :src="s.img" :alt="s.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-br" :class="s.overlay + ' mix-blend-overlay'"></div>
              <div class="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 class="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">{{ s.title }}</h3>
                <p class="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">{{ s.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indicators -->
      <div class="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
        <button
          v-for="(_, i) in slides" :key="i"
          class="w-8 sm:w-12 h-1 sm:h-1.5 rounded-full transition-colors"
          :class="i === current ? 'bg-white/40' : 'bg-white/20 hover:bg-white/60'"
          @click="go(i)"
          :aria-label="`Go to slide ${i+1}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-container { perspective: 1000px; touch-action: pan-y pinch-zoom; }
.carousel-item { backface-visibility: hidden; transition: all 0.5s cubic-bezier(0.23,1,0.32,1); opacity: 0; transform: scale(0.8) translateZ(-200px); }
.carousel-item.active { opacity: 1; transform: scale(1) translateZ(0); }
@media (max-width: 640px) {
  .carousel-item.prev { opacity: 0; transform: scale(0.8) translateX(-50%) translateZ(-100px); }
  .carousel-item.next { opacity: 0; transform: scale(0.8) translateX(50%) translateZ(-100px); }
}
@media (min-width: 641px) {
  .carousel-item.prev { opacity: 0.7; transform: scale(0.9) translateX(-100%) translateZ(-100px); }
  .carousel-item.next { opacity: 0.7; transform: scale(0.9) translateX(100%) translateZ(-100px); }
}
.nav-button { transition: all .3s; background: rgba(255,255,255,.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
@media (hover:hover) { .nav-button:hover { background: rgba(255,255,255,.2); transform: scale(1.1); } }
.nav-button:active { transform: scale(.95); }
</style>
