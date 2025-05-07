import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next';
import App from './App.vue';
import router from './router';
import { markRaw } from 'vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const pinia = createPinia()
const app = createApp(App)

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app
    .use(pinia)
    .use(router)
    .use(createBootstrap())
    .mount('#app');
