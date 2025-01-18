<template>
  <div>
    <div class="py-12 bg-white sm:py-16 lg:py-20">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-center sm:justify-between">
          <div class="lg:w-[40%]">
            <p class="text-2xl font-bold text-slate-900">Customers</p>
            <p class="mt-1 text-base font-medium text-slate-500">
              Manage All customers accounts and details here
            </p>
          </div>
          <div
            class="flex flex-col md:flex-row sm:items-center justify-start mt-4 sm:justify-end sm:mt-0 sm:space-x-4 lg:w-[60%]"
          >
            <SearchBar class="w-full" />
            <button
              @click="openModal"
              type="button"
              class="md:w-[40%] items-center px-2 py-3 text-sm font-medium leading-4 text-white bg-indigo-600 border border-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-[10px] lg:mt-0"
            >
              Add New Customer
            </button>
          </div>
        </div>
        <CustomerList />
        <CustomerForm :isOpen="isModalOpen" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue'
import CustomerList from '../components/CustomerList.vue'
import CustomerForm from '../components/CustomerForm.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>
