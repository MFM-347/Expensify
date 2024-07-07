<template>
  <h4 class="m-0 uppercase font-bold font-heading">Your Balance</h4>
  <h1 class="m-0 text-[36px] tracking-[1px] font-bold font-heading" id="balance">
    ${{ total }}
  </h1>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
});
</script>