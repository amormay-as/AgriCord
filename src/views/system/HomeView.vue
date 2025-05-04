<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase.js'

const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const goTo = (path) => {
  router.push(path)
}

const stats = ref([
  { label: 'Total Farmers', value: 0 },
  { label: 'Available Supplies', value: 0 },
  { label: 'Monthly Transactions', value: 0 },
])

// ✅ Moved outside the other function
const fetchTotalFarmers = async () => {
  const { count, error } = await supabase
    .from('farmers')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching farmers:', error)
    return
  }

  stats.value[0].value = count
}

const fetchAvailableSupplies = async () => {
  const { data: supplies, error: suppliesError } = await supabase
    .from('farm_supplies')
    .select('quantity')

  if (suppliesError) {
    console.error('Error fetching supplies:', suppliesError)
    return
  }

  const totalSupplies = supplies.reduce((sum, s) => sum + (s.quantity || 0), 0)

  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('quantity')

  if (transactionsError) {
    console.error('Error fetching transactions:', transactionsError)
    return
  }

  const totalUsed = transactions.reduce((sum, t) => sum + (t.quantity || 0), 0)

  stats.value[1].value = totalSupplies - totalUsed
}

const fetchMonthlyTransactions = async () => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const { count, error } = await supabase
    .from('transactions')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', firstDay)
    .lte('created_at', lastDay)

  if (error) {
    console.error('Error fetching transactions:', error)
    return
  }

  stats.value[2].value = count
}

onMounted(() => {
  fetchTotalFarmers()
  fetchAvailableSupplies()
  fetchMonthlyTransactions()
})
</script>

<template>
  <v-responsive class="border rounded" max-height="1000">
    <v-app class="background-image">
      <!-- Header -->
      <v-app-bar class="px-3 gradient-app-bar" flat height="80">
        <v-row class="d-flex align-center justify-start" no-gutters>
          <v-col class="pa-0" cols="auto">
            <img src="@/assets/img/plant.png" alt="AgriCord Logo" class="logo" />
          </v-col>
          <v-col class="pa-0">
            <v-toolbar-title>
              <span class="font-weight-bold text-white title-text">AgriCord</span>
            </v-toolbar-title>
          </v-col>
        </v-row>
      </v-app-bar>

      <!-- Navigation Bar -->
      <v-app-bar :elevation="2" flat color="white">
        <v-toolbar-items class="d-flex justify-center w-100">
          <v-btn text class="nav-btn" @click="goTo('/home')">Home</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/barangay')">Barangay</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/supplies')">Supplies</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/transaction')">Transactions</v-btn>
          <v-btn text class="nav-btn" @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Home Section -->
      <v-main>
        <v-container class="pt-2">
          <br />
          <div class="text-h5 font-weight-bold mb-2 dashboard-title">Dashboard</div>

          <v-row justify="center" align="center" dense>
            <!-- welcome  -->
            <v-col cols="12">
              <v-card class="mt-3 pa-6 head" elevation="1">
                <h2 class="font-weight-bol">Welcome to AgriCord!</h2>
                <br />
                <p>
                  Track and manage your farm supplies, monitor usage, and keep your records
                  organized all in one place.
                </p>
              </v-card>
            </v-col>
          </v-row>
          <!-- overview -->
          <v-row justify="center" align="center" dense>
            <v-col
              v-for="(item, i) in stats"
              :key="i"
              cols="12"
              sm="6"
              md="4"
              class="text-center mt-2"
            >
              <!-- Card for Total Farmers -->
              <v-card v-if="i === 0" class="pa-5 stat-card farmers-card" elevation="2">
                <div class="d-flex flex-column align-center">
                  <div class="d-flex align-center justify-center">
                    <div class="text-h4 font-weight-bold mr-2 value">{{ item.value }}</div>
                    <img src="@/assets/img/farmers.png" alt="Farmer Icon" style="height: 40px" />
                  </div>
                  <div class="text-subtitle-2 mt-2">{{ item.label }}</div>
                </div>
              </v-card>

              <v-card v-else-if="i === 1" class="pa-5 stat-card supplies-card" elevation="2">
                <div class="d-flex flex-column align-center">
                  <div class="d-flex align-center justify-center">
                    <div class="text-h4 font-weight-bold mr-2 value">{{ item.value }}</div>
                    <img src="@/assets/img/supplies.png" alt="Supplies Icon" style="height: 40px" />
                  </div>
                  <div class="text-subtitle-2 mt-2">{{ item.label }}</div>
                </div>
              </v-card>

              <v-card v-else class="pa-5 stat-card transactions-card" elevation="2">
                <div class="d-flex flex-column align-center">
                  <div class="d-flex align-center justify-center">
                    <div class="text-h4 font-weight-bold mr-2 value">{{ item.value }}</div>
                    <img
                      src="@/assets/img/transac.png"
                      alt="Transaction Icon"
                      style="height: 40px"
                    />
                  </div>
                  <div class="text-subtitle-2 mt-2">{{ item.label }}</div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-container class="footer text-center p-2 text-white" fluid>
        <v-row no-gutters>
          <v-col cols="12">
            <div class="text-caption">© 2025 AgriCord. All rights reserved.</div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Bottom Section (custom footer-style section) -->
    </v-app>
  </v-responsive>
</template>

<style scoped>
.dashboard-title,
.value {
  color: #2e7d32;
}
.footer {
  background-color: #6e9a71;
  width: 100%;
}
.gradient-app-bar {
  background: linear-gradient(to right, #6e9a71, #0b6d10);
  color: white;
}

.text-white {
  color: white !important;
}

.title-text {
  font-size: 28px;
}

.nav-btn {
  font-size: 12px;
  color: black !important;
  margin: 0 10px;
}

.logo {
  width: 50px;
  height: auto;
  display: block;
  margin: 10px auto;
}

.stat-card {
  background-color: #f2f9f2;
  border-radius: 12px;
}

.stat-card:hover {
  transform: translateY(-3px);
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #d1f0d1, #e8f5e9); /* soft green gradient */
}

.v-card {
  background-color: #ffffff;
  border-radius: 12px;
}

.v-main {
  padding-top: 140px;
  background-color: beige;
}
</style>
