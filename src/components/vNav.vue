<template>
  <header
    class="sticky top-0 z-50 py-2 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm"
  >
    <nav class="container mx-auto w-full flex items-center">
      <button
        @click="$emit('toggle-sidebar')"
        class="flex items-center justify-center p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors mr-4"
        aria-label="Toggle Sidebar"
      >
        <Bars3Icon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      <div class="flex gap-2 items-center">
        <span
          class="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400"
        >
          ExpenseTracker
        </span>
      </div>
      <ul class="flex gap-3 sm:gap-4 ml-auto text-xl capitalize items-center">
        <li>
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            :aria-label="isDark ? 'Enable Light Mode' : 'Enable Dark Mode'"
          >
            <SunIcon
              v-if="isDark"
              class="w-5 h-5 text-gray-600 dark:text-gray-300"
            />
            <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </li>
        <li>
          <button
            @click="openGithub"
            class="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="View Source Code on GitHub"
          >
            <CodeBracketIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  CodeBracketIcon,
} from "@heroicons/vue/24/outline";

const isDark = ref(false);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("dark-mode", isDark.value ? "enabled" : "disabled");
  document.documentElement.classList.toggle("dark", isDark.value);
};
onMounted(() => {
  const mode = localStorage.getItem("dark-mode");
  if (mode === "enabled") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});
const openGithub = () => {
  window.open("https://github.com/MFM-347/Expense-Tracker", "_blank");
};
</script>
