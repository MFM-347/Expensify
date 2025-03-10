<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <div
      class="rounded-xl border border-zinc-200 bg-zinc-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl md:col-span-3 dark:border-zinc-700 dark:bg-zinc-800"
    >
      <h4 class="mb-3 text-lg font-semibold text-gray-600 dark:text-gray-300">Total Balance</h4>
      <h1
        class="mt-2 text-5xl font-bold transition-all duration-300"
        :class="tot >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-600 dark:text-red-500'"
      >
        ${{ tot.toLocaleString() }}
      </h1>
    </div>
    <div
      class="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-green-700 dark:from-green-900/30 dark:to-green-800/30"
    >
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Income</h4>
        <div class="rounded-lg bg-green-100 p-2 dark:bg-green-800/50">
          <ArrowUpIcon class="h-6 w-6 text-green-500" />
        </div>
      </div>
      <p class="text-3xl font-bold text-green-600 dark:text-green-400">
        +${{ inc.toLocaleString() }}
      </p>
    </div>
    <div
      class="rounded-xl border border-zinc-200 bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-red-700 dark:from-red-900/30 dark:to-red-800/30"
    >
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Expenses</h4>
        <div class="rounded-lg bg-red-100 p-2 dark:bg-red-800/50">
          <ArrowDownIcon class="h-6 w-6 text-red-500" />
        </div>
      </div>
      <p class="text-3xl font-bold text-red-600 dark:text-red-500">
        -${{ Math.abs(exp).toLocaleString() }}
      </p>
    </div>
    <div
      class="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-green-700 dark:from-green-900/30 dark:to-green-800/30"
    >
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Net Savings</h4>
        <div
          class="flex h-10 w-10 items-center justify-center rounded-lg"
          :class="tot >= 0 ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'"
        >
          <span class="text-xl font-bold" :class="tot >= 0 ? 'text-green-500' : 'text-red-500'"
            >%</span
          >
        </div>
      </div>
      <p
        class="text-3xl font-bold"
        :class="tot >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'"
      >
        {{ (inc > 0 ? ((inc + exp) / inc) * 100 : 0).toFixed(1) }}%
      </p>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/outline'

defineProps({
  tot: {
    type: Number,
    required: true,
  },
  inc: {
    type: Number,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
})
</script>
