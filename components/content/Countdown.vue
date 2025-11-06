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

    <!-- Active countdown -->
    <div v-if="!done" class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      <div class="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 sm:p-6 flex flex-col items-center min-w-24">
        <div class="flex items-center gap-1 text-4xl sm:text-5xl font-semibold text-foreground tabular-nums">
          {{ days }}
        </div>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">Days</span>
        <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
      </div>

      <div class="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 sm:p-6 flex flex-col items-center min-w-24">
        <div class="flex items-center gap-1 text-4xl sm:text-5xl font-semibold text-foreground tabular-nums">
          {{ pad(hours) }}
        </div>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">Hours</span>
        <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
      </div>

      <div class="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 sm:p-6 flex flex-col items-center min-w-24">
        <div class="flex items-center gap-1 text-4xl sm:text-5xl font-semibold text-foreground tabular-nums">
          {{ pad(minutes) }}
        </div>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">Minutes</span>
        <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
      </div>

      <div class="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 sm:p-6 flex flex-col items-center min-w-24">
        <div class="flex items-center gap-1 text-4xl sm:text-5xl font-semibold text-foreground tabular-nums">
          {{ pad(seconds) }}
        </div>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">Seconds</span>
        <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10"></div>
      </div>
    </div>

    <!-- Finished -->
    <div v-else class="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-8 text-center shadow-sm">
      <h3 class="text-2xl sm:text-3xl font-semibold">🎉 It's time!</h3>
      <p class="mt-2 text-foreground/70">December 9, 2025 has arrived (Europe/Dublin).</p>
    </div>

    <!-- Progress -->
    <div v-if="!done && progressOn" class="mt-6">
      <div class="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div class="h-full rounded-full bg-foreground/70 transition-all duration-700" :style="{ width: pctComplete + '%' }"></div>
      </div>
      <p class="mt-2 text-xs text-foreground/60">{{ Math.round(pctComplete) }}% complete</p>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  target:   { type: String, default: '2025-12-09T00:00:00Z' },
  label:    { type: String, default: 'Countdown to December 9, 2025' },
  progress: { type: [Boolean, String], default: true },
  showUtc:  { type: [Boolean, String], default: false },
})

const progressOn = computed(() => props.progress === '' || props.progress === true || props.progress === 'true')
const showUtcOn  = computed(() => props.showUtc  === '' || props.showUtc  === true || props.showUtc  === 'true')

// timing
const targetDate = new Date(props.target)
const targetTs   = targetDate.getTime()
const now        = ref(Date.now())
const startTs    = ref(null)
let timer

onMounted(() => {
  startTs.value = Date.now()
  timer = window.setInterval(() => { now.value = Date.now() }, 1000)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const msLeft  = computed(() => Math.max(0, targetTs - now.value))
const done    = computed(() => msLeft.value <= 0)
const tsec    = computed(() => Math.floor(msLeft.value / 1000))
const days    = computed(() => Math.floor(tsec.value / 86400))
const hours   = computed(() => Math.floor((tsec.value % 86400) / 3600))
const minutes = computed(() => Math.floor((tsec.value % 3600) / 60))
const seconds = computed(() => tsec.value % 60)

const totalMs     = computed(() => Math.max(1, targetTs - (startTs.value ?? Date.now())))
const pctComplete = computed(() => 100 - (msLeft.value / totalMs.value) * 100)

function pad(n) { return String(n).padStart(2, '0') }
</script>





