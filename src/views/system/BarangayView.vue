<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const barangays = ref([
  {
    name: 'AWA',
    showFarmers: false,
    farmers: [
      { id: 'antonio-dela-crad', name: 'Antonio Dela Crad', },
    ],
    newFarmer: { name: '', specialty: '', experience: '', contact: '' }
  },
  {
    name: 'AZPETIA',
    showFarmers: false,
    farmers: [
      { id: 'maria', name: 'Maria Santos', },
    ],
    newFarmer: { name: '', specialty: '', experience: '', contact: '' }
  },
  {
    name: 'PATIN-AY',
    showFarmers: false,
    farmers: [
      { id: 'john-reyes', name: 'John Reyes' },
    ],
    newFarmer: { name: '', specialty: '', experience: '', contact: '' }
  },
  {
    name: 'LUCENA',
    showFarmers: false,
    farmers: [
      { id: 'etena-moreno', name: 'Etena Moreno' },
    ],
    newFarmer: { name: '', specialty: '', experience: '', contact: '' }
  },
  {
    name: 'MAUG',
    showFarmers: false,
    farmers: [
      { id: 'jose-tan', name: 'Jose Tan' },
    ],
    newFarmer: { name: '', specialty: '', experience: '', contact: '' }
  },
])

function toggleFarmers(index) {
  barangays.value[index].showFarmers = !barangays.value[index].showFarmers
}

function goToFarmerProfile(id) {
  router.push(`/profile/${id}`)
}

function goTo(path) {
  router.push(path)
}

function addFarmer(index) {
  const farmer = barangays.value[index].newFarmer
  if (farmer.name && farmer.specialty && farmer.experience && farmer.contact) {
    const id = farmer.name.toLowerCase().replace(/\s+/g, '-')
    barangays.value[index].farmers.push({
      id,
      name: farmer.name,
      specialty: farmer.specialty,
      experience: farmer.experience,
      contact: farmer.contact,
    })
    barangays.value[index].newFarmer = { name: '', specialty: '', experience: '', contact: '' }
  }
}
</script>

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

                    <v-divider class="my-4"></v-divider>

                    <div class="font-weight-bold mb-2">Add Farmer</div>
                    <v-form @submit.prevent="addFarmer(index)">
                      <v-text-field v-model="barangay.newFarmer.barangay" label="Barangay" dense outlined required />
                      <v-text-field v-model="barangay.newFarmer.name" label="Name" dense outlined required />
                      <v-text-field v-model="barangay.newFarmer.specialty" label="Specialty" dense outlined required />
                      <v-text-field v-model="barangay.newFarmer.experience" label="Experience" dense outlined required />
                      <v-text-field v-model="barangay.newFarmer.contact" label="Contact" dense outlined required />
                      <v-btn color="green" type="submit" block class="mt-2">Add Farmer</v-btn>
                    </v-form>
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
