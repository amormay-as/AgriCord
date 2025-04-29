// src/stores/transaction.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),

  actions: {
    async fetchTransactions() {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
      if (error) throw error
      this.transactions = data
    },

    async addTransaction(transaction) {
      const { data, error } = await supabase.from('transactions').insert([transaction]).select()
      if (error) throw error
      this.transactions.unshift(...data)
    },
  },
})
