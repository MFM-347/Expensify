<template>
  <div>
    <h3 class="heading">History</h3>
    <ul class="p-0 list-none mb-10 list" id="list">
      <li
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        :class="[
          transaction.amount < 0 ? 'minus text-red-500' : 'plus text-green-500',
          'flex justify-between items-center p-4 my-2 rounded-lg shadow-md bg-zinc-200 dark:bg-zinc-800 dark:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105',
        ]"
      >
        <span class="font-medium flex-1 truncate">
          {{ transaction.title }}
        </span>
        <span class="font-bold text-lg ml-4">
          ${{ Math.abs(transaction.amount).toFixed(2) }}
        </span>
        <button
          class="ml-4 bg-red-500 text-white rounded-full px-4 py-1 hover:bg-red-600 transition-colors"
          @click="deleteTransaction(transaction.id)"
          title="Delete Transaction"
        >
          &#x2715;
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  activeFilter: {
    type: String,
    required: true,
  },
});
const filteredTransactions = computed(() => {
  if (props.activeFilter === "all") return props.transactions;
  return props.transactions.filter((transaction) =>
    props.activeFilter === "income"
      ? transaction.amount > 0
      : transaction.amount < 0,
  );
});
const emit = defineEmits(["transactionDeleted"]);
const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};
</script>
