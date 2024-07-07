<template>
  <h3
    class="border-b-[1px] border-gray-400 dark:border-gray-300 pb-[0.625rem] mt-10 mb-2.5 mx-0 font-heading font-bold text-[21px]">
    Add new transaction
  </h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label class="inline-block my-2.5 mx-0 font-text" for="text">Title</label>
      <input
        class="rounded-[3px] p-2.5 text-[16px] border-[1px] border-zinc-300 dark:border-slate-700 bg-zinc-100 dark:bg-slate-900 font-text w-full block"
        type="text" id="text" placeholder="Enter text..." v-model="title" />
    </div>
    <div class="form-control">
      <label class="inline-block my-2.5 mx-0 font-text" for="amount">Amount <br />
        (negative - expense, positive - income)</label>
      <input
        class="rounded-[3px] p-2.5 text-[16px] border-[1px] border-zinc-300 dark:border-slate-700 bg-zinc-100 dark:bg-slate-900 font-text w-full block"
        type="number" id="amount" placeholder="Enter amount..." v-model="amount" />
    </div>
    <button
      class="bg-violet-500 text-gray-950 hover:bg-violet-600 shadow-s1 dark:shadow-s2 text-[16px] mt-3 mb-5 mx-0 p-2.5 font-text font-bold w-full block">
      Add Transaction
    </button>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const title = ref('');
const amount = ref('');
const emit = defineEmits(['transactionSubmitted']);
const onSubmit = () => {
  if (!title.value || !amount.value) {
    // Display a toast error message if either field is empty
    toast('Both fields must be filled.', {
      "theme": "auto",
      "type": "error",
      "autoClose": 1000
    });
    return;
  }
  const transactionData = {
    title: title.value,
    amount: parseFloat(amount.value),
  };
  emit('transactionSubmitted', transactionData);
  // Clear form fields
  title.value = '';
  amount.value = '';
};
</script>