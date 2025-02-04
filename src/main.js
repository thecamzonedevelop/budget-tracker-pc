import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import naive from "naive-ui";
import './assets/css/index.css'

import api from "./api";

// Create a global property $api
const app = createApp(App);
app.config.globalProperties.$api = api;

createApp(App)
.use(store)
.use(router)
.use(naive)
.mount('#app')

