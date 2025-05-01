<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true
  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
      },
    },
  })

  if (error) {
    // console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    // console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account'
    router.replace('/home')
  }
  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <v-app>
    <v-container fluid class="gradient-bg" fill-height>
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" md="9" lg="7" xl="5">
          <v-card class="rounded-card" elevation="2">
            <v-row>
              <!-- Left Side: Form -->
              <v-col cols="12" md="6" class="d-flex align-center pl-6">
                <v-card-text>
                  <h2 class="text-center mb-4">Create an account</h2>

                  <v-alert
                    v-if="formAction.formSuccessMessage"
                    :text="formAction.formSuccessMessage"
                    title="Success!"
                    type="success"
                    class="pb-3"
                    variant="tonal"
                    density="compact"
                    border="start"
                    closable
                  ></v-alert>

                  <v-alert
                    v-if="formAction.formErrorMessage"
                    :text="formAction.formErrorMessage"
                    title="Ooops!"
                    type="error"
                    class="pb-3"
                    variant="tonal"
                    density="compact"
                    border="start"
                    closable
                  ></v-alert>

                  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                    <!-- Name Input -->
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-text-field
                          label="First Name"
                          outlined
                          dense
                          class="mb-2"
                          v-model="formData.firstname"
                          :rules="[requiredValidator]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          label="Last Name"
                          outlined
                          dense
                          class="mb-2"
                          v-model="formData.lastname"
                          :rules="[requiredValidator]"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Email Input -->
                    <v-text-field
                      label="Email"
                      outlined
                      dense
                      class="mb-2"
                      v-model="formData.email"
                      type="email"
                      :rules="[requiredValidator, emailValidator]"
                    ></v-text-field>

                    <!-- Password Input -->
                    <v-text-field
                      label="Password"
                      outlined
                      dense
                      class="mb-2"
                      v-model="formData.password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                      :rules="[requiredValidator, passwordValidator]"
                    ></v-text-field>

                    <!-- Repeat Password Input -->
                    <v-text-field
                      label="Confirm password"
                      outlined
                      dense
                      class="mb-2"
                      v-model="formData.password_confirmation"
                      :type="isPasswordConfirmVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
                      :rules="[
                        requiredValidator,
                        confirmedValidator(formData.password_confirmation, formData.password),
                      ]"
                    ></v-text-field>

                    <!-- Terms of Service Checkbox -->

                    <!-- Register Button -->
                    <v-btn
                      color="success"
                      large
                      block
                      type="submit"
                      prepend-icon="mdi-account"
                      :disabled="formAction.formProcess"
                      :loading="formAction.formProcess"
                    >
                      Register
                    </v-btn>
                  </v-form>

                  <!-- Login Link -->
                  <div class="text-center mt-4">
                    <p class="text-muted">Already have an account?</p>
                    <RouterLink to="/" class="font-weight-bold"> Login here </RouterLink>
                  </div>
                </v-card-text>
              </v-col>

              <!-- Right Side: Image -->
              <v-col cols="12" md="5" class="d-flex align-center">
                <v-img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  alt="Sample image"
                  contain
                  class="img-fluid"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.gradient-bg {
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rounded-card {
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.v-btn {
  background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
  color: white;
}

.text-muted {
  color: #6c757d;
}

.font-weight-bold {
  font-weight: bold;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
