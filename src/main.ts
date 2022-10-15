import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/init.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyload from 'vue-lazyload'
import lazy from '../public/images/lazy.png'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueLazyload,{
  loading: lazy,
})

app.mount('#app')
