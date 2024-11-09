<template>
  <h3 class="heading">History</h3>
  <ul class="p-0 list-none mb-10 list" id="list">
    <li
      v-for="transaction in transactions"
      class="flex justify-between relative p-2.5 my-2.5 mx-0 bg-c1-200 dark:bg-c1-900"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }} <span>${{ transaction.amount }}</span>
      <button
        class="border-0 text-base py-2 px-3 rounded-l-lg absolute text-gray-200 bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 delbtn font-extrabold"
        @click="deleteTransaction(transaction.id)"
      >
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

const emit = defineEmits(["transactionDeleted"]);

const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};
</script>
