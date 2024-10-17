<template>
  <div style="text-align: center;">
    <h4>NEW TRANSACTION</h4>
</div>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text"><small><i><b>asset title</b></i></small></label>
      <input
        type="text"
        id="text"
        v-model="text"
        placeholder="enter title"
      />
    </div>
    <div class="form-control">
      <label for="pieces">
        <small><i><b>pieces</b></i></small>
      </label>
      <input
        type="number"
        id="pieces"
        v-model="pieces"
        placeholder="number of items"
      />
    </div>
    <div class="form-control">
      <label for="amount">
        <small><i><b>amount</b></i></small> 
      </label>
      <input
        type="number"
        id="amount"
        v-model="amount"
        placeholder="- for expense, + for income"
      />
    </div>
    <div class="form-control">
      <label for="tax">
        <small><i><b>tax%</b></i></small>
      </label>
      <input
        type="number"
        id="tax"
        v-model="tax"
        placeholder="percent of tax"
      />
    </div>
    <button class="btn">ENTER</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification"; 

const text = ref('');
const pieces = ref('');
const amount = ref('');
const tax = ref('');

const emit = defineEmits(['transactionSubmitted'])

const toast = useToast(); 

const onSubmit = () => {
  if (!text.value && !amount.value && !pieces.value) {
    toast.error('All fields must be filled'); 
  }


  if (!text.value) {
    toast.error('Asset title must be filled'); 
    return
  }

  if (!pieces.value) {
    toast.error('Number of pieces must be filled'); 
    return
  }

  if (!amount.value) {
    toast.error('Amount must be filled')
    return
  }

  if (!tax.value) {
    toast.error('Tax must be filled')
    return
  }

  if (tax.value > 100) {
    toast.error('Tax must not exceed 100%')
    return
  }

  const transactionData = {
    text: text.value,
    pieces: parseFloat(pieces.value),
    tax: parseFloat(tax.value),
    amount: parseFloat(amount.value)
  };

  emit('transactionSubmitted', transactionData);

// to reset the form after submission
  text.value = '';
  pieces.value = '';
  amount.value = '';
  tax.value = '';
};

</script>
