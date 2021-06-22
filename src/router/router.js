import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../view/index/index.vue')
  },
  {
    path: '/earn',
    name: 'Earn',
    component: () => import('../view/earn/earn.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router