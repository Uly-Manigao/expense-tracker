<template>
  <div class="inc-exp-container">
    <div>
      <h4>INCOME</h4>
      <p id="money-plus" class="money plus">+&#8369;{{ income.toFixed(2) }}</p>
    </div>
    <div>
      <h4>EXPENSE</h4>
      <p id="money-minus" class="money minus">-&#8369;{{ expenses.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  }
});
</script>
