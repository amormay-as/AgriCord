<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase.js'
import { useTransactionStore } from '@/stores/transaction'

const router = useRouter()
const transactionStore = useTransactionStore()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const editDialog = ref(false)
const editedIndex = ref(null)
const editedQuantity = ref('')

const newTransaction = ref({
  farmer: '',
  supply: '',
  date: '',
  quantity: null,
})

const supplies = ref([
  { name: 'Urea Fertilizer', quantity: '100 bags', category: 'Fertilizer' },
  { name: 'Hybrid Rice Seeds', quantity: '200 bags', category: 'Fertilizer' },
  { name: 'Ammonium Sulfate', quantity: '150 bags', category: 'Seed' },
  { name: 'Corn Seeds', quantity: '300 bags', category: 'Seed' },
  { name: 'Complete Fertilizer', quantity: '120 bags', category: 'Pesticide' },
  { name: 'Insecticide', quantity: '80 liters', category: 'Pesticide' },
])

function applyTransactions() {
  for (const tx of transactionStore.transactions) {
    const supply = supplies.value.find((s) => s.name === tx.supply)
    if (supply) {
      const match = supply.quantity.match(/^(\d+)\s*(\w+)$/)
      if (match) {
        const [_, num, unit] = match
        const newQty = Math.max(0, parseInt(num) - tx.quantity)
        supply.quantity = `${newQty} ${unit}`
      }
    }
  }
}

async function addTransaction() {
  if (
    newTransaction.value.farmer &&
    newTransaction.value.supply &&
    newTransaction.value.date &&
    newTransaction.value.quantity
  ) {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        console.error('Authentication error:', authError)
        return
      }

      await transactionStore.addTransaction({
        farmer: newTransaction.value.farmer,
        supply: newTransaction.value.supply,
        date: newTransaction.value.date,
        quantity: Number(newTransaction.value.quantity),
        user_id: user.id,
      })

      applyTransactions()

      newTransaction.value = {
        farmer: '',
        supply: '',
        date: '',
        quantity: null,
      }
    } catch (err) {
      // 🔍 More informative logging
      console.error('Transaction not saved to Supabase:')
      if (err instanceof Error) {
        console.error(err.message)
      } else if (typeof err === 'object') {
        console.error(JSON.stringify(err, null, 2))
      } else {
        console.error(err)
      }
    }
  }
}

onMounted(async () => {
  await transactionStore.fetchTransactions()
  applyTransactions()
})

function goTo(path) {
  router.push(path)
}
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

      <!-- Transaction Section -->
      <v-main>
        <v-container class="pt-10">
          <v-card class="mt-8 pa-6" elevation="1">
            <div class="text-h5 font-weight-bold mb-4">Add Transaction</div>
            <v-form @submit.prevent="addTransaction" class="mb-6">
              <v-row dense>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="newTransaction.farmer"
                    label="Farmer Name"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="newTransaction.supply"
                    :items="supplies.map((s) => s.name)"
                    label="Supply"
                    dense
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="newTransaction.date"
                    type="date"
                    label="Date"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="newTransaction.quantity"
                    type="number"
                    label="Quantity"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="green" type="submit" class="mt-2">Add</v-btn>
            </v-form>

            <div class="text-h5 font-weight-bold mb-4">Transactions</div>
            <v-table>
              <thead>
                <tr>
                  <th>Farmer</th>
                  <th>Supply</th>
                  <th>Date</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tx, index) in transactionStore.transactions" :key="index">
                  <td>{{ tx.farmer }}</td>
                  <td>{{ tx.supply }}</td>
                  <td>{{ tx.date }}</td>
                  <td>{{ tx.quantity }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer color="green" border app class="justify-center text-caption">
        AgriCord - 2025
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
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
.v-main {
  padding-top: 140px;
  background-color: beige;
}
</style>
