import './assets/main.css'
import EditorComp from './components/EditorComp.vue'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import axios from "axios";
import 'element-plus/theme-chalk/dark/css-vars.css'

axios.defaults.baseURL = "http://localhost:8090";
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(EditorComp)
app.mount('#app')
