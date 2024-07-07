<template>
  <div
    class="shadow-s1 dark:shadow-s2 bg-zinc-100 dark:bg-slate-900 p-[1.25rem] flex justify-between my-[1.25rem] mx-0">
    <div class="flex-1 text-center border-r-[2px] border-zinc-300 dark:border-gray-800">
      <h4 class="m-0 uppercase font-bold font-heading">Income</h4>
      <p id="money-plus" class="text-[20px] tracking-[1px] my-[5px] mx-0 text-green-500 plus font-text">
        +${{ income }}
      </p>
    </div>
    <div class="flex-1 text-center">
      <h4 class="m-0 uppercase font-bold font-heading">Expense</h4>
      <p id="money-minus" class="text-[20px] tracking-[1px] my-[5px] mx-0 text-red-500 minus font-text">
        -${{ expenses }}
      </p>
    </div>
  </div>
</template>
<script setup>
defineProps({
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