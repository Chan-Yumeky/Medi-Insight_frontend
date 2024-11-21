import './assets/main.css'
import Editor from './components/Editor.vue'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(Editor)
app.mount('#app')

