<template>
  <section class="relative w-full">
    <header v-if="label" class="mb-3 text-center">
      <h2 class="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
        {{ label }}
      </h2>
      <p v-if="showUtc" class="mt-1 text-xs text-foreground/60">
        {{ new Date(targetISO).toUTCString() }}
      </p>
    </header>

    <div v-if="!done" class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      <UnitCard :value="String(parts.days)" label="Days" />
      <UnitCard :value="pad(parts.hours)" label="Hours" />
      <UnitCard :value="pad(parts.minutes)" label="Minutes" />
      <UnitCard :value="pad(parts.seconds)" label="Seconds" />
    </div>

    <div v-else class="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-8 text-center shadow-sm">
      <h3 class="text-2xl sm:text-3xl font-semibold">🎉 It's time!</h3>
      <p class="mt-2 text-foreground/70">December 9, 2025 has arrived (Europe/Dublin).</p>
    </div>

    <div v-if="!done && progressOn" class="mt-6">
      <div class="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          class="h-full rounded-full bg-foreground/70 transition-all duration-700"
          :style="{ width: pctComplete + '%' }"
        />
      </div>
      <p class="mt-2 text-xs text-foreground/60">{{ Math.round(pctComplete) }}% complete</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

// ---------- Props (MDC passes attributes here) ----------
const props = withDefaults(defineProps<{
  target?: string            // ISO timestamp, default midnight Dec 9, 2025 UTC (Europe/Dublin)
  label?: string
  progress?: boolean | string
  showUtc?: boolean | string
}>(), {
  target: '2025-12-09T00:00:00Z',
  label: 'Countdown to December 9, 2025',
  progress: true,
  showUtc: false,
})

// Normalize booleans from MDC attributes (any non-empty string should be true)
const progressOn = computed(() => props.progress === '' || props.progress === true || props.progress === 'true')
const showUtc = computed(() => props.showUtc === '' || props.showUtc === true || props.showUtc === 'true')

// ---------- Time math ----------
function pad(n: number) {
  return n.toString().padStart(2, '0')
}
function getTimeParts(msLeft: number) {
  const total = Math.max(0, Math.floor(msLeft / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return { days, hours, minutes, seconds }
}

const targetISO = props.target
const targetTs = new Date(targetISO).getTime()
const now = ref(Date.now())
const startTs = ref<number | null>(null)
let id: number | undefined

onMounted(() => {
  startTs.value = Date.now()
  id = window.setInterval(() => (now.value = Date.now()), 1000)
})
onBeforeUnmount(() => { if (id) clearInterval(id) })

const msLeft = computed(() => Math.max(0, targetTs - now.value))
const done = computed(() => msLeft.value <= 0)
const parts = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 })

// keep parts in sync without re-creating object (avoids extra renders)
watchEffect(() => {
  const p = getTimeParts(msLeft.value)
  parts.days = p.days; parts.hours = p.hours; parts.minutes = p.minutes; parts.seconds = p.seconds
})

const totalMs = computed(() => {
  if (!startTs.value) return Math.max(1, targetTs - Date.now())
  return Math.max(1, targetTs - startTs.value)
})
const pctComplete = computed(() => 100 - (msLeft.value / totalMs.value) * 100)

// ---------- Inline card ----------
const UnitCard = defineComponent({
  name: 'UnitCard',
  props: { value: { type: String, required: true }, label: { type: String, required: true } },
  setup(props) {
    return () => (
      <div class="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 sm:p-6 flex flex-col items-center min-w-24">
        <div class="flex items-center gap-1 text-4xl sm:text-5xl font-semibold text-foreground tabular-nums">
          {props.value}
        </div>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">{props.label}</span>
        <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10" />
      </div>
    )
  }
})
</script>
