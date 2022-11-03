import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(Bootstrap).use(VueSweetalert2).mount('#app');