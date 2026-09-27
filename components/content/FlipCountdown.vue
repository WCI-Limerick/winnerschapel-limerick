<template>
  <div
    class="flex flex-col items-center gap-4 py-6"
    :style="{
      '--fc-w': digitWidth,
      '--fc-h': digitHeight,
      '--fc-bg': cardColor,
      '--fc-fg': textColor,
      '--fc-flip-ms': flipMs + 'ms',
    }"
  >
    <h3 v-if="title" class="text-lg md:text-xl font-semibold text-foreground">
      {{ title }}
    </h3>

    <div v-if="!isComplete" class="flex items-start gap-3 md:gap-6" style="font-size: clamp(1.4rem, 4vw, 2.5rem);">
      <FlipUnit :value="timeLeft.days" label="Days" />
      <span class="mt-1 md:mt-2 font-bold text-foreground/40" style="font-size: 0.6em;">:</span>
      <FlipUnit :value="timeLeft.hours" label="Hours" />
      <span class="mt-1 md:mt-2 font-bold text-foreground/40" style="font-size: 0.6em;">:</span>
      <FlipUnit :value="timeLeft.minutes" label="Minutes" />
      <span class="mt-1 md:mt-2 font-bold text-foreground/40" style="font-size: 0.6em;">:</span>
      <FlipUnit :value="timeLeft.seconds" label="Seconds" />
    </div>

    <p v-else class="text-base md:text-lg font-medium text-foreground">
      {{ completedMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Any date string/ISO timestamp `new Date()` can parse, e.g. '2026-12-25T09:00:00' */
    targetDate: string
    title?: string
    completedMessage?: string
    /** card colours, override per instance if a section needs a different theme */
    cardColor?: string
    textColor?: string
    /** size of each digit card */
    digitWidth?: string
    digitHeight?: string
    /** speed of the flip animation, per half-flip, in ms */
    flipMs?: number
  }>(),
  {
    title: '',
    completedMessage: "🎉 Shiloh is Here!",
    cardColor: '#FFD580',
    textColor: '#1f2937',
    digitWidth: '2ch',
    digitHeight: '1.3em',
    flipMs: 300,
  }
)

const emit = defineEmits<{
  complete: []
}>()

const timeLeft = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const isComplete = computed(
  () => timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && hasStarted.value
)

let hasStarted = { value: false }
let intervalId: ReturnType<typeof setInterval> | undefined

function tick() {
  const diff = Math.max(0, new Date(props.targetDate).getTime() - Date.now())

  timeLeft.days = Math.floor(diff / 86_400_000)
  timeLeft.hours = Math.floor((diff % 86_400_000) / 3_600_000)
  timeLeft.minutes = Math.floor((diff % 3_600_000) / 60_000)
  timeLeft.seconds = Math.floor((diff % 60_000) / 1_000)

  hasStarted.value = true

  if (diff <= 0 && intervalId) {
    clearInterval(intervalId)
    emit('complete')
  }
}

onMounted(() => {
  tick()
  intervalId = setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>