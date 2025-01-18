<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      v-model="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
    />
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  name: String,
  type: String,
  placeholder: String,
  error: String,
  inputClass: String,
})

const emit = defineEmits(['update:modelValue'])
</script>
