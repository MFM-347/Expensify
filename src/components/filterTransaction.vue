<template>
  <div class="flex flex-row justify-around space-x-0 my-4">
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
</template>

<script setup>
defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["filterChanged"]);
const applyFilter = (filterType) => {
  emit("filterChanged", filterType);
};
</script>

<style>
.filter {
  @apply w-1/3 h-auto px-4 py-2;
}

.filter-active {
  @apply border-2 border-blue-500 font-bold;
  font-weight: bold;
}
</style>
