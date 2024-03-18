import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      // 如果isBreadcrumb 为 false 的话, 标识不会把根路由数据放到面包屑导航
      isBreadcrumb: false
    },
    children: []
  }
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: 'NoPermission',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: '401页面',
      icon: 'ele-Warning',
      cache: true,
      hidden: false
    }
  },
  {
    path: '/:path(.*)*', // 404匹配其他路由地址
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '未找到此页面',
      cache: true,
      hidden: true
    }
  }
]

// 静态路由
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...dynamicRoutes]
})

export default router
