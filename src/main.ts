import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import useIcon from './utils/setGlobal'

import './styles/index.scss'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(useIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
