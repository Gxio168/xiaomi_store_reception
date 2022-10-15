import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Shop/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/login',
    component: () => import('@/views/LoginAndRegister.vue'),
    meta: { isShow: false }
  },
  {
    path: '/goods',
    component: () => import('@/views/Goods.vue'),
    meta: { isShow: true }
  },
  {
    path: '/goodsDetail',
    component: () => import('@/views/GoodsDetail.vue'),
    meta: { isShow: true }
  },
  {
    path: '/shoppingCart',
    component: () => import('@/views/ShoppingCart.vue'),
    meta: { isShow: true }
  },
  {
    path: '/confirmOrder',
    component: () => import('@/views/ConfirmOrder.vue'),
    meta: { isShow: true }
  },
  {
    path: '/order',
    component: () => import('@/views/Order/index.vue'),
    meta: { isShow: true }
  },
  {
    path: '/collect',
    component: () => import('@/views/Collect.vue'),
    meta: { isShow: true }
  },
  {
    path: '/:pathMatch(.*)*', 
    component: () => import('@/views/404.vue'),
    meta: { isShow: false }
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savePosition) => {
    return { top: 0 }
  },
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useAuthStore()
  const { token, userInfo } = storeToRefs(userStore)
  if (token.value) {
    if (to.path.match(/^\/login/)) {
      next('/')
    } else if ((userInfo as any).username) {
      next()
    } else { // 首次进入页面默认会执行一次， 因为不会去 /login 界面，就算去了，也会强制返回主页面然后再走这里
      try {
        await userStore.getUserInfo()
        next()
      } catch (error) {
        // token过期的情况
        userStore.logout()
        next('/login')
      }
    }
  } else {
    let toPath = to.path;
    const filterRoutes = routes.filter(route => (route.path !== '/') && (route.path !== '/login') && (route.path !== '/goods') && (route.path !== '/goodsDetail'))
    filterRoutes.forEach(route => {
      if (toPath.indexOf(route.path) !== -1) {
        next('login?redirect=' + toPath)
      }
    })
    next()
  }
})

export default router
