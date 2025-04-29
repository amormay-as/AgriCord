import { ref } from 'vue'
import { supabase } from '@/supabase'

export const supplies = ref([])

export async function fetchSupplies() {
  const { data, error } = await supabase.from('supplies').select('*')
  if (error) {
    console.error('Error fetching supplies:', error)
  } else {
    supplies.value = data
  }
}

export async function addSupply(supply) {
  const { name, quantity, category } = supply
  const { data, error } = await supabase.from('supplies').insert([{ name, quantity, category }])

  if (error) {
    console.error('Error adding supply:', error)
  } else {
    console.log('Supply added:', data)
  }
}

export async function updateSupply(id, updates) {
  const { error } = await supabase.from('supplies').update(updates).eq('id', id)
  if (error) console.error('Error updating supply:', error)
}

export async function deleteSupply(id) {
  const { error } = await supabase.from('supplies').delete().eq('id', id)
  if (error) console.error('Error deleting supply:', error)
}
