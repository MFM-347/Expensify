<template>
  <div class="flex flex-col space-y-6">
    <section
      id="filter"
      class="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md"
    >
      <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Filter Transactions
      </h3>
      <div class="flex flex-col space-y-4">
        <div
          class="flex justify-between gap-2 bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl"
        >
          <button
            class="flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200"
            :class="[
              props.filter === 'all'
                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
            ]"
            @click="setFilter('all')"
          >
            All
          </button>
          <button
            class="flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200"
            :class="[
              filter === 'income'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
            ]"
            @click="setFilter('income')"
          >
            Income
          </button>
          <button
            class="flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200"
            :class="[
              filter === 'expenses'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
            ]"
            @click="setFilter('expenses')"
          >
            Expenses
          </button>
        </div>
        <div class="space-y-4">
          <div class="form-control">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
              for="startDate"
            >
              Start Date
            </label>
            <input
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
              type="date"
              id="startDate"
              v-model="startDt"
              @change="updateFilters"
            />
          </div>
          <div class="form-control">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
              for="endDate"
            >
              End Date
            </label>
            <input
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
              type="date"
              id="endDate"
              v-model="endDt"
              @change="updateFilters"
            />
          </div>
          <div class="form-control">
            <label
              class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
              for="filterCategory"
            >
              Category
            </label>
            <select
              class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
              id="filterCategory"
              v-model="cat"
              @change="updateFilters"
            >
              <option value="all">All Categories</option>
              <option value="Income">Income</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </section>
    <section
      id="add-transaction-form"
      class="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md"
    >
      <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Add New Transaction
      </h3>
      <form id="form" @submit.prevent="onSubmit" class="space-y-4">
        <div class="form-control">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
            for="text"
          >
            Title
          </label>
          <input
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
            type="text"
            id="text"
            placeholder="Enter title..."
            v-model="title"
            required
          />
        </div>
        <div class="form-control">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
            for="amount"
          >
            Amount
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              >$</span
            >
            <input
              class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
              type="number"
              id="amount"
              placeholder="0.00"
              v-model="amt"
              required
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <div class="form-control">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
            for="date"
          >
            Date
          </label>
          <input
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
            type="date"
            id="date"
            v-model="dt"
            required
          />
        </div>
        <div class="form-control">
          <label
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
            for="category"
          >
            Category
          </label>
          <select
            id="category"
            v-model="cat"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-shadow"
            required
          >
            <option value="" disabled selected>Select a category</option>
            <option value="Income">Income</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          Add Transaction
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useFilterStore } from "../stores";
import { toast } from "vue3-toastify";

const props = defineProps({
  filter: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["filterChanged", "txnSubmitted"]);
const filterStore = useFilterStore();
const startDt = ref(filterStore.startDate);
const endDt = ref(filterStore.endDate);
const cat = ref(filterStore.filterCategory);
const title = ref("");
const amt = ref("");
const dt = ref("");
const filter = ref(props.filter);
const setFilter = (type) => {
  emit("filterChanged", type);
};
const updateFilters = () => {
  filterStore.startDate = startDt.value;
  filterStore.endDate = endDt.value;
  filterStore.filterCategory = cat.value;
};
watch(
  () => filterStore.startDate,
  (newVal) => {
    startDt.value = newVal;
  },
);
watch(
  () => filterStore.endDate,
  (newVal) => {
    endDt.value = newVal;
  },
);
watch(
  () => filterStore.filterCategory,
  (newVal) => {
    cat.value = newVal;
  },
);
watch(
  () => props.filter,
  (newVal) => {
    filter.value = newVal;
  },
);
onMounted(() => {
  const today = new Date().toISOString().split("T")[0];
  dt.value = today;
});
const onSubmit = () => {
  if (!title.value || !amt.value || !dt.value || !cat.value) {
    toast.error("Please fill in all fields");
    return;
  }
  const txn = {
    title: title.value,
    amount: amt.value * (cat.value === "Income" ? 1 : -1),
    date: dt.value,
    category: cat.value,
  };
  emit("txnSubmitted", txn);
  title.value = "";
  amt.value = "";
  dt.value = new Date().toISOString().split("T")[0];
  cat.value = "";

  toast.success("Transaction added successfully!");
};
</script>

<style scoped>
.filter {
  @apply w-1/3 py-2 px-4 text-sm font-medium transition-all duration-200 ease-in-out;
}

.filter-active {
  @apply border-2 border-blue-500 font-bold;
}
</style>
