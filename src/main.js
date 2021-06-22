import { createApp } from 'vue'
import router from './router/router.js'
import App from './App.vue'
import 'vant/lib/index.css'
import './assets/css/vant-reset.css'
import 'lib-flexible'
import $api from './sever/api'
import $https from './sever/sever'

const app = createApp(App)
app.config.globalProperties.$api = $api
app.config.globalProperties.$https = $https
app.use(router)
app.mount('#app')
