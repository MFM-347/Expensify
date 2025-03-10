<script setup>
import { computed, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const period = 0
const swActivated = ref(false)

function registerPeriodicSync(swUrl, r) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: { 'cache-control': 'no-cache' },
    })

    if (resp?.status === 200) await r.update()
  }, period)
}

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    } else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        /** @type {ServiceWorker} */
        const sw = e.target
        swActivated.value = sw.state === 'activated'
        if (swActivated.value) registerPeriodicSync(swUrl, r)
      })
    }
  },
})

const title = computed(() =>
  needRefresh.value ? 'New update available! Reload to apply changes.' : '',
)

function close() {
  needRefresh.value = false
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="needRefresh"
      class="fixed bottom-6 left-6 z-50 flex w-80 flex-col rounded-lg border border-gray-400 bg-zinc-200 p-4 shadow-lg dark:border-gray-600 dark:bg-zinc-800"
      aria-labelledby="toast-message"
      role="alert"
    >
      <span id="toast-message" class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
        {{ title }}
      </span>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="rounded-md bg-blue-600 px-3 py-1 text-zinc-100 shadow-md ta-150 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          @click="updateServiceWorker()"
        >
          Reload
        </button>
        <button
          type="button"
          class="rounded-md border border-gray-400 px-3 py-1 text-gray-700 ta-150 hover:bg-zinc-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-zinc-700"
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
</template>

<style>
@reference "@/style.css"

.fade-enter-active, .fade-leave-active {
  @apply ta-250;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
