<template>
  <section class="relative w-full">
    <div
      class="overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/60 dark:bg-white/5 backdrop-blur"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <div
        ref="track"
        class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${index * 100}%)` }"
      >
        <figure
          v-for="(it, i) in slides"
          :key="i"
          class="basis-full shrink-0"
        >
          <div class="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
            <img
              :src="it.src"
              :alt="it.alt || ''"
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <figcaption v-if="it.caption" class="absolute inset-x-0 bottom-0 p-4">
              <span class="inline-flex items-center rounded-lg bg-black/40 text-white backdrop-blur px-3 py-1 text-xs sm:text-sm">
                {{ it.caption }}
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>

    <!-- Arrows -->
    <button
      v-if="showArrowsOn && slides.length > 1"
      type="button"
      class="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-background/80 dark:bg-background/60 ring-1 ring-black/10 dark:ring-white/10 w-9 h-9 shadow hover:scale-105 transition"
      aria-label="Previous slide"
      @click="prev"
    >
      <i class="i-lucide-chevron-left w-5 h-5" />
    </button>

    <button
      v-if="showArrowsOn && slides.length > 1"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-background/80 dark:bg-background/60 ring-1 ring-black/10 dark:ring-white/10 w-9 h-9 shadow hover:scale-105 transition"
      aria-label="Next slide"
      @click="next"
    >
      <i class="i-lucide-chevron-right w-5 h-5" />
    </button>

    <!-- Dots -->
    <div v-if="showDotsOn && slides.length > 1" class="mt-3 flex items-center justify-center gap-2">
      <button
        v-for="n in slides.length"
        :key="n"
        type="button"
        class="h-2.5 rounded-full transition-all"
        :class="n - 1 === index ? 'w-6 bg-foreground/80' : 'w-2.5 bg-foreground/30 hover:bg-foreground/50'"
        :aria-label="`Go to slide ${n}`"
        @click="go(n - 1)"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * One-tag API, MDC-friendly:
 * - images: pipe-list (`/a.jpg|/b.jpg|/c.jpg`) OR JSON array
 *   [{ "src": "...", "alt": "...", "caption": "..." }, ...]
 * - autoplay, loop, showDots, showArrows: boolean-ish (present = true)
 * - interval: number (ms)
 */
const props = defineProps({
  images:     { type: String,  required: true }, // pipe-list OR JSON
  autoplay:   { type: [Boolean, String], default: true },
  interval:   { type: [Number, String],  default: 5000 },
  loop:       { type: [Boolean, String], default: true },
  showDots:   { type: [Boolean, String], default: true },
  showArrows: { type: [Boolean, String], default: true },
})

const autoplayOn   = computed(() => props.autoplay   === '' || props.autoplay   === true || props.autoplay   === 'true')
const loopOn       = computed(() => props.loop       === '' || props.loop       === true || props.loop       === 'true')
const showDotsOn   = computed(() => props.showDots   === '' || props.showDots   === true || props.showDots   === 'true')
const showArrowsOn = computed(() => props.showArrows === '' || props.showArrows === true || props.showArrows === 'true')

/** Parse `images` prop into [{src, alt?, caption?}] */
const slides = computed(() => {
  const raw = props.images?.trim()
  if (!raw) return []
  // Try JSON first
  try {
    const arr = JSON.parse(raw)
    if (Array.isArray(arr)) {
      return arr
        .map((x) => (typeof x === 'string' ? { src: x } : x))
        .filter((x) => x && x.src)
    }
  } catch (_) {
    /* fall back to pipe-list */
  }
  // Pipe-list: "/a.jpg|/b.jpg|/c.jpg"
  return raw.split('|').map(s => ({ src: s.trim() })).filter(x => x.src)
})

const track  = ref(null)
const index  = ref(0)
const timer  = ref(null)
const startX = ref(0)
const deltaX = ref(0)
const dragging = ref(false)

function go(n) {
  const len = slides.value.length
  if (!len) return
  if (loopOn.value) index.value = (n + len) % len
  else index.value = Math.max(0, Math.min(len - 1, n))
}
function next() { go(index.value + 1) }
function prev() { go(index.value - 1) }

function onPointerDown(e) { dragging.value = true; startX.value = e.clientX; deltaX.value = 0 }
function onPointerMove(e) { if (dragging.value) deltaX.value = e.clientX - startX.value }
function onPointerUp() {
  if (!dragging.value) return
  const t = 50
  if (deltaX.value > t) prev()
  else if (deltaX.value < -t) next()
  dragging.value = false; deltaX.value = 0
}

function startAutoplay() {
  stopAutoplay()
  if (!autoplayOn.value || slides.value.length < 2) return
  const ms = Number(props.interval) || 5000
  timer.value = setInterval(next, ms)
}
function stopAutoplay() { if (timer.value) { clearInterval(timer.value); timer.value = null } }

onMounted(() => {
  startAutoplay()
  const key = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }
  window.addEventListener('keydown', key)
  onBeforeUnmount(() => window.removeEventListener('keydown', key))
})
onBeforeUnmount(stopAutoplay)

watch([autoplayOn, () => props.interval, slides], startAutoplay)
</script>

