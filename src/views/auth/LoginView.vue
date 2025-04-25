<script setup>
import {} from 'vue'
</script>

<template>
  <v-responsive class="border rounded" max-height="1000">
    <v-app :theme="theme" class="background-image">
      <v-main>
        <v-container class="d-flex justify-center align-center" style="min-height: 100vh">
          <v-row justify="center" align="center">
            <v-col cols="12" md="6" lg="4">
              <v-card class="custom-card mx-auto px-4 py-5 text-center">
                <!-- Centered Title -->
                <h2 class="login-title">
                  <span class="font-weight-black text-light-green">AgriCord</span>
                </h2>

                <!-- Small Image Below -->
                <img
                  src="@/assets/img/plant.png"
                  alt="Plant Icon"
                  class="logo"
                  style="width: 80px; height: 80px"
                />

                <!-- Login Form -->
                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Email" outlined dense></v-text-field>
                    <v-text-field label="Password" type="password" outlined dense></v-text-field>
                    <RouterLink to="/dashboard">
                      <v-btn text class="mt-2" @click="goTo('/')">Login</v-btn>
                    </RouterLink>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer border app class="justify-center text-caption bg-transparent text-white">
        AgriCord - 2025
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      theme: {
        // define your theme settings here
      },
    }
  },
}
</script>

<style scoped>
.custom-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.login-title {
  font-size: 1.5rem;
}

.bg-surface-light {
  background-color: #f9f9f9;
}

.background-image {
  background: url('@/assets/img/leaves.jpg') no-repeat center center !important;
  background-size: cover !important;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}
</style>
