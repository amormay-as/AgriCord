<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded" max-height="1000">
    <v-app :theme="theme">
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
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="Record Monitoring">
                <template v-slot:title>
                  <span class="font-weight-black">Welcome to AgriCord</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Email"></v-text-field>

                    <v-text-field label="Password" type="password"></v-text-field>

                    <v-btn class="mt-2" type="login" block>Login</v-btn>
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
