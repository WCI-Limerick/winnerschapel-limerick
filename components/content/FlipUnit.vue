<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex gap-1">
      <FlipDigit :value="tens" />
      <FlipDigit :value="ones" />
    </div>
    <span class="text-xs md:text-sm uppercase tracking-wide text-foreground/70">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  label: string
}>()

const padded = computed(() => String(Math.max(0, props.value)).padStart(2, '0'))
const tens = computed(() => padded.value[0])
const ones = computed(() => padded.value[1])
</script>
