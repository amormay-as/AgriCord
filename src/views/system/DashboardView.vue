<script setup>
import {} from 'vue'
</script>
<template>
  <div>
    <v-layout class="overflow-visible" style="height: auto">
      <div>
        <!-- Header Image -->
        <v-img src="@/assets/img/plant.png" height="120" cover class="mb-2"></v-img>

        <!-- Navigation Bar -->
        <v-app-bar :elevation="2">
          <v-toolbar-items>
            <v-btn text>Home</v-btn>
            <v-btn text>Barangay</v-btn>
            <v-btn text>Supplies</v-btn>
            <v-btn text>Transactions</v-btn>
          </v-toolbar-items>
        </v-app-bar>
      </div>
    </v-layout>
  </div>
</template>
