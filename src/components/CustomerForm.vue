<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <form
      @submit.prevent="handleSubmit"
      class="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-auto h-screen md:max-h-[600px] overflow-y-scroll"
    >
      <div class="flex justify-between items-center pb-5">
        <h2 class="text-lg font-medium">Add New Customer</h2>
        <button @click="close" class="text-red-600 hover:text-red-700">X</button>
      </div>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="formData.firstName"
              type="text"
              class="mt-1 block w-full rounded-md border border-solid px-4 py-2 border-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="formData.lastName"
              type="text"
              class="mt-1 block w-full rounded-md border border-solid px-4 py-2 border-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="formData.email"
              type="email"
              class="mt-1 block w-full rounded-md border border-solid px-4 py-2 border-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              v-model="formData.phone"
              type="tel"
              class="mt-1 block w-full rounded-md border border-solid px-4 py-2 border-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
              :class="{ 'border-red-500': errors.phone }"
            />
            <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">State</label>
          <select
            v-model="formData.state"
            class="mt-1 block w-full rounded-md border border-solid px-4 py-2 border-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.state }"
          >
            <option value="">Select a state</option>
            <option v-for="state in nigerianStates" :key="state" :value="state">
              {{ state }}
            </option>
          </select>
          <span v-if="errors.state" class="text-red-500 text-sm">{{ errors.state }}</span>
        </div>
        <div class="flex items-center">
          <input
            v-model="formData.status"
            type="checkbox"
            id="status"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="status" class="ml-2 block text-sm text-gray-700">Set to active</label>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Customer's Details</label>
          <Editor
            v-model="formData.details"
            api-key="kig4se6iwmy7jmk65ehw0p4f4l2kxhp1jwlw2zaswypmblfc"
            :init="{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            }"
            class="mt-1"
            :class="{ 'border-red-500': errors.details }"
          />
          <span v-if="errors.details" class="text-red-500 text-sm">{{ errors.details }}</span>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Saving...' : 'Create Customer' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerStore } from '../stores/customerStore'
import Editor from '@tinymce/tinymce-vue'
import { nigerianStates } from '../utils/states'

const props = defineProps({
  customerId: {
    type: Number,
    required: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
const router = useRouter()
const customerStore = useCustomerStore()
const isSubmitting = ref(false)
const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  status: false,
  details: '',
}

const formData = reactive({ ...initialFormState })

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  details: '',
})
const errorTimers = {}
const setErrorWithTimeout = (field, message) => {
  errors[field] = message
  if (errorTimers[field]) {
    clearTimeout(errorTimers[field])
  }
  errorTimers[field] = setTimeout(() => {
    errors[field] = ''
  }, 10000)
}
const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = initialFormState[key]
  })
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  Object.values(errorTimers).forEach((timer) => clearTimeout(timer))
}

const close = () => {
  resetForm()
  emit('close')
}

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!formData.firstName.trim()) {
    setErrorWithTimeout('firstName', 'First name is required')
    isValid = false
  }
  if (!formData.lastName.trim()) {
    setErrorWithTimeout('lastName', 'Last name is required')
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    setErrorWithTimeout('email', 'Email is required')
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    setErrorWithTimeout('email', 'Please enter a valid email address')
    isValid = false
  }

  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!formData.phone.trim()) {
    setErrorWithTimeout('phone', 'Phone number is required')
    isValid = false
  } else if (!phoneRegex.test(formData.phone)) {
    setErrorWithTimeout('phone', 'Please enter a valid phone number')
    isValid = false
  }

  if (!formData.state) {
    setErrorWithTimeout('state', 'Please select a state')
    isValid = false
  }

  if (!formData.details.trim()) {
    setErrorWithTimeout('details', 'Customer details are required')
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  isSubmitting.value = true
  setTimeout(async () => {
    try {
      await customerStore.addCustomer(formData)
    } catch (error) {
      console.error('Error saving customer:', error)
      emit('close')
    } finally {
      isSubmitting.value = false
      resetForm()
      emit('close')
    }
  }, 5000)
}
onMounted(() => {
  if (props.isEditing && props.customerId) {
    const customer = customerStore.getCustomerById(props.customerId)
    if (customer) {
      Object.keys(formData).forEach((key) => {
        formData[key] = customer[key]
      })
    }
  }

  return () => {
    Object.values(errorTimers).forEach((timer) => clearTimeout(timer))
  }
})
</script>
