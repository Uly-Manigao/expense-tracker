<template>
  <div class="inc-exp-container">
    <div>
      <h4>TAX EXCLUDED</h4>
      <p class="money partial">&#8369;{{ income.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  income: {
    type: Number,
    required: true
  }
});
</script>
