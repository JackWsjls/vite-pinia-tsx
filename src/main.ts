import { createApp } from 'vue'
import './assets/css/styleDefault.css'
import './assets/css/style.scss'
import App from './App.vue'
import { createPinia } from "pinia"

const app = createApp(App)
// 解决：Vue.js is detected on this page. 添加这行代码
app.config.globalProperties.devtools = true
app.use(createPinia()).mount('#app')
