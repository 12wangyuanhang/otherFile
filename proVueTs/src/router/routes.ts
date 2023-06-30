import type { RouteRecordRaw } from 'vue-router';

const routes:Array<RouteRecordRaw> = [
    { 
        path: '/',
        redirect:'/home/chatGPT',
    }, {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        children: [
            {
                path: 'news',
                name: 'News',
                component: () => import('@/views/news/index.vue'),
                children: [],
            },{
                path: 'chatGPT',
                name: 'ChatGPT',
                component: () => import('@/views/chatGPT/index.vue'),
                children: [],
            }
        ],
    }
]

export default routes