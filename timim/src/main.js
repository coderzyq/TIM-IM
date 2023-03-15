/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-02-26 15:45:45
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-15 10:39:17
 * @FilePath: \LCMIM\TIM-IM\timim\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/icon/iconFont/iconfont.css' // 引入阿里云字体图标css

//引入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router).use(ElementPlus, { size: 'small' }).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}