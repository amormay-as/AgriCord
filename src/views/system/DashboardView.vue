<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (path) => {
  router.push(path)
}

const stats = [
  { label: 'Total Farmers', value: 1125 },
  { label: 'Total Supplies', value: 2000 },
  { label: 'Monthly Transactions', value: 100 },
]
</script>

<template>
  <v-responsive class="border rounded" max-height="1000">
    <v-app class="background-image">
      <!-- Thicker Header with AgriCord on the left and logo beside it -->
      <v-app-bar class="px-3 gradient-app-bar" flat height="80">
        <v-row class="d-flex align-center justify-start" no-gutters>
          <!-- Logo next to AgriCord -->
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

      <!-- Centered Navigation Bar below the header -->
      <v-app-bar :elevation="2" flat color="white">
        <v-toolbar-items class="d-flex justify-center w-100">
          <v-btn text class="nav-btn" @click="goTo('/home')">Home</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/barangay')">Barangay</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/supplies')">Supplies</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/transaction')">Transactions</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Dashboard Section -->
      <v-main>
        <v-container class="pt-10">
          <v-row justify="center" align="center" dense>
            <v-col v-for="(item, i) in stats" :key="i" cols="12" sm="6" md="3" class="text-center">
              <v-card class="pa-5 stat-card" elevation="2">
                <div class="text-h5 font-weight-bold">{{ item.value }}</div>
                <div class="text-subtitle-2">{{ item.label }}</div>
              </v-card>
            </v-col>
          </v-row>

          <v-card class="mt-8 pa-6" elevation="1">
            <div class="text-h5 font-weight-bold mb-2">Welcome to AgriCord!</div>
            <p>
              🌟 AgriCord Tip of the Day:<br />
              Always update your supply usage after fieldwork to keep your records accurate.
            </p>
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
/* Gradient Header */
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

/* Logo styling */
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

.stat-card {
  background-color: #f2f9f2;
  border-radius: 12px;
}
</style>
