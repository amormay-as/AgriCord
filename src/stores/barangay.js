// src/stores/barangay.js
import { ref } from 'vue'
import { supabase } from '@/supabase'

export const farmers = ref([])

/**
 * Fetch all farmers from Supabase
 */
export async function fetchFarmers() {
  const { data, error } = await supabase
    .from('farmers')
    .select('*')

  if (error) {
    console.error('Error fetching farmers:', error.message)
    return
  }

  farmers.value = data || []
}

/**
 * Add a new farmer to Supabase
 * @param {Object} farmer - The farmer object to add
 * @returns {Object|null} The inserted farmer record or null on error
 */
export async function addFarmer(farmer) {
  const { data, error } = await supabase
    .from('farmers')
    .insert([farmer])
    .select()
    .single()

  if (error) {
    console.error('Error adding farmer:', error.message)
    return null
  }

  return data
}
