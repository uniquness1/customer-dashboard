<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center mb-6">
      <router-link to="/" class="text-indigo-600 hover:text-indigo-800 mr-4">
        ← Back to List
      </router-link>
      <h1 class="text-2xl font-bold text-gray-900">Add New Customer</h1>
    </div>

    <CustomerForm />
  </div>
</template>

<script setup>
import CustomerForm from '../components/CustomerForm.vue'
</script>
