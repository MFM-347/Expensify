<template>
  <h3 class="heading">Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label class="label" for="text">Title</label>
      <input
        class="inp"
        type="text"
        id="text"
        placeholder="Enter title..."
        v-model="title"
      />
    </div>
    <div class="form-control">
      <label class="label" for="amount">
        <b>Amount Types:-</b><br />
        <b>negative (-):</b> expense;<br />
        <b>positive (+):</b> income</label
      >
      <input
        class="inp"
        type="number"
        id="amount"
        placeholder="Enter amount..."
        v-model="amount"
      />
    </div>
    <div class="form-control">
      <label class="label" for="date">Date</label>
      <input class="inp" type="date" id="date" v-model="date" />
    </div>
    <div class="form-control">
      <label class="label" for="category">Category</label>
      <select class="inp" id="category" v-model="category">
        <option value="Income">Income</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
    </div>
    <button class="btn">Add Transaction</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const date = ref(new Date().toISOString().slice(0, 10));
const category = ref("");
const title = ref("");
const amount = ref("");
const emit = defineEmits(["transactionSubmitted"]);
const onSubmit = () => {
  if (!title.value || !amount.value || !date.value || !category.value) {
    toast("All fields must be filled.", {
      theme: "auto",
      type: "error",
      autoClose: 1000,
    });
    return;
  }
  emit("transactionSubmitted", {
    title: title.value,
    amount: parseFloat(amount.value),
    date: date.value,
    category: category.value,
  });
  title.value = "";
  amount.value = "";
  date.value = new Date().toISOString().slice(0, 10);
  category.value = "";
};
</script>
