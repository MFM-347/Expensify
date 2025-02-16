<template>
  <vNav @toggle-sidebar="toggleSide" @add-transaction="onTxnAdd" />
  <div class="container mx-auto px-4 py-8">
    <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
      <Transition name="sidebar">
        <div
          v-show="showSide"
          class="fixed lg:relative inset-y-0 left-0 z-40 lg:z-0 w-80 lg:w-auto bg-white dark:bg-zinc-900 shadow-2xl lg:shadow-none overflow-y-auto lg:overflow-visible lg:col-span-3"
        >
          <div
            class="sticky top-8 h-[calc(100vh-4rem)] overflow-y-scroll px-4 lg:px-0 py-8 lg:py-0 scroll scroll-smooth"
          >
            <vSide :filter="filter" @filterChanged="updateFilter" @txnSubmitted="onTxnSubmit" />
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <div
          v-if="showSide"
          @click="toggleSide"
          class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      </Transition>
      <div
        :class="[
          'transition-all duration-300',
          'lg:col-span-9 space-y-8',
          showSide ? 'lg:ml-0' : 'lg:col-start-1 lg:col-span-12',
        ]"
      >
        <vBalance :tot="total" :inc="income" :exp="expenses" />

        <div
          class="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 p-6"
        >
          <vHistory :txns="txns" :filter="filter" @txnDeleted="onTxnDelete" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="file"
            accept=".json"
            id="fileInput"
            class="hidden"
            @change="importTransactions"
          />
          <label
            for="fileInput"
            class="btn flex items-center justify-center cursor-pointer bg-primary-500 hover:bg-primary-600 text-white rounded-xl shadow-md py-3 px-6 transition-all duration-300 hover:shadow-lg transform hover:scale-102"
          >
            <ArrowUpTrayIcon class="w-5 h-5 mr-2" />
            Import Transactions
          </label>
          <button
            class="btn flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white rounded-xl shadow-md py-3 px-6 transition-all duration-300 hover:shadow-lg transform"
            @click="exportTransactions"
          >
            <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
            Export Transactions
          </button>
        </div>
      </div>
    </div>
  </div>
  <PWABadge />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFilterStore } from './stores'
import { ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import vNav from './components/vNav.vue'
import vBalance from './components/vBalance.vue'
import vHistory from './components/vHistory.vue'
import vSide from './components/vSide.vue'
import PWABadge from './components/PWABadge.vue'

const filterStore = useFilterStore()
const filter = ref('all')
const showSide = ref(false)

const updateFilter = (filter) => {
  filter.value = filter
}

const onTxnDelete = (id) => {
  transactions.value = [...transactions.value.filter((t) => t.id !== id)]
  saveTransactionsToLocalStorage()
  toast('Transaction deleted.', {
    theme: 'auto',
    autoClose: 1000,
    type: 'success',
  })
}

const transactions = ref([
  {
    id: 1,
    title: 'Salary',
    category: 'Income',
    date: '2024-12-01',
    amount: 1500,
  },
  {
    id: 2,
    title: 'Groceries',
    category: 'Food',
    date: '2024-12-02',
    amount: -250,
  },
])

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

const total = computed(() => transactions.value.reduce((sum, t) => sum + t.amount, 0))

const income = computed(() =>
  transactions.value.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
)

const expenses = computed(() =>
  transactions.value.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0),
)

const txns = computed(() => {
  let filtered = [...transactions.value]
  if (filter.value !== 'all') {
    filtered = filtered.filter((t) => (filter.value === 'income' ? t.amount > 0 : t.amount < 0))
  }
  if (filterStore.startDate) {
    filtered = filtered.filter((t) => new Date(t.date) >= new Date(filterStore.startDate))
  }
  if (filterStore.endDate) {
    filtered = filtered.filter((t) => new Date(t.date) <= new Date(filterStore.endDate))
  }
  if (filterStore.filterCategory !== 'all') {
    filtered = filtered.filter((t) => t.category === filterStore.filterCategory)
  }
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})
const onTxnSubmit = (transaction) => {
  const newTransaction = { ...transaction, id: generateUniqueId() }
  transactions.value = [...transactions.value, newTransaction]
  saveTransactionsToLocalStorage()
  toast('Transaction added.', {
    theme: 'auto',
    autoClose: 1000,
    type: 'success',
  })
}
const generateUniqueId = () => {
  if (transactions.value.length === 0) {
    return 1
  }
  return Math.max(...transactions.value.map((t) => t.id)) + 1
}
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
const exportTransactions = () => {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions.value))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', 'transactions.json')
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
const importTransactions = (event) => {
  const confirmation = confirm('This will remove previous data. Do you want to proceed?')
  if (!confirmation) return
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedTransactions = JSON.parse(e.target.result)
      if (Array.isArray(importedTransactions)) {
        transactions.value = importedTransactions
        saveTransactionsToLocalStorage()
        toast('Transactions imported.', {
          theme: 'auto',
          autoClose: 1000,
          type: 'success',
        })
      } else {
        throw new Error('Invalid file format')
      }
    } catch (error) {
      console.error('Import error:', error)
      toast('Error importing transactions.', {
        theme: 'auto',
        autoClose: 1000,
        type: 'error',
      })
    }
  }
  reader.readAsText(file)
}
const toggleSide = () => {
  showSide.value = !showSide.value
}
const onTxnAdd = () => {
  showSide.value = true
}
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
