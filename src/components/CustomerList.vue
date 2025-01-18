<template>
  <div class="flex flex-col mt-4 lg:mt-8">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <table class="min-w-full lg:divide-gray-200 lg:divide-y border">
          <thead class="table-header-group">
            <tr>
              <th
                v-for="header in headers"
                :key="header"
                class="py-3.5 px-4 text-left text-xs font-medium text-gray-800 uppercase tracking-widest whitespace-nowrap bg-[#f8f8f8] border-b"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in filteredCustomers" :key="customer.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ customer.firstName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ customer.lastName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ customer.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ customer.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ customer.state }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="
                    customer.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  "
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-md"
                >
                  {{ customer.status ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <p
                  @click="deleteCustomer(customer.id)"
                  class="text-red-600 hover:text-red-900 cursor-pointer"
                >
                  Delete
                </p>
              </td>
            </tr>
            <tr v-if="!filteredCustomers.length">
              <td colspan="7" class="px-6 py-4 text-center">
                <p class="text-lg font-normal">You don't have any customer yet</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '../stores/customerStore'

const router = useRouter()
const customerStore = useCustomerStore()
const headers = ['First Name', 'Last Name', 'Email', 'Phone Number', 'State', 'Status', 'Action']
const filteredCustomers = computed(() => customerStore.filteredCustomers)

const deleteCustomer = (id) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    customerStore.deleteCustomer(id)
  }
}
</script>
