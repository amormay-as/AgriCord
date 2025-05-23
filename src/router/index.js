import { supabase } from '@/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import HomeView from '@/views/system/HomeView.vue'
import SuppliesView from '@/views/system/SuppliesView.vue'
import BarangayView from '@/views/system/BarangayView.vue'
import TransactionView from '@/views/system/TransactionView.vue'

// Import the profile page for farmers
import AntonioDelaCrad from '@/views/system/profiles/AntonioDelaCrad.vue'
import EtenaMoreno from '@/views/system/profiles/EtenaMoreno.vue'
import JohnReyes from '@/views/system/profiles/JohnReyes.vue'
import JoseTan from '@/views/system/profiles/JoseTan.vue'
import MariaSantos from '@/views/system/profiles/MariaSantos.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
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
    },
    {
      path: '/profile/john-reyes',
      name: 'john-reyes-profile',
      component: JohnReyes,
    },
    {
      path: '/profile/jose-tan',
      name: 'jose-profile',
      component: JoseTan,
    },
    {
      path: '/profile/maria',
      name: 'maria-profile',
      component: MariaSantos,
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  const publicPages = ['login', 'register']
  const authRequired = !publicPages.includes(to.name)

  const { data } = await supabase.auth.getSession()
  const isLoggedIn = !!data.session

  if (authRequired && !isLoggedIn) {
    console.log('Redirecting to login')
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    console.log('Already logged in, redirecting to home')
    next({ name: 'home' })
  } else {
    next() // Allow navigation
  }
})

export default router
