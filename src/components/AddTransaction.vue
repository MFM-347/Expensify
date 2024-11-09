<template>
  <h3 class="heading">Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label class="inline-block my-2.5 mx-0" for="text">Title</label>
      <input
        class="inp"
        type="text"
        id="text"
        placeholder="Enter title..."
        v-model="title"
      />
    </div>
    <div class="form-control">
      <label class="inline-block my-2.5 mx-0" for="amount">
        Amount <br />
        (negative (-) - expense, positive (+) - income)</label
      >
      <input
        class="inp"
        type="number"
        id="amount"
        placeholder="Enter amount..."
        v-model="amount"
      />
    </div>
    <button class="btn">Add Transaction</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const title = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmitted"]);
const onSubmit = () => {
  if (!title.value || !amount.value) {
    toast("Both fields must be filled.", {
      theme: "auto",
      type: "error",
      autoClose: 1000,
    });
    return;
  }
  const transactionData = {
    title: title.value,
    amount: parseFloat(amount.value),
  };
  emit("transactionSubmitted", transactionData);
  title.value = "";
  amount.value = "";
};
</script>
