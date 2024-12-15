<template>
  <div class="flex flex-col justify-center items-center text-base">
    <AppHeader />
    <div
      class="container w-full px-4 sm:w-[20rem] lg:w-[25rem] mt-4 mb-10 mx-auto"
    >
      <UserBalance :total="total" :income="income" :expenses="expenses" />
      <FilterTransaction
        :activeFilter="activeFilter"
        @filterChanged="updateFilter"
      />
      <TransactionList
        :transactions="filteredTransactions"
        :activeFilter="activeFilter"
        @transactionDeleted="handleTransactionDeleted"
      />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
      <div class="flex flex-row space-x-2 justify-center mt-2">
        <input
          type="file"
          accept=".json"
          id="fileInput"
          class="hidden"
          @change="importTransactions"
        />
        <label for="fileInput" class="btn text-center cursor-pointer">
          <i class="fa fa-upload mr-2"></i> Import
        </label>
        <button class="btn text-center" @click="exportTransactions">
          <i class="fa fa-download mr-2"></i> Export
        </button>
      </div>
    </div>
    <NavBar class="fixed bottom-4 mx-auto py-2" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import AppHeader from "./components/AppHeader.vue";
import UserBalance from "./components/UserBalance.vue";
import TransactionList from "./components/TransactionList.vue";
import FilterTransaction from "./components/filterTransaction.vue";
import AddTransaction from "./components/AddTransaction.vue";
import NavBar from "./components/NavBar.vue";

const transactions = ref([
  {
    id: 1,
    title: "Salary",
    category: "Income",
    date: "2024-12-01",
    amount: 1500,
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    date: "2024-12-02",
    amount: -250,
  },
]);
const activeFilter = ref("all");
const startDate = ref("");
const endDate = ref("");
const filterCategory = ref("all");
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});
const total = computed(() =>
  transactions.value.reduce((sum, t) => sum + t.amount, 0),
);
const income = computed(() =>
  transactions.value
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0),
);
const expenses = computed(() =>
  transactions.value
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0),
);
const filteredTransactions = computed(() => {
  let filtered = transactions.value;
  if (activeFilter.value !== "all") {
    filtered = filtered.filter((t) =>
      activeFilter.value === "income" ? t.amount > 0 : t.amount < 0,
    );
  }
  if (startDate.value) {
    filtered = filtered.filter(
      (t) => new Date(t.date) >= new Date(startDate.value),
    );
  }
  if (endDate.value) {
    filtered = filtered.filter(
      (t) => new Date(t.date) <= new Date(endDate.value),
    );
  }
  if (filterCategory.value !== "all") {
    filtered = filtered.filter((t) => t.category === filterCategory.value);
  }

  return filtered;
});
const updateFilter = (filter) => {
  activeFilter.value = filter.type;
  startDate.value = filter.startDate;
  endDate.value = filter.endDate;
  filterCategory.value = filter.category;
};
const handleTransactionSubmitted = (transaction) => {
  transactions.value.push({
    ...transaction,
    id: generateUniqueId(),
  });
  saveTransactionsToLocalStorage();
  toast("Transaction added.", {
    theme: "auto",
    autoClose: 1000,
    type: "success",
  });
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
const generateUniqueId = () => {
  if (transactions.value.length === 0) {
    return 1;
  }
  return Math.max(...transactions.value.map((t) => t.id)) + 1;
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
      console.error("Import error:", error);
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
