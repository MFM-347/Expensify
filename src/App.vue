<template>
  <div
    class="con bg-zinc-200 text-gray-950 dark:bg-slate-950 dark:text-gray-200 flex flex-col justify-center items-center text-[18px] m-0">
    <AppHeader />
    <div class="container w-[400px] my-[1.875rem] mx-auto">
      <UserBalance :total="total" />
      <Expenses :income="income" :expenses="expenses" />
      <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
      <div class="mt-4 flex space-x-3">
        <button @click="exportTransactions"
          class="bg-violet-500 text-gray-950 hover:bg-violet-600 shadow-s1 dark:shadow-s2 text-[16px] mt-3 mb-5 mx-0 p-2.5 font-text font-bold w-full block">Export</button>
        <input type="file" @change="importTransactions"
          class="bg-violet-500 text-gray-950 hover:bg-violet-600 shadow-s1 dark:shadow-s2 text-[16px] mt-3 mb-5 mx-0 p-2.5 font-text font-bold w-full block" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AppHeader from './components/AppHeader.vue'
import UserBalance from './components/UserBalance.vue'
import Expenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import { ref, computed, onMounted } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get income
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

// Submit transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    title: transactionData.title,
    amount: transactionData.amount,
  });
  saveTransactionsToLocalStorage();
  toast('Transaction added.', {
    "theme": "auto",
    "autoClose": 1000,
    "type": "success"
  });
};

// Generate unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );
  saveTransactionsToLocalStorage();
  toast('Transaction deleted.', {
    "theme": "auto",
    "autoClose": 1000,
    "type": "success"
  });
};

// Save transactions to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
};

// Export transactions as JSON
const exportTransactions = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions.value));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "transactions.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

// Import transactions from JSON
const importTransactions = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedTransactions = JSON.parse(e.target.result);
      if (Array.isArray(importedTransactions)) {
        transactions.value = importedTransactions;
        saveTransactionsToLocalStorage();
        toast('Transactions imported.', {
          "theme": "auto",
          "autoClose": 1000,
          "type": "success"
        });
      } else {
        throw new Error('Invalid file format');
      }
    } catch (error) {
      toast('Error importing transactions.', {
        "theme": "auto",
        "autoClose": 1000,
        "type": "error"
      });
    }
  };
  reader.readAsText(file);
};
</script>