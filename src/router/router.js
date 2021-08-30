import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const routes = [

    {path: '/', redirect: '/category/all'},
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
            guestOnly: true,
            layout: 'default-layout',
            keepAlive: true
        },
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/AboutProduct.vue'),
        meta: {
            guestOnly: true,
            keepAlive: false,
            layout: 'default-layout',
        },
    },
    {
        path: '/category/:category',
        name: 'product',
        component: () => import('../views/Home.vue'),
        meta: {
            guestOnly: true,
            keepAlive: true,
            layout: 'default-layout',
        },
    },

    {
        path: '/basket',
        name: 'basket',
        component: () => import('../views/basket.vue'),
        meta: {
            layout: 'default-layout',
            keepAlive: false,
            requireAuth: true
        },
    },
    {
        path: '/admin/product',
        name: 'adminProduct',
        component: () => import('../views/adminPanel/AdminProduct.vue'),
        meta: {
            layout: 'admin-layout',
            requireAuth: true,

            keepAlive: true,
            isAdmin: true
        },
    },
    {
        path: '/admin/category',
        name: 'adminCategory',
        component: () => import('../views/adminPanel/AdminCategory.vue'),
        meta: {
            layout: 'admin-layout',
            requireAuth: true,
            keepAlive: true,
            isAdmin: true
        },
    },
    {
        path: '/admin/orders',
        name: 'adminOrders',
        component: () => import('../views/adminPanel/AdminOrders.vue'),
        meta: {
            layout: 'admin-layout',
            requireAuth: true,
            keepAlive: true,
            isAdmin: true
        },
    },
    {
        path: '/pagenotfound',
        name: 'error',
        component: () => import('../views/PageNotFound.vue'),
        meta: {
            layout: 'error-layout',
            keepAlive: false,
        }
    },
    {path: '*', redirect: '/pagenotfound'}
]

export const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach(async (to, from, next) => {
    if (((to.meta?.requireAuth && !!store.getters.user) ||
        (!to.meta?.requireAuth && !!store.getters.user) ||
        (!to.meta?.requireAuth && !!store.getters.user === false)) &&
        ((to.meta?.isAdmin && !!store.getters.isAdmin) ||
            (!to.meta?.isAdmin && !!store.getters.isAdmin) ||
            (!to.meta?.isAdmin && !!store.getters.isAdmin === false))
    ) {
        if (store.getters.getCategory === null) {
            let currentLayout = to.meta?.layout
            to.meta.layout = 'error-layout'
            await store.dispatch('getCategory')
            to.meta.layout = currentLayout
            next()
        } else next()
    } else next({name: 'error'})
})

