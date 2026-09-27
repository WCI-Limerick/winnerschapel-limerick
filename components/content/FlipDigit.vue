<template>
  <div class="fc-card">
    <!-- static resting faces -->
    <div class="fc-half fc-half--top">
      <div class="fc-half-inner">{{ current }}</div>
    </div>
    <div class="fc-half fc-half--bottom">
      <div class="fc-half-inner">{{ previous }}</div>
    </div>

    <!-- animated leaves, only present while flipping -->
    <div
      v-if="flipping"
      :key="'front-' + flipId"
      class="fc-half fc-half--top fc-leaf fc-leaf--front"
    >
      <div class="fc-half-inner">{{ previous }}</div>
    </div>
    <div
      v-if="flipping"
      :key="'back-' + flipId"
      class="fc-half fc-half--bottom fc-leaf fc-leaf--back"
    >
      <div class="fc-half-inner">{{ current }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  value: string | number
}>()

const FLIP_MS = 300 // duration of each half-flip; total flip = FLIP_MS * 2

const current = ref(String(props.value))
const previous = ref(String(props.value))
const flipping = ref(false)
const flipId = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.value,
  (val) => {
    const next = String(val)
    if (next === current.value) return

    previous.value = current.value
    current.value = next
    flipId.value++
    flipping.value = true

    clearTimeout(timer)
    timer = setTimeout(() => {
      // sync the static bottom face before removing the animated leaf
      // so nothing flickers back to the old value
      previous.value = current.value
      flipping.value = false
    }, FLIP_MS * 2)
  }
)

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.fc-card {
  position: relative;
  width: var(--fc-w, 1.5ch);
  height: var(--fc-h, 1.5em);
  perspective: 300px;
  font-variant-numeric: tabular-nums;
}

.fc-half {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  background: var(--fc-bg, #1f2937);
  border-radius: inherit;
}

.fc-half--top {
  top: 0;
  border-radius: 0.2em 0.2em 0 0;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.4);
}

.fc-half--bottom {
  bottom: 0;
  border-radius: 0 0 0.2em 0.2em;
}

.fc-half-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--fc-fg, #fff);
}

.fc-half--bottom .fc-half-inner {
  top: -100%;
}

.fc-leaf {
  z-index: 2;
  backface-visibility: hidden;
}

.fc-leaf--front {
  transform-origin: bottom;
  animation: fcFlipFront var(--fc-flip-ms, 300ms) ease-in forwards;
}

.fc-leaf--back {
  transform-origin: top;
  transform: rotateX(90deg);
  animation: fcFlipBack var(--fc-flip-ms, 300ms) ease-out forwards;
  animation-delay: var(--fc-flip-ms, 300ms);
}

@keyframes fcFlipFront {
  from { transform: rotateX(0deg); }
  to { transform: rotateX(-90deg); }
}

@keyframes fcFlipBack {
  from { transform: rotateX(90deg); }
  to { transform: rotateX(0deg); }
}
</style>
