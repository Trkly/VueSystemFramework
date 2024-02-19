import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 初始化样式表
import '@/style/index.scss'
// 导入svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'

const app = createApp(App)
installIcons(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store).use(router).use(ElementPlus).mount('#app')
