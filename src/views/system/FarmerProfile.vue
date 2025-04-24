<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Map route params to actual names
const farmerNames = {
  antonio: 'Antonio Dela Crad',
  maria: 'Maria Santos',
  john: 'John Reyes',
  etena: 'Etena Moreno',
  jose: 'Jose Tan',
}

const farmerId = route.params.id
const farmerName = farmerNames[farmerId]
</script>

<template>
  <v-container class="text-center pt-10">
    <v-card class="mx-auto pa-6" max-width="600">
      <h2 class="text-h5 font-weight-bold">Farmer Profile</h2>
      <p class="text-h6 mt-4">Name: {{ farmerName || 'Unknown Farmer' }}</p>
    </v-card>
  </v-container>
</template>
