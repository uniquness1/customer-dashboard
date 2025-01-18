import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [],
    searchQuery: '',
  }),

  getters: {
    filteredCustomers: (state) => {
      const query = state.searchQuery.toLowerCase()
      return state.customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(query) ||
          customer.lastName.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.includes(query) ||
          customer.state.toLowerCase().includes(query) ||
          customer.status.toString().includes(query),
      )
    },

    getCustomerById: (state) => (id) => {
      return state.customers.find((customer) => customer.id === id)
    },
  },

  actions: {
    addCustomer(customer) {
      this.customers.push({
        id: Date.now(),
        ...customer,
      })
    },

    updateCustomer(id, updatedCustomer) {
      const index = this.customers.findIndex((c) => c.id === id)
      if (index !== -1) {
        this.customers[index] = { ...this.customers[index], ...updatedCustomer }
      }
    },
    deleteCustomer(id) {
      this.customers = this.customers.filter((c) => c.id !== id)
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },
  },
})
