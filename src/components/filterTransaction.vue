<template>
  <div class="flex flex-col space-y-4">
    <div class="flex justify-around">
      <button
        class="filter rounded-l-lg"
        :class="{ 'filter-active': activeFilter === 'all' }"
        @click="applyFilter('all')"
      >
        All
      </button>
      <button
        class="filter rounded-none bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600"
        :class="{ 'filter-active': activeFilter === 'income' }"
        @click="applyFilter('income')"
      >
        Income
      </button>
      <button
        class="filter rounded-r-lg bg-red-400 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600"
        :class="{ 'filter-active': activeFilter === 'expenses' }"
        @click="applyFilter('expenses')"
      >
        Expenses
      </button>
    </div>

    <div class="form-control">
      <label class="label" for="startDate">Start Date</label>
      <input
        class="inp"
        type="date"
        id="startDate"
        v-model="startDate"
        @input="updateFilters"
      />
    </div>
    <div class="form-control">
      <label class="label" for="endDate">End Date</label>
      <input
        class="inp"
        type="date"
        id="endDate"
        v-model="endDate"
        @input="updateFilters"
      />
    </div>
    <div class="form-control">
      <label class="label" for="filterCategory">Category</label>
      <select
        class="inp"
        id="filterCategory"
        v-model="filterCategory"
        @change="updateFilters"
      >
        <option value="all">All</option>
        <option value="Income">Income</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["filterChanged"]);
const startDate = ref("");
const endDate = ref("");
const filterCategory = ref("all");
const applyFilter = (filterType) => {
  emit("filterChanged", {
    type: filterType,
    startDate: startDate.value,
    endDate: endDate.value,
    category: filterCategory.value,
  });
};
const updateFilters = () => {
  emit("filterChanged", {
    type: props.activeFilter,
    startDate: startDate.value,
    endDate: endDate.value,
    category: filterCategory.value,
  });
};
</script>

<style>
.filter {
  @apply w-1/3 h-auto px-4 py-2;
}

.filter-active {
  @apply border-2 border-blue-500 font-bold;
}
</style>
