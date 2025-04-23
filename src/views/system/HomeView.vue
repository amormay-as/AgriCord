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
          <v-btn text class="nav-btn">Barangay</v-btn>
          <v-btn text class="nav-btn"><RouterLink to="/supplies">Supplies</RouterLink></v-btn>
          <v-btn text class="nav-btn"
            ><RouterLink to="/transaction">Transactions</RouterLink></v-btn
          >
        </v-toolbar-items>
      </v-app-bar>

      <!-- Home Section -->
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
            <div class="text-h5 font-weight-bold mb-2">Dashboard</div>
            <span>Welcome to AgriCord! 👋</span><br /><br />
            <p>
              Track and manage your farm supplies, monitor usage, and keep your records organized
              all in one place.
            </p>
            <br />
            <ul>
              📦 Available Supplies: 10 types
              <br />
              🗓️ Last Log Entry: April 22, 2025
            </ul>
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
