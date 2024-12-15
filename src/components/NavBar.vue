<template>
  <div
    class="flex h-10 items-center gap-x-1 rounded-md border bg-zinc-50 dark:bg-zinc-950 p-1"
  >
    <div class="flex justify-around">
      <a
        href="https://github.com/MFM-347/Expense-Tracker"
        target="_blank"
        class="lnk"
      >
        <i class="fa fa-code"></i> Source Code
      </a>
      <a href="https://github.com/MFM-347/" target="_blank" class="lnk">
        <i class="fa fa-user"></i> Author
      </a>
      <button @click="toggleDarkMode" class="lnk">
        <i :class="icon"></i> Dark Mode
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "fas fa-moon",
    };
  },
  methods: {
    toggleDarkMode() {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
      this.icon = isDark ? "fas fa-sun" : "fas fa-moon";
    },
  },
  mounted() {
    if (localStorage.getItem("dark-mode") === "enabled") {
      document.documentElement.classList.add("dark");
      this.icon = "fas fa-sun";
    }
  },
};
</script>
<style scoped>
.lnk {
  @apply inline-flex justify-center gap-2 cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-zinc-200 hover:dark:bg-zinc-800;
}
</style>
