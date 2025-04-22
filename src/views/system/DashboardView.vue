<script setup>
</script>

<template>
  <v-responsive class="border rounded" max-height="1000">
    <v-app class="background-image">
      <!-- Thicker Header with AgriCord on the left and logo beside it -->
      <v-app-bar class="px-3 gradient-app-bar" flat height="80">
        <v-row class="d-flex align-center justify-start" no-gutters>
          <!-- Logo next to AgriCord -->
          <v-col class="pa-0" cols="auto">
            <img
              src="@/assets/img/plant.png"
              alt="AgriCord Logo"
              class="logo"
            />
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
          <v-btn text class="nav-btn">Home</v-btn>
          <v-btn text class="nav-btn">Barangay</v-btn>
          <v-btn text class="nav-btn">Supplies</v-btn>
          <v-btn text class="nav-btn">Transactions</v-btn>
        </v-toolbar-items>
      </v-app-bar>

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
</style>
