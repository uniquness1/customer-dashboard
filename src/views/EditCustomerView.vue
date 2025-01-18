<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center mb-6">
      <router-link to="/" class="text-indigo-600 hover:text-indigo-800 mr-4">
        ← Back to List
      </router-link>
      <h1 class="text-2xl font-bold text-gray-900">Edit Customer</h1>
    </div>

    <CustomerForm :customer-id="customerId" :is-editing="true" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomerStore } from '../stores/customerStore'
import CustomerForm from '../components/CustomerForm.vue'

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()
const customerId = parseInt(route.params.id)

onMounted(() => {
  const customer = customerStore.getCustomerById(customerId)
  if (!customer) {
    router.push('/')
  }
})
</script>
