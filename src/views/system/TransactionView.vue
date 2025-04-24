<script setup>
import { ref } from 'vue'

const editDialog = ref(false)
const editedIndex = ref(null)
const editedQuantity = ref('')

const transactions = ref([
  { farmer: 'Antonio Dela Crad', supply: 'Urea Fertilizer', date: '2024-04-22', quantity: 20 },
  { farmer: 'Maria Santos', supply: 'Hybrid Rice Seeds', date: '2024-04-22', quantity: 20 },
  { farmer: 'John Reyes', supply: 'Corn Seeds', date: '2024-04-20', quantity: 50 },
  { farmer: 'Etena Moreno', supply: 'Corn Seeds', date: '2024-04-18', quantity: 60 },
  { farmer: 'Jose Tan', supply: 'Urea Fertilizer', date: '2024-04-18', quantity: 10 },
])

const supplies = ref([
  { name: 'Urea Fertilizer', quantity: '100 bags', category: 'Fertilizer' },
  { name: 'Hybrid Rice Seeds', quantity: '200 bags', category: 'Fertilizer' },
  { name: 'Ammonium Sulfate', quantity: '150 bags', category: 'Seed' },
  { name: 'Corn Seeds', quantity: '300 bags', category: 'Seed' },
  { name: 'Complete Fertilizer', quantity: '120 bags', category: 'Pesticide' },
  { name: 'Insecticide', quantity: '80 liters', category: 'Pesticide' },
])

function applyTransactions() {
  for (const tx of transactions.value) {
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

applyTransactions()

const newSupply = ref({
  name: '',
  quantity: '',
  category: '',
})

const newTransaction = ref({
  farmer: '',
  supply: '',
  date: '',
  quantity: null,
})

function addTransaction() {
  if (
    newTransaction.value.farmer &&
    newTransaction.value.supply &&
    newTransaction.value.date &&
    newTransaction.value.quantity
  ) {
    transactions.value.push({ ...newTransaction.value })
    applyTransactions()
    newTransaction.value = {
      farmer: '',
      supply: '',
      date: '',
      quantity: null,
    }
  }
}

function addSupply() {
  if (newSupply.value.name && newSupply.value.quantity && newSupply.value.category) {
    supplies.value.push({ ...newSupply.value })
    newSupply.value = { name: '', quantity: '', category: '' }
  }
}

function deleteSupply(index) {
  supplies.value.splice(index, 1)
}

function openEditDialog(index) {
  editedIndex.value = index
  editedQuantity.value = supplies.value[index].quantity
  editDialog.value = true
}

function saveQuantity() {
  if (editedIndex.value !== null) {
    supplies.value[editedIndex.value].quantity = editedQuantity.value
    editDialog.value = false
    editedIndex.value = null
  }
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
          <v-btn text class="nav-btn"><RouterLink to="/home">Home</RouterLink></v-btn>
          <v-btn text class="nav-btn">Barangay</v-btn>
          <v-btn text class="nav-btn"><RouterLink to="/supplies">Supplies</RouterLink></v-btn>
          <v-btn text class="nav-btn">Transactions</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Transaction Section -->
      <v-main>
        <v-container class="pt-10">
          <v-card class="mt-6 pa-6" elevation="1">
            <div class="text-h5 font-weight-bold mb-4">Add Transaction</div>
            <v-form @submit.prevent="addTransaction">
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
                    label="Date (YYYY-MM-DD)"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model.number="newTransaction.quantity"
                    label="Quantity"
                    dense
                    outlined
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="d-flex justify-end">
                  <v-btn type="submit" color="green">Add Transaction</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>

          <v-card class="mt-8 pa-6" elevation="1">
            <div class="text-h5 font-weight-bold mb-4">Transactions</div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Farmer</th>
                  <th class="text-left">Supply</th>
                  <th class="text-left">Date</th>
                  <th class="text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tx, index) in transactions" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ tx.farmer }}</td>
                  <td>{{ tx.supply }}</td>
                  <td>{{ tx.date }}</td>
                  <td>{{ tx.quantity }} bags</td>
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
.stat-card {
  background-color: #f2f9f2;
  border-radius: 12px;
}
.v-main {
  padding-top: 140px;
  background-color: beige;
}
</style>
