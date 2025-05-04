// src/stores/farmers.js
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const farmers = ref([])

export async function fetchFarmers() {
  const { data, error } = await supabase
    .from('farmers')
    .select('*')
  if (error) {
    console.error('Error fetching farmers:', error)
  } else {
    farmers.value = data
  }
}

export async function addFarmerToSupabase(farmer) {
  const { data, error } = await supabase
    .from('farmers')
    .insert([farmer])
    .select()
    .single()
  if (error) {
    console.error('Error adding farmer:', error)
    return null
  }
  return data
}
