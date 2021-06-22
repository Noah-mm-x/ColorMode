import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../view/index/index.vue')
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router