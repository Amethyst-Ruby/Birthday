import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Birthday',
        component: () => import('../views/Birthday.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router