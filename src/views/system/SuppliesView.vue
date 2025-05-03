<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase.js'
import {
  supplies,
  fetchSupplies,
  addSupply,
  updateSupply,
  deleteSupply as deleteSupplyFromDb,
} from '@/stores/supplies.js' // use the store now

const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

function goTo(path) {
  router.push(path)
}

const editDialog = ref(false)
const editedIndex = ref(null)
const editedQuantity = ref('')
const editedId = ref(null)

const newSupply = ref({
  name: '',
  quantity: '',
  category: '',
})

// Fetch supplies when the component is mounted
onMounted(() => {
  fetchSupplies()
})

async function addNewSupply() {
  if (newSupply.value.name && newSupply.value.quantity && newSupply.value.category) {
    await addSupply({
      name: newSupply.value.name,
      quantity: newSupply.value.quantity,
      category: newSupply.value.category,
    })
    newSupply.value = { name: '', quantity: '', category: '' }
  }
}

function openEditDialog(index) {
  editedIndex.value = index
  editedQuantity.value = supplies.value[index].quantity
  editedId.value = supplies.value[index].id // Store ID for update
  editDialog.value = true
}

async function saveQuantity() {
  if (editedId.value !== null) {
    await updateSupply(editedId.value, { quantity: editedQuantity.value })
    await fetchSupplies() // Refresh list after updating
    editDialog.value = false
    editedIndex.value = null
    editedId.value = null
  }
}

async function deleteSupply(index) {
  const id = supplies.value[index].id
  if (id) {
    await deleteSupplyFromDb(id)
  }
}
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
          <v-btn text class="nav-btn" @click="goTo('/home')">Home</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/barangay')">Barangay</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/supplies')">Supplies</v-btn>
          <v-btn text class="nav-btn" @click="goTo('/transaction')">Transactions</v-btn>
          <v-btn text class="nav-btn" @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <!-- Supplies Section -->
      <v-main>
        <v-container class="pt-10">
          <v-card class="mt-8 pa-6" elevation="1">
            <div class="text-h5 font-weight-bold mb-4">Add Supply</div>
            <v-form @submit.prevent="addNewSupply" class="mb-6">
              <v-row dense>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="newSupply.name"
                    label="Name"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="newSupply.quantity"
                    label="Quantity"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="newSupply.category"
                    :items="['Fertilizer', 'Seed', 'Pesticide']"
                    label="Category"
                    dense
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" class="d-flex align-center">
                  <v-btn color="green" type="submit">Add</v-btn>
                </v-col>
              </v-row>
            </v-form>

            <div class="text-h5 font-weight-bold mb-4">Supplies</div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Category</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in supplies" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.category }}</td>
                  <td>
                    <v-btn icon color="blue" @click="openEditDialog(index)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="deleteSupply(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>

          <!-- Edit Dialog -->
          <v-dialog v-model="editDialog" max-width="400">
            <v-card>
              <v-card-title>Edit Quantity</v-card-title>
              <v-card-text>
                <v-text-field v-model="editedQuantity" label="Quantity" required></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="editDialog = false">Cancel</v-btn>
                <v-btn color="green" @click="saveQuantity">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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

.v-main {
  padding-top: 140px;
  background-color: beige;
}
</style>
