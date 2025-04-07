<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded" max-height="1000">
    <v-app :theme="theme" class="background-image">
      <v-app-bar class="px-3" color="green">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Dark mode"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>
      <v-main>
  <v-container class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="custom-card mx-auto px-4 py-5 text-center">
          <!-- Centered Title -->
          <h2 class="login-title">
            <span class="font-weight-black text-light-green">AgriCord</span>
          </h2>

          <!-- Small Image Below -->
          <img src="@/assets/img/plant.png" alt="Plant Icon" class="logo" />

          <!-- Login Form -->
          <v-card-text class="bg-surface-light pt-4">
            <v-form fast-fail @submit.prevent>
              <v-text-field label="Email" outlined dense></v-text-field>

              <v-text-field label="Password" type="password" outlined dense></v-text-field>

              <v-btn class="mt-2" type="submit" block>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-main>


      <v-footer color="green" border app>AgriCord - 2025</v-footer>
    </v-app>
  </v-responsive>
</template>

<style>
/* Full-page background fix */
.background-image {
  background: url("/src/assets/img/leaves.jpg") no-repeat center center !important;
  background-size: cover !important;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Light Green Color for AgriCord Text */
.text-light-green {
  color: #90EE90 !important; /* Light green */
}

/* Small Image Below the Title */
.logo {
  width: 50px; /* Small icon size */
  height: auto;
  display: block;
  margin: 10px auto;
}

/* Custom Card Border Styling */
.custom-card {
  border-left: 2px solid green;
  border-right: 2px solid green;
  border-bottom: 2px solid green;
  border-top: 4px solid green; /* Slightly thicker top border */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 4px 6px rgba(0, 128, 0, 0.2); /* Soft shadow */
  background: white !important; /* Keep card background white for contrast */
}
</style>
