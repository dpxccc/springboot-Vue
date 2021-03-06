import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../layout/Layout";

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: "/home",      //重定向，当只写/时，只有一个layout的整体框架，则自动跳转到home，children中的子路由，则是在框架中跳转
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("@/views/Home")
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/Register")
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
