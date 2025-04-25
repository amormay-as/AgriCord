<script setup>
const stats = [
  { label: 'Total Farmers', value: 1125 },
  { label: 'Total Supplies', value: 2000 },
  { label: 'Monthly Transactions', value: 100 },
]
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
          <v-btn text class="nav-btn">Home</v-btn>
          <v-btn text class="nav-btn"><RouterLink to="/barangay">Barangay</RouterLink></v-btn>
          <v-btn text class="nav-btn"><RouterLink to="/supplies">Supplies</RouterLink></v-btn>
          <v-btn text class="nav-btn"
            ><RouterLink to="/transaction">Transactions</RouterLink></v-btn
          >
        </v-toolbar-items>
      </v-app-bar>

      <!-- Home Section -->
      <v-main>
        <v-container class="pt-2">
          <br />
          <div class="text-h4 font-weight-bold mb-2 dashboard-title">Dashboard</div>

          <v-row justify="center" align="center" dense>
            <!-- welcome  -->
            <v-col cols="12">
              <v-card class="mt-3 pa-6" elevation="1">
                <span class="font-weight-bold">Welcome to AgriCord!</span><br /><br />
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
                <div class="text-h5 font-weight-bold">{{ item.value }}</div>
                <div class="text-subtitle-2">{{ item.label }}</div>
              </v-card>

              <!-- Card for Total Supplies -->
              <v-card v-else-if="i === 1" class="pa-5 stat-card supplies-card" elevation="2">
                <div class="text-h5 font-weight-bold">{{ item.value }}</div>
                <div class="text-subtitle-2">{{ item.label }}</div>
              </v-card>

              <!-- Card for Monthly Transactions -->
              <v-card v-else class="pa-5 stat-card transactions-card" elevation="2">
                <div class="text-h5 font-weight-bold">{{ item.value }}</div>
                <div class="text-subtitle-2">{{ item.label }}</div>
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
.dashboard-title {
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

.v-card {
  background-color: #ffffff;
  border-radius: 12px;
}

.v-main {
  padding-top: 140px;
  background-color: beige;
}
</style>
