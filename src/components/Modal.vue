<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <input v-if="inputVisible" type="text" v-model="userInput" placeholder="Enter ID" />
        <div class="modal-buttons">
          <button @click="confirmAction" class="modal-btn">{{ confirmText }}</button>
          <button @click="$emit('close')" class="modal-btn cancel">{{ cancelText }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps } from 'vue';
  import { useToast } from "vue-toastification"; 
  
  const props = defineProps({
    show: Boolean,
    title: String,
    message: String,
    confirmText: String,
    cancelText: String,
    inputVisible: Boolean,
  });
  
  const emits = defineEmits(['confirm', 'close']);
  
  const userInput = ref("");
  const toast = useToast(); // Initialize the toast
  
  const confirmAction = () => {
    if (props.inputVisible && userInput.value.trim() === "") {
      toast.error("Please enter a valid ID or Custom ID."); // Use toast for error notification
      return;
    }
    emits("confirm", props.inputVisible ? userInput.value : null);
    emits("close");
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .modal-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #53c349;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  .modal-btn:hover {
    background-color: #3b8a34;
  }
  
  .modal-btn.cancel {
    background-color: #e74c3c;
  }
  
  .modal-btn.cancel:hover {
    background-color: #c0392b;
  }
  </style>
  