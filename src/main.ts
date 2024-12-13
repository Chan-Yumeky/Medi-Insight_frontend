import './assets/main.css'
import EditorComp from './components/Outpatient/EditorComp.vue'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import axios from "axios";
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
axios.defaults.baseURL = "http://localhost:8080";
const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(EditorComp)
app.mount('#app')
