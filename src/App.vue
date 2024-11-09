<template>
  <div
    class="bgc bg-c1-100 text-gray-900 dark:bg-c1-950 dark:text-gray-100 flex flex-col justify-center items-center text-base"
  >
    <AppHeader />
    <div class="container w-[25rem] my-7 mx-auto">
      <UserBalance :total="total" :income="income" :expenses="expenses" />
      <TransactionList
        :transactions="transactions"
        @transactionDeleted="handleTransactionDeleted"
      />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
      <div class="mt-4 flex space-x-3">
        <button @click="exportTransactions" class="btn">Export</button>
        <input type="file" @change="importTransactions" class="btn" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AppHeader from "./components/AppHeader.vue";
import UserBalance from "./components/UserBalance.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { ref, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const transactions = ref([]);
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    title: transactionData.title,
    amount: transactionData.amount,
  });
  saveTransactionsToLocalStorage();
  toast("Transaction added.", {
    theme: "auto",
    autoClose: 1000,
    type: "success",
  });
};
const generateUniqueId = () => {
  if (transactions.value.length === 0) {
    return 0;
  }
  const maxId = Math.max(
    ...transactions.value.map((transaction) => transaction.id),
  );
  return maxId + 1;
};
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id,
  );
  saveTransactionsToLocalStorage();
  toast("Transaction deleted.", {
    theme: "auto",
    autoClose: 1000,
    type: "success",
  });
};
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
const exportTransactions = () => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(transactions.value));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "transactions.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
const importTransactions = (event) => {
  const confirmation = confirm(
    "This will remove previous data. Do you want to proceed?",
  );
  if (!confirmation) {
    return;
  }
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedTransactions = JSON.parse(e.target.result);
      if (Array.isArray(importedTransactions)) {
        transactions.value = importedTransactions;
        saveTransactionsToLocalStorage();
        toast("Transactions imported.", {
          theme: "auto",
          autoClose: 1000,
          type: "success",
        });
      } else {
        throw new Error("Invalid file format");
      }
    } catch (error) {
      toast("Error importing transactions.", {
        theme: "auto",
        autoClose: 1000,
        type: "error",
      });
    }
  };
  reader.readAsText(file);
};
</script>
