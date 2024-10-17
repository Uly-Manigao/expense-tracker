<template>
  <div class="id-prompt-container">
    <p v-if="userId" class="user-id-display">User ID: {{ userId }}</p>
    <div class="buttons-container">
      <button class="id-button left" @click="openNewIdModal">NEW ID</button>
      <button class="ids-button center" @click="openExistingIdModal">LOG ID</button>
      <button class="id-button right exit" @click="exitId">EXIT ID</button>
    </div>
    
    <!-- New ID Modal -->
    <Modal
      v-if="showNewIdModal"
      :show="showNewIdModal"
      title="Create New ID"
      message="A new ID will be generated for you."
      confirmText="Generate"
      cancelText="Cancel"
      @confirm="createNewId"
      @close="closeModal"
    />

    <!-- Existing ID Modal -->
    <Modal
      v-if="showExistingIdModal"
      :show="showExistingIdModal"
      title="Enter Existing ID"
      message="Please put existing ID or Custom ID."
      confirmText="Confirm"
      cancelText="Cancel"
      inputVisible
      @confirm="enterExistingId"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import Modal from './Modal.vue';

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

const userId = ref(localStorage.getItem('userId') || null);
const setUserId = inject('setUserId');
const exitUserId = inject('exitUserId');
const setModalActive = inject('setModalActive');

const showNewIdModal = ref(false);
const showExistingIdModal = ref(false);

const openNewIdModal = () => {
  showNewIdModal.value = true;
  setModalActive(true); // blur
};

const openExistingIdModal = () => {
  showExistingIdModal.value = true;
  setModalActive(true); 
};

const closeModal = () => {
  showNewIdModal.value = false;
  showExistingIdModal.value = false;
  setModalActive(false); // 
};

const createNewId = () => {
  const newId = generateUniqueId();
  userId.value = newId;
  setUserId(newId);
  closeModal();
};

const enterExistingId = (existingId) => {
  if (existingId) {
    userId.value = existingId;
    setUserId(existingId);
    closeModal();
  } 
};

const exitId = () => {
  exitUserId();
  userId.value = null;
};
</script>

<style scoped>
.id-prompt-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  margin: 20px auto;
}

.user-id-display {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  font-weight: normal;
}

.buttons-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.id-button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  flex: 1;
  margin: 0 5px;
  text-align: center;
}

.ids-button {
  background-color: #53c349;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  flex: 1;
  margin: 0 5px;
  text-align: center;
}

.ids-button:hover {
  background-color: #129306;
}

.ids-button:active {
  background-color: #129306;
}

.id-button:hover {
  background-color: #2980b9;
}

.id-button:active {
  background-color: #1c6ea4;
}

.id-button.exit {
  background-color: #e74c3c;
}

.id-button.exit:hover {
  background-color: #c0392b;
}
</style>
