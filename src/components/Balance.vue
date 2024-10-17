<template>
    <div class="inc-exp-container">
      <div>
        <h4>TOTAL BALANCE</h4>
        <p class="money plus">&#8369;{{ total.toFixed(2) }}</p>
      </div>
    </div>
  </template>
<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    total: {
        type: Number,
        required: true,
    }
})

</script>
