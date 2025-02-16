<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-8 md:col-span-3 transition-all duration-300 hover:shadow-xl"
    >
      <h4 class="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-3">Total Balance</h4>
      <h1
        class="text-5xl font-bold mt-2 transition-all duration-300"
        :class="tot >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-600 dark:text-red-500'"
      >
        ${{ tot.toLocaleString() }}
      </h1>
    </div>
    <div
      class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl shadow-lg p-8 border border-green-200 dark:border-green-700 transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Income</h4>
        <div class="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
          <ArrowUpIcon class="w-6 h-6 text-green-500" />
        </div>
      </div>
      <p class="text-3xl font-bold text-green-600 dark:text-green-400">
        +${{ inc.toLocaleString() }}
      </p>
    </div>
    <div
      class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl shadow-lg p-8 border border-zinc-200 dark:border-red-700 transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Expenses</h4>
        <div class="p-2 bg-red-100 dark:bg-red-800/50 rounded-lg">
          <ArrowDownIcon class="w-6 h-6 text-red-500" />
        </div>
      </div>
      <p class="text-3xl font-bold text-red-600 dark:text-red-500">
        -${{ Math.abs(exp).toLocaleString() }}
      </p>
    </div>
    <div
      class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl shadow-lg p-8 border border-green-200 dark:border-green-700 transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Net Savings</h4>
        <div
          class="w-10 h-10 flex items-center justify-center rounded-lg"
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
