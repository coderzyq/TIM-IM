/*
 * @Author: zhang-yong-qiang 1094093944@qq.com
 * @Date: 2023-02-26 15:45:45
 * @LastEditors: zhang-yong-qiang 1094093944@qq.com
 * @LastEditTime: 2023-03-01 14:33:01
 * @FilePath: \LCMIM\TIM-IM\timim\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        redirection: '/message',
        name: 'home',
        component: () =>
            import ("@/views/message/index"),
        // meta: {
        //     title: '',

        // }
    },
    {
        path: '/message',
        name: 'message',
        component: () =>
            import ('@/views/message/index'),
        meta: {
            title: '消息通知',

        }
    },
    {
        path: '/contracts',
        name: 'contracts',
        component: () =>
            import ('@/views/contacts')
    },
    {
        path: '/note',
        name: 'note',
        component: () =>
            import ('@/views/note')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () =>
            import ('@/views/settings')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router