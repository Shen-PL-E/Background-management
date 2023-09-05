import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/views/UserListView.vue'

// 导入进度条插件
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [{
        path: '/home/user',
        name: 'user',
        // component: () => import('@/views/UserListView.vue')
        component: UserList
      },{
        path: '/home/role',
        name: 'role',
        component: () => import('@/views/RoleView.vue')
      },{
        path: '/home/power',
        name: 'power',
        component: () => import('@/views/PowerView.vue')
      },{
        path: '/home/goods',
        name: 'goods',
        component: () => import('@/views/GoodsView.vue')
      },{
        path: '/home/cata',
        name: 'cata',
        component: () => import('@/views/CataView.vue')
      },
      {
        path: '/home/goodcata',
        name: 'goodcata',
        component: () => import('@/views/GoodCataView.vue')
      },
      {
        path: '/home/order',
        name: 'order',
        component: () => import('@/views/OrderView.vue')
      },
      {
        path: '/home/data',
        name: 'data',
        component: () => import('@/views/DataView.vue')
      },
      {
        path: '/home/shome',
        name: 'shome',
        component: () => import('@/views/SHomeView.vue')
      },
      {
        path: '/home/addgoods',
        name: 'addgoods',
        component: () => import('@/views/AddGoodsView.vue')
      },
    ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
  ]
})
// 前置守卫
router.beforeEach((to,from,next)=>{
  Nprogress.start()
  next()
})
// 后置守卫
router.afterEach((to,from)=>{
  Nprogress.done()

})


export default router
