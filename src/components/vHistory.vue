<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Transaction History
      </h3>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ txns.length }} transaction{{ txns.length !== 1 ? "s" : "" }}
      </div>
    </div>
    <TransitionGroup name="list" tag="ul" class="space-y-4">
      <li
        v-for="txn in txns"
        :key="txn.id"
        class="group relative flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-md"
        :class="[
          txn.amount < 0
            ? 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            : 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
        ]"
      >
        <div class="flex-1 min-w-0 pr-4">
          <div class="flex items-center space-x-3">
            <span
              class="text-lg font-semibold truncate"
              :class="
                txn.amount < 0
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-green-700 dark:text-green-400'
              "
            >
              {{ txn.title }}
            </span>
            <span
              class="px-3 py-1 text-sm rounded-full"
              :class="
                txn.amount < 0
                  ? 'bg-red-100 dark:bg-red-800/40 text-red-700 dark:text-red-300'
                  : 'bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300'
              "
            >
              {{ txn.category }}
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span class="sm:hidden">
              {{
                new Date(txn.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </span>
            <span class="hidden sm:inline">
              {{
                new Date(txn.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </span>
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <span
            class="text-xl font-bold whitespace-nowrap"
            :class="
              txn.amount < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            "
          >
            {{ txn.amount < 0 ? "-" : "+" }}${{
              Math.abs(txn.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </span>
          <button
            @click="onDelete(txn.id)"
            class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/40"
            title="Delete Transaction"
          >
            <TrashIcon class="w-5 h-5 text-red-500" />
          </button>
        </div>
      </li>
    </TransitionGroup>
    <div
      v-if="txns.length === 0"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <NoSymbolIcon class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <p class="text-gray-500 dark:text-gray-400 text-lg mb-2">
        No transactions found
      </p>
      <p class="text-gray-400 dark:text-gray-500 text-sm">
        {{
          filter === "all"
            ? "Add a new transaction to get started"
            : `No ${filter} transactions in the selected period`
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFilterStore } from "../stores";
import { TrashIcon, NoSymbolIcon } from "@heroicons/vue/24/outline";

const filterStore = useFilterStore();
const props = defineProps({
  txns: {
    type: Array,
    required: true,
  },
  filter: {
    type: String,
    required: true,
  },
});
const txns = computed(() => {
  let filtered = [...props.txns];
  if (props.filter !== "all") {
    filtered = filtered.filter((t) =>
      props.filter === "income" ? t.amount > 0 : t.amount < 0,
    );
  }
  if (filterStore.startDate) {
    filtered = filtered.filter(
      (t) => new Date(t.date) >= new Date(filterStore.startDate),
    );
  }
  if (filterStore.endDate) {
    filtered = filtered.filter(
      (t) => new Date(t.date) <= new Date(filterStore.endDate),
    );
  }
  if (filterStore.filterCategory !== "all") {
    filtered = filtered.filter(
      (t) => t.category === filterStore.filterCategory,
    );
  }
  return filtered;
});
const emit = defineEmits(["txnDeleted"]);
const onDelete = (id) => {
  emit("txnDeleted", id);
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
