<template>
  <h3
    class="border-b-[1px] border-gray-400 dark:border-gray-300 pb-[0.625rem] mt-10 mb-2.5 mx-0 font-heading font-bold text-[21px]">
    History
  </h3>
  <ul class="p-0 list-none mb-10 list" id="list">
    <li v-for="transaction in transactions"
      class="flex justify-between relative p-2.5 my-2.5 mx-0 bg-zinc-100 dark:bg-slate-900 shadow-s1 dark:shadow-s2"
      :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
      {{ transaction.text }} <span>${{ transaction.amount }}</span>
      <button
        class="border-0 text-[20px] py-2 px-5 rounded-l-lg absolute shadow-s1 dark:shadow-s2 text-gray-100 bg-red-600 delbtn font-extrabold"
        @click="deleteTransaction(transaction.id)">
        &#x2573;
      </button>
    </li>
  </ul>
</template>
<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['transactionDeleted']);

const deleteTransaction = (id) => {
  emit('transactionDeleted', id);
};
</script>