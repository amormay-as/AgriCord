<script setup>
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { ref } from 'vue'

const isPasswordVisible = ref(false)

const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const onSubmit = () => {
  alert(formData.value.email)
}
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
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
                <v-card-text class="pt-4">
                  <v-form ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      outlined
                      dense
                      :rules="[requiredValidator, emailValidator]"
                    ></v-text-field>
                    <v-text-field
                      v-model="formData.password"
                      label="Password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                      outlined
                      dense
                      :rules="[requiredValidator, passwordValidator]"
                    ></v-text-field>
                    <RouterLink to="/home">
                      <v-btn class="mt-2" type="submit" block>Login</v-btn>
                    </RouterLink>
                  </v-form>
                  <div class="text-center mt-4">
                    Don't have an account?
                    <RouterLink to="/register"><b>Sign Up</b></RouterLink>
                  </div>
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
