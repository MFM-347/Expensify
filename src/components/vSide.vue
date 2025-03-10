<template>
  <div class="flex flex-col space-y-2">
    <section id="filter" class="rounded-xl bg-white p-4 shadow-md dark:bg-zinc-800">
      <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Filter Transactions</h3>
      <div class="flex flex-col space-y-3">
        <div class="flex justify-between gap-x-2 rounded-xl bg-gray-100 p-1 dark:bg-zinc-900">
          <button
            :class="[
              'filter',
              filter === 'all'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-800 dark:text-white'
                : 'filterx',
            ]"
            @click="setFilter('all')"
          >
            All
          </button>
          <button
            :class="[
              'filter',
              filter === 'income'
                ? 'bg-green-100 text-green-700 shadow-sm dark:bg-green-900/30 dark:text-green-400'
                : 'filterx',
            ]"
            @click="setFilter('income')"
          >
            Income
          </button>
          <button
            :class="[
              'filter',
              filter === 'expenses'
                ? 'bg-red-100 text-red-700 shadow-sm dark:bg-red-900/30 dark:text-red-400'
                : 'filterx',
            ]"
            @click="setFilter('expenses')"
          >
            Expenses
          </button>
        </div>
        <div class="space-y-2">
          <div>
            <label class="label" for="startDate"> Start Date </label>
            <input
              class="inp"
              type="date"
              id="startDate"
              v-model="startDt"
              @change="updateFilters"
            />
          </div>
          <div>
            <label class="label" for="endDate"> End Date </label>
            <input class="inp" type="date" id="endDate" v-model="endDt" @change="updateFilters" />
          </div>
          <div>
            <label class="label" for="filterCategory"> Category </label>
            <select class="inp" id="filterCategory" v-model="cat" @change="updateFilters">
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
    <section id="add-transaction-form" class="rounded-xl bg-white p-4 shadow-md dark:bg-zinc-800">
      <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Add New Transaction</h3>
      <form id="form" @submit.prevent="onSubmit" class="space-y-2">
        <div>
          <label class="label" for="text"> Title </label>
          <input
            class="inp"
            type="text"
            id="text"
            placeholder="Enter title..."
            v-model="title"
            required
          />
        </div>
        <div>
          <label class="label" for="amount"> Amount </label>
          <div class="relative">
            <span class="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">$</span>
            <input
              class="inp"
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
        <div>
          <label class="label" for="date"> Date </label>
          <input class="inp" type="date" id="date" v-model="dt" required />
        </div>
        <div>
          <label class="label" for="category"> Category </label>
          <select id="category" v-model="cat" class="inp" required>
            <option value="" disabled selected>Select a category</option>
            <option value="Income">Income</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" class="btn">Add Transaction</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useFilterStore } from '../stores'
import { toast } from 'vue3-toastify'

const props = defineProps({
  filter: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['filterChanged', 'txnSubmitted'])
const filterStore = useFilterStore()
const startDt = computed({
  get: () => filterStore.startDate,
  set: (val) => (filterStore.startDate = val),
})
const endDt = computed({
  get: () => filterStore.endDate,
  set: (val) => (filterStore.endDate = val),
})
const cat = computed({
  get: () => filterStore.filterCategory,
  set: (val) => (filterStore.filterCategory = val),
})
const title = ref('')
const amt = ref('')
const dt = ref('')
const filter = ref(props.filter)
const setFilter = (type) => {
  filter.value = type
  emit('filterChanged', type)
}
const updateFilters = () => {
  filterStore.startDate = startDt.value
  filterStore.endDate = endDt.value
  filterStore.filterCategory = cat.value
}
watch(
  () => filterStore.startDate,
  (newVal) => {
    startDt.value = newVal
  },
)
watch(
  () => filterStore.endDate,
  (newVal) => {
    endDt.value = newVal
  },
)
watch(
  () => filterStore.filterCategory,
  (newVal) => {
    cat.value = newVal
  },
)
watch(
  () => props.filter,
  (newVal) => {
    filter.value = newVal
  },
  { immediate: true },
)
onMounted(() => {
  const today = new Date().toISOString().split('T')[0]
  dt.value = today
})
const onSubmit = () => {
  if (!title.value || !amt.value || !dt.value || !cat.value) {
    toast.error('Please fill in all fields')
    return
  }
  const txn = {
    title: title.value,
    amount: amt.value * (cat.value === 'Income' ? 1 : -1),
    date: dt.value,
    category: cat.value,
  }
  emit('txnSubmitted', txn)
  title.value = ''
  amt.value = ''
  dt.value = new Date().toISOString().split('T')[0]
  cat.value = ''

  toast.success('Transaction added successfully!')
}
</script>

<style scoped>
@reference '@/style.css';

.filter {
  @apply flex-1 rounded-lg px-3 py-2 text-sm font-medium ta-200;
}
.filterx {
  @apply text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100;
}
</style>
