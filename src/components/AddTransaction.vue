<template>
  <div style="text-align: center;">
    <h4>NEW TRANSACTION</h4>
</div>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text"><small><b>asset title</b></small></label>
      <input
        type="text"
        id="text"
        v-model="text"
        placeholder="enter text.."
      />
    </div>
    <div class="form-control">
      <label for="amount">
        <small><b>amount</b></small> 
      </label>
      <input
        type="text"
        id="amount"
        v-model="amount"
        placeholder="- for expense, + for income"
      />
    </div>
    <button class="btn">ENTER</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification"; // Import useToast

const text = ref('');
const amount = ref('');

const emit = defineEmits(['transactionSubmitted'])

const toast = useToast(); // Initialize toast

const onSubmit = () => {
  // Validation: Check if the text and amount are provided
  if (!text.value || !amount.value) {
    toast.error('Both fields must be filled'); // Display error message
    return; // Stop execution if fields are empty
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value) // Use a comma instead of a semicolon here
  };

  emit('transactionSubmitted', transactionData);

  // Reset the form after submission
  text.value = '';
  amount.value = '';
};

</script>
