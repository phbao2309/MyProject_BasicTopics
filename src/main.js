import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import './assets/main.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faCirclePause, 
    faCirclePlay, 
    faPlay, 
    faUserSecret 
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faPlay, faCirclePause, faCirclePlay)

createApp(App)
    .use(Bootstrap)
    .use(VueSweetalert2)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');