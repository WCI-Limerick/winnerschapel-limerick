<template>
  <div
    v-if="visible"
    id="cookie-banner"
    class="fixed bottom-0 right-0 mb-4 mr-4 w-80 z-50"
  >
    <div class="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <img
            src="https://www.svgrepo.com/show/401340/cookie.svg"
            alt="Cookie"
            class="h-6 w-6 mr-2"
          />
          <span class="text-gray-700 dark:text-white font-bold text-sm">
            Cookie Policy
          </span>
        </div>
        <button
          class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          @click="dismiss"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
      </p>
      <button
        @click="accept"
        class="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
      >
        Accept
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  if (process.client && localStorage.getItem('cookieAccepted') !== 'true') {
    visible.value = true
  }
})

const accept = () => {
  localStorage.setItem('cookieAccepted', 'true')
  visible.value = false
}

const dismiss = () => {
  visible.value = false
}
</script>

