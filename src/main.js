import { createApp } from 'vue';
import Toast from 'vue-toastification'; // Import the Toast plugin
import 'vue-toastification/dist/index.css'; // Import Toast CSS

import './assets/style.css';
import App from './App.vue';


const app = createApp(App);
app.use(Toast);
app.mount('#app');
