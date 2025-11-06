<template>
  <section class="relative w-full">
    <header v-if="label" class="mb-3 text-center">
      <h2 class="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
        {{ label }}
      </h2>
      <p v-if="showUtcOn" class="mt-1 text-xs text-foreground/60">
        {{ targetDate.toUTCString() }}
      </p>
    </header>

    <!-- Cards -->
    <div v-if="!done" class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      <div class="card sm:p-6">
        <div class="val sm:text-5xl">{{ days }}</div>
        <div class="lab">Days</div>
      </div>

      <div class="card sm:p-6">
        <div class="val sm:text-5xl">{{ pad(hours) }}</div>
        <div class="lab">Hours</div>
      </div>

      <div class="card sm:p-6">
        <div class="val sm:text-5xl">{{ pad(minutes) }}</div>
        <div class="lab">Minutes</div>
      </div>

      <div class="card sm:p-6">
        <div class="val sm:text-5xl">{{ pad(seconds) }}</div>
        <div class="lab">Seconds</div>
      </div>
    </div>

    <!-- Finished -->
    <div v-else class="finish">
      <h3 class="finish-title">🎉 It's time!</h3>
      <p class="finish-sub">December 9, 2025 has arrived (Europe/Dublin).</p>
    </div>

    <!-- Progress -->
    <div v-if="!done && progressOn" class="mt-6">
      <div class="bar">
        <div class="bar-fill" :style="{ width: pctComplete + '%' }" />
      </div>
      <p class="mt-2 text-xs text-foreground/60">{{ Math.round(pctComplete) }}% complete</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  target?: string
  label?: string
  progress?: boolean | string
  showUtc?: boolean | string
}>(), {
  target: '2025-12-09T00:00:00Z',
  label: 'Countdown to December 9, 2025',
  progress: true,
  showUtc: false,
})

const progressOn = computed(() => props.progress === '' || props.progress === true || props.progress === 'true')
const showUtcOn = computed(() => props.showUtc === '' || props.showUtc === true || props.showUtc === 'true')

const targetDate = new Date(props.target)
const targetTs = targetDate.getTime()

const now = ref<number>(Date.now())
const startTs = ref<number | null>(null)
let timer: number | undefined

onMounted(() => {
  startTs.value = Date.now()
  timer = window.setInterval(() => { now.value = Date.now() }, 1000)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const msLeft = computed(() => Math.max(0, targetTs - now.value))
const done = computed(() => msLeft.value <= 0)

const totalMs = computed(() => {
  const start = startTs.value ?? Date.now()
  return Math.max(1, targetTs - start)
})
const pctComplete = computed(() => 100 - (msLeft.value / totalMs.value) * 100)

const totalSeconds = computed(() => Math.floor(msLeft.value / 1000))
const days = computed(() => Math.floor(totalSeconds.value / 86400))
const hours = computed(() => Math.floor((totalSeconds.value % 86400) / 3600))
const minutes = computed(() => Math.floor((totalSeconds.value % 3600) / 60))
const seconds = computed(() => totalSeconds.value % 60)

function pad(n: number) { return n.toString().padStart(2, '0') }
</script>

<style scoped>
.card {
  /* no responsive utilities in @apply */
  @apply relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 flex flex-col items-center min-w-24;
}
.val {
  /* base size only; responsive size is in template */
  @apply text-4xl font-semibold text-foreground tabular-nums;
}
.lab {
  @apply mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70;
}
.finish {
  @apply rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-8 text-center shadow-sm;
}
.finish-title {
  @apply text-2xl font-semibold;
}
.finish-sub {
  @apply mt-2 text-foreground/70;
}
.bar {
  @apply w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden;
}
.bar-fill {
  @apply h-full rounded-full bg-foreground/70 transition-all duration-700;
}
</style>


