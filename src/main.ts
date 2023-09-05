// import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import  store  from "@/stores";

import App from './App.vue'
import router from './router'

// 引入ui组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

// app.use(createPinia())
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(Antd)

app.mount('#app')
