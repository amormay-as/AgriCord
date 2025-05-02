<template>
  <v-responsive class="border rounded" max-height="3000">
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
        </v-toolbar-items>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container class="pt-10">
          <!-- Add Farmer Form -->
          <v-row align="center" justify="center" class="mb-8">
            <v-col cols="12" md="10">
              <v-sheet elevation="2" color="white" class="pa-4 rounded">
                <v-form @submit.prevent="addFarmerToBarangay" class="d-flex align-center flex-wrap" style="gap: 10px;">
                  <v-text-field v-model="newFarmer.name" label="Name" dense outlined required class="flex-grow-1" />
                  <v-text-field v-model="newFarmer.specialty" label="Specialty" dense outlined required class="flex-grow-1" />
                  <v-text-field v-model="newFarmer.experience" label="Experience" dense outlined required class="flex-grow-1" />
                  <v-text-field v-model="newFarmer.contact" label="Contact" dense outlined required class="flex-grow-1" />
                  <v-select 
                    v-model="newFarmer.barangay" 
                    :items="barangays.map(b => b.name).sort()" 
                    label="Barangay" 
                    dense outlined required 
                    class="flex-grow-1"
                  />
                  <v-btn color="green" type="submit" class="mt-2" small>Add</v-btn>
                </v-form>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Barangay Cards -->
          <v-row>
            <v-col v-for="(barangay, index) in barangays" :key="index" cols="12" sm="6" md="4">
              <v-card class="pa-8" outlined>
                <v-card-title class="text-h6 font-weight-bold text-center">
                  {{ barangay.name }}
                </v-card-title>

                <v-card-text>
                  <v-btn block @click="toggleFarmers(index)" color="primary" class="mb-4">
                    {{ barangay.showFarmers ? 'Hide Farmers' : 'Show Farmers' }}
                  </v-btn>

                  <div v-if="barangay.showFarmers">
                    <div v-for="farmer in barangay.farmers" :key="farmer.id" class="mb-3">
                      <v-btn text color="primary" @click.stop="goToFarmerProfile(farmer.id)">
                        {{ farmer.name }}
                      </v-btn>
                      <div class="text-caption mt-1">
                        {{ farmer.specialty }}<br>
                        {{ farmer.experience }}<br>
                        {{ farmer.contact }}
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer color="green" border app class="justify-center text-caption">
        AgriCord - 2025
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchFarmers, addFarmer, farmers } from '@/stores/barangay'

const router = useRouter()

const barangays = ref([
  { name: 'AWA', showFarmers: false, farmers: [] },
  { name: 'AZPETIA', showFarmers: false, farmers: [] },
  { name: 'PATIN-AY', showFarmers: false, farmers: [] },
  { name: 'LUCENA', showFarmers: false, farmers: [] },
  { name: 'MAUG', showFarmers: false, farmers: [] },
])

const newFarmer = ref({
  name: '',
  specialty: '',
  experience: '',
  contact: '',
  barangay: '',
})

onMounted(async () => {
  await fetchFarmers()
  for (const farmer of farmers.value) {
    const b = barangays.value.find(b => b.name === farmer.barangay)
    if (b && !b.farmers.some(f => f.id === farmer.id)) {
      b.farmers.push(farmer)
    }
  }
})

function toggleFarmers(index) {
  barangays.value[index].showFarmers = !barangays.value[index].showFarmers
}

function goToFarmerProfile(id) {
  router.push(`/profile/${id}`)
}

function goTo(path) {
  router.push(path)
}

async function addFarmerToBarangay() {
  const farmer = { ...newFarmer.value }

  if (farmer.name && farmer.specialty && farmer.experience && farmer.contact && farmer.barangay) {
    const inserted = await addFarmer(farmer)
    if (!inserted) {
      alert('Failed to add farmer. Please check your Supabase policy or network.')
      return
    }

    const barangayObj = barangays.value.find(b => b.name === farmer.barangay)
    if (barangayObj) {
      barangayObj.farmers.push(inserted)
    }

    newFarmer.value = {
      name: '',
      specialty: '',
      experience: '',
      contact: '',
      barangay: '',
    }
  }
}
</script>

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
