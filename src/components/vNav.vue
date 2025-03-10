<template>
  <nav
    class="sticky top-0 z-50 flex w-full items-center border-b border-zinc-200 bg-white px-6 py-3 shadow-sm md:px-8 dark:border-zinc-700 dark:bg-zinc-900"
  >
    <button @click="$emit('toggle-sidebar')" class="ic mr-4" aria-label="Toggle Sidebar">
      <Bars3Icon class="size-7 text-gray-700 dark:text-gray-300" />
    </button>
    <a
      href="https://mfm-347.github.io/Expense-Tracker/"
      class="text-xl font-semibold ta-225 hover:opacity-80 sm:text-2xl"
    >
      Expense Tracker
    </a>
    <div class="ml-auto flex items-center gap-x-3 sm:gap-x-4">
      <button @click="toggleTheme" class="ic" :aria-label="`Enable ${t} Mode`">
        <component
          :is="c"
          class="size-6 transform text-gray-700 ta-200 hover:scale-110 dark:text-gray-300"
        />
      </button>
      <a
        href="https://github.com/MFM-347/Expense-Tracker"
        target="_blank"
        class="ic"
        aria-label="View Source Code on GitHub"
      >
        <CodeBracketIcon
          class="size-6 transform text-gray-700 ta-200 ease-in-out hover:scale-110 dark:text-gray-300"
        />
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Bars3Icon, SunIcon, MoonIcon, CodeBracketIcon } from '@heroicons/vue/24/solid'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('dark-mode', isDark.value ? 'enabled' : 'disabled')
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  const mode = localStorage.getItem('dark-mode')
  if (mode === 'enabled') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const c = computed(() => (isDark.value ? SunIcon : MoonIcon))
const t = computed(() => (isDark.value ? 'Light' : 'Dark'))
</script>

<style scoped>
@reference "@/style.css";

.ic {
  @apply rounded-full p-2 ta-200 hover:bg-zinc-200 focus:ring focus:ring-gray-300 focus:outline-none dark:hover:bg-zinc-800 dark:focus:ring-gray-700;
}
</style>
