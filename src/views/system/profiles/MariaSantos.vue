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
          <v-btn text class="nav-btn" @click="goTo('/transaction')">Transactions</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container class="pt-10">
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
              <v-card class="pa-4">
                <v-img :src="farmerImage" height="200px" contain></v-img>
                <v-card-title class="text-h5 font-weight-bold text-center">
                  Maria Santos
                </v-card-title>
                <v-card-subtitle class="text-center">Farmer</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="text-center">
                    <p><strong>Barangay:</strong> AZPETIA</p>
                    <p><strong>Experience:</strong> 3 years of farming</p>
                    <p><strong>Specialty:</strong> Vegetable farming</p>
                    <p><strong>Contact:</strong> 0918-xxxx-xxxx</p>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-btn color="green" class="mx-auto d-block" @click="goBack">
                  Back to Barangays
                </v-btn>
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
import { useRouter } from 'vue-router'
import farmerImage from '@/assets/img/farmer3.png'

const router = useRouter()

function goBack() {
  router.push('/barangay')
}

function goTo(path) {
  router.push(path)
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
