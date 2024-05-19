import { createPinia } from 'pinia';

// Inisialisasi Pinia
const pinia = createPinia();

// Pasang Pinia ke instance Vue
import { createApp } from 'vue';
const app = createApp({});
app.use(pinia);

// Ekspos pinia agar bisa digunakan dalam pengujian
export { pinia };