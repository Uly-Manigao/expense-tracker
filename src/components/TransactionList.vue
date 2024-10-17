
<template>
    <h4>HISTORY</h4>
    <ul id="list" class="list">
      <li 
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
        >
        <input type="text" v-model="transaction.text" placeholder="title"  />
        <input type="number" v-model="transaction.pieces" placeholder="pieces"  />
        <input type="number" v-model="transaction.amount" placeholder="amount"/>
        <input type="number" v-model="transaction.tax" placeholder="tax" />
        <!-- {{ transaction.pieces }} pc {{ transaction.text }} <span>&#8369;{{ transaction.amount }}</span> -{{ transaction.tax }}% -->
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
