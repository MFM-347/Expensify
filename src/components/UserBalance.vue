<template>
  <div
    class="p-6 bg-zinc-200 dark:bg-zinc-800 shadow-lg rounded-lg max-w-md mx-auto mb-4"
  >
    <h4 class="heading text-center">Your Balance</h4>
    <h1 class="text-center text-5xl font-semibold mb-8" id="balance">
      ${{ total }}
    </h1>
    <div class="p-5 flex justify-between">
      <div
        class="flex-1 text-center border-r border-gray-500 dark:border-gray-500 pr-5"
      >
        <h4 class="uppercase font-bold text-gray-700 dark:text-gray-200">
          <i class="fa fa-arrow-up text-green-500 text-lg ml-4"></i>
          Income
        </h4>
        <span
          id="money-plus"
          class="text-3xl font-semibold my-1.5 text-green-600 dark:text-green-500"
          >+${{ income }}</span
        >
      </div>
      <div class="flex-1 text-center pl-5">
        <h4 class="uppercase font-bold text-gray-700 dark:text-gray-200">
          <i class="fa fa-arrow-down text-red-500 text-lg ml-4"></i>
          Expense
        </h4>
        <span
          id="money-minus"
          class="text-3xl font-semibold my-1.5 text-red-600 dark:text-red-500"
          >-${{ Math.abs(expenses) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
});
</script>
