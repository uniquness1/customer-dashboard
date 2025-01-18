export const validateRules = {
  required: (value) => {
    if (Array.isArray(value)) return value.length > 0 || 'This field is required'
    return (value !== null && value !== undefined && value !== '') || 'This field is required'
  },

  email: (value) => {
    if (!value) return true
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value) || 'Please enter a valid email address'
  },

  phone: (value) => {
    if (!value) return true
    const regex = /^\+?[1-9]\d{9,14}$/
    return regex.test(value) || 'Please enter a valid phone number'
  },

  minLength: (value, min) => {
    if (!value) return true
    return value.length >= min || `Must be at least ${min} characters`
  },

  maxLength: (value, max) => {
    if (!value) return true
    return value.length <= max || `Must not exceed ${max} characters`
  },

  alpha: (value) => {
    if (!value) return true
    const regex = /^[A-Za-z]+$/
    return regex.test(value) || 'Only alphabetical characters allowed'
  },

  alphaNum: (value) => {
    if (!value) return true
    const regex = /^[A-Za-z0-9]+$/
    return regex.test(value) || 'Only alphanumeric characters allowed'
  },

  numeric: (value) => {
    if (!value) return true
    const regex = /^\d+$/
    return regex.test(value) || 'Only numbers allowed'
  },
}
