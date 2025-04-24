<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}

const barangays = ref([
  { name: 'AWA', showFarmers: false },
  { name: 'AZPETIA', showFarmers: false },
  { name: 'PATIN-AY', showFarmers: false },
  { name: 'LUCENA', showFarmers: false },
  { name: 'MAUG', showFarmers: false },
  { name: 'POBLACION', showFarmers: false },
  { name: 'STA. IRENE', showFarmers: false },
])

function toggleFarmers(index) {
  barangays.value[index].showFarmers = !barangays.value[index].showFarmers
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

      <!-- Navigation -->
      <v-app-bar :elevation="2" flat color="white">
        <v-toolbar-items class="d-flex justify-center w-100">
          <v-btn text class="nav-btn" @click="goTo('/home')">Home</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/barangay')">Barangay</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/supplies')">Supplies</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/transactions')">Transactions</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container class="pt-10">
          <v-row>
            <v-col
              v-for="(barangay, index) in barangays"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="pa-4" outlined @click="toggleFarmers(index)" style="cursor: pointer">
                <v-card-title class="text-h6 font-weight-bold">
                  {{ barangay.name }}
                </v-card-title>
                <v-card-text v-if="barangay.showFarmers">
                  <ul>
                    <li>Christian</li>
                    <li>Christian</li>
                    <li>Christian</li>
                  </ul>
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
