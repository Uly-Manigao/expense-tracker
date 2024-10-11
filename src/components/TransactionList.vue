<template>
    <h4>HISTORY</h4>
    <ul id="list" class="list">
      <li 
        v-for="transaction in transactions" 
        :key="transaction.id" 
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
        >
        {{ transaction.text }} <span>&#8369;{{ transaction.amount }}</span>
        <button @click="deleteTransaction(transaction.id)" class="delete-btn"><b>x</b></button>
      </li>
    </ul>
  </template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['transactionDeleted']);

const props = defineProps({
    transactions: {
        type: Array,
        required: true,
    }
})

const deleteTransaction = (id) => {
emit('transactionDeleted', id);
}
</script>