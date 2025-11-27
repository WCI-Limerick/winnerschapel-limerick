<template>
  <section class="relative min-h-[60vh] w-full grid place-items-center overflow-hidden">
    <!-- Soft gradient backdrop -->
    <div aria-hidden class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute -inset-32 blur-3xl opacity-60 dark:opacity-40"
        :style="{
          background:
            'radial-gradient(40% 40% at 20% 20%, hsl(210 100% 60% / 0.5), transparent 60%),' +
            'radial-gradient(45% 45% at 80% 20%, hsl(280 100% 70% / 0.35), transparent 60%),' +
            'radial-gradient(50% 50% at 50% 80%, hsl(340 100% 65% / 0.35), transparent 60%)',
        }"
      />
    </div>

    <main class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
      <header class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Countdown to <span class="whitespace-nowrap">December 9, 2025</span>
        </h1>
        <p class="mt-2 text-foreground/70 text-sm md:text-base">
          Reaching midnight <span class="font-medium">Europe/Dublin</span> (UTC) — {{ new Date(targetISO).toUTCString() }}
        </p>
      </header>

      <div v-if="!done" class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <UnitCard :value="String(days)" label="Days" />
        <UnitCard :value="pad(hours)" label="Hours" />
        <UnitCard :value="pad(minutes)" label="Minutes" />
        <UnitCard :value="pad(seconds)" label="Seconds" />
      </div>

      <div v-else class="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-8 text-center shadow-sm">
        <h2 class="text-2xl sm:text-3xl font-semibold">🎉 It's time!</h2>
        <p class="mt-2 text-foreground/70">December 9, 2025 has arrived.</p>
      </div>

      <div v-if="!done" class="mt-8">
        <div class="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            class="h-full rounded-full bg-foreground/70 transition-all duration-700"
            :style="{ width: pctComplete + '%' }"
          />
        </div>
        <p class="mt-2 text-xs text-foreground/60">{{ Math.round(pctComplete) }}% complete</p>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

// ===== Helpers
function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function getTimeParts(msLeft: number) {
  const totalSeconds = Math.max(0, Math.floor(msLeft / 1000))
  const days = Math.floor(totalSeconds / (24 * 3600))
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

// ===== Target — Europe/Dublin midnight on Dec 9, 2025
const targetISO = '2025-12-09T00:00:00Z'
const targetTs = new Date(targetISO).getTime()

// Track time safely on client only
const now = ref(Date.now())
const startTs = ref<number | null>(null)
let timer: number | undefined

onMounted(() => {
  startTs.value = Date.now()
  timer = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const msLeft = computed(() => Math.max(0, targetTs - now.value))
const done = computed(() => msLeft.value <= 0)
const { days, hours, minutes, seconds } = computed(() => getTimeParts(msLeft.value)).value

const totalMs = computed(() => {
  if (!startTs.value) return targetTs - Date.now()
  return Math.max(1, targetTs - startTs.value)
})
const pctComplete = computed(() => 100 - (msLeft.value / totalMs.value) * 100)

// Expose for template
function useExpose() {
  return { pad }
}
const { pad } = useExpose()

// ===== Inline subcomponents
const UnitCard = defineComponent({
  name: 'UnitCard',
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  setup(props) {
    const k = ref(props.value)
    // Watch value to retrigger flip by keying
    return () => (
      <div class="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-4 sm:p-6 flex flex-col items-center min-w-24">
        <div class="flex items-center gap-1 text-4xl sm:text-5xl font-semibold text-foreground">
          <Transition name="flip" mode="out-in">
            <span key={props.value} class="tabular-nums">{props.value}</span>
          </Transition>
        </div>
        <span class="mt-2 block text-xs uppercase tracking-[0.2em] text-foreground/70">{props.label}</span>
        <div class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10" />
      </div>
    )
  },
})
</script>

<style scoped>
/* Simple 3D-ish flip transition for number changes */
.flip-enter-active,
.flip-leave-active {
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease;
  transform-style: preserve-3d;
}
.flip-enter-from {
  opacity: 0;
  transform: translateY(0.75rem) rotateX(-30deg);
}
.flip-enter-to {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}
.flip-leave-from {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}
.flip-leave-to {
  opacity: 0;
  transform: translateY(-0.75rem) rotateX(30deg);
}
</style>

