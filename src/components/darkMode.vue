<template>
  <div class="fixed bottom-8 right-8">
    <button @click="toggleDarkMode" class="btn">
      <i :class="icon"></i> Toggle Theme
    </button>
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
