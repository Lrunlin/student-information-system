import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';
import admin from './admin';
const routes = [{
  path: '/',
  component: () => import('../Layout/Home.vue'),
  children: [{
      path: '',
      component: () => import('@/page/Index.vue'),
    },
    ...admin
  ]
}, {
  path: '/sign',
  component: () => import('@/page/Sign.vue')
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router