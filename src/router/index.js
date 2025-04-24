import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import HomeView from '@/views/system/HomeView.vue'
import SuppliesView from '@/views/system/SuppliesView.vue'
import BarangayView from '@/views/system/BarangayView.vue'
import TransactionView from '@/views/system/TransactionView.vue'

// Import the profile page for Antonio
import AntonioDelaCrad from '@/views/system/profiles/AntonioDelaCrad.vue'
import EtenaMoreno from '@/views/system/profiles/EtenaMoreno.vue'


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
      path: '/barangay',
      name: 'barangay',
      component: BarangayView,
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView,
    },
    // Add route for Antonio's profile
    {
      path: '/profile/antonio-dela-crad',
      name: 'antonio-profile',
      component: AntonioDelaCrad,
    },
    {
      path: '/profile/etena-moreno',
      name: 'etena-profile',
      component: EtenaMoreno,
    }

  ],
})

export default router
