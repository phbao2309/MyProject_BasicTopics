import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

createApp(App).use(Bootstrap).mount('#app');