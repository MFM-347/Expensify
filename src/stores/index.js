import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const startDate = ref('')
  const endDate = ref('')
  const filterCategory = ref('all')
  const resetFilters = () => {
    startDate.value = ''
    endDate.value = ''
    filterCategory.value = 'all'
  }
  return {
    startDate,
    endDate,
    filterCategory,
    resetFilters,
  }
})
