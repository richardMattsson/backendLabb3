import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const pinia = createPinia()
const app = createApp(App)

app
    .use(pinia)
    .use(router)
    .use(createBootstrap())
    .mount('#app');
