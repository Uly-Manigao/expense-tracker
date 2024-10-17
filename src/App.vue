<template>
  <IDprompt />
  <Header />
  <div class="container">
    <Balance :total="total"/>
    <IncomeExpenses :income="income"/>
    <TransactionList :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"/>
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import IDprompt from './components/IDprompt.vue';

import { ref, computed, onMounted, provide } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const transactions = ref([]);
const userId = ref(localStorage.getItem('userId') || null); // Store current user ID

// Load transactions for the current user ID
const loadUserTransactions = (id) => {
  const savedTransactions = JSON.parse(localStorage.getItem(`transactions_${id}`));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  } else {
    transactions.value = [];
  }
};

// Save transactions for the current user ID
const saveUserTransactions = () => {
  if (userId.value) {
    localStorage.setItem(`transactions_${userId.value}`, JSON.stringify(transactions.value));
  }
};

// On component mount, load transactions for the current user ID if available
onMounted(() => {
  if (userId.value) {
    loadUserTransactions(userId.value);
  }
});

// Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0 || transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount * transaction.pieces, 0);
});

// Get total
const total = computed(() => {
  const incomeAmount = income.value;
  const totalTax = transactions.value.reduce((acc, transaction) => {
    return acc + (incomeAmount * transaction.tax / 100);
  }, 0);

  return incomeAmount - totalTax;
});

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  if (!userId.value) {
    toast.error("No User ID set. Please set a User ID first.");
    return;
  }

  const newTransaction = {
    id: generateUniqueId(),
    text: transactionData.text,
    pieces: transactionData.pieces,
    amount: transactionData.amount,
    tax: transactionData.tax
  };

  transactions.value.push(newTransaction);
  saveUserTransactions();
  toast.success("Transaction added");
};

// Generate Unique ID for transactions
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(transaction => transaction.id !== id);
  saveUserTransactions();
  toast.success('Transaction Deleted');
};

// Listen for user ID changes and update transactions accordingly
const onUserIdChanged = (newId) => {
  userId.value = newId;
  localStorage.setItem('userId', newId); // Update stored user ID
  loadUserTransactions(newId);
};

// Clear transactions when user exits
const clearTransactions = () => {
  transactions.value = [];
};

// Expose to IDprompt for setting and clearing user ID
const setUserId = (id) => {
  onUserIdChanged(id);
};

const exitUserId = () => {
  clearTransactions(); // Clear transactions from the screen
  userId.value = null;
  localStorage.removeItem('userId'); // Remove user ID from localStorage
  toast.success("User ID exited. You have been logged out.");
};

// Provide methods to the `IDprompt` component
provide('setUserId', setUserId);
provide('exitUserId', exitUserId);
</script>
