import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import HomeView from '@/views/system/HomeView.vue'
import SuppliesView from '@/views/system/SuppliesView.vue'
import TransactionView from '@/views/system/TransactionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/supplies',
      name: 'supplies',
      component: SuppliesView,
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView,
    },
  ],
})

export default router
