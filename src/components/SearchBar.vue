<template>
  <div class="w-full">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search by name, email, phone, state..."
      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCustomerStore } from '../stores/customerStore'

const customerStore = useCustomerStore()
const searchQuery = ref('')

const handleSearch = () => {
  customerStore.setSearchQuery(searchQuery.value)
}
</script>
