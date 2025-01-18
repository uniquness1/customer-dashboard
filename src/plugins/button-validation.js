export const buttonValidationPlugin = {
  install: (app) => {
    app.directive('btn-validate', {
      mounted(el, binding) {
        const updateButtonState = () => {
          const form = binding.value ? document.querySelector(binding.value) : el.closest('form')

          if (!form) return

          const inputs = form.querySelectorAll('input, select, textarea')
          let isValid = true

          inputs.forEach((input) => {
            if (input.required && !input.value) {
              isValid = false
            }

            const errorElement = input.parentElement.querySelector('.validation-error')
            if (errorElement) {
              isValid = false
            }
          })

          el.disabled = !isValid
          el.classList.toggle('opacity-50', !isValid)
          el.classList.toggle('cursor-not-allowed', !isValid)
        }
        updateButtonState()
        const form = binding.value ? document.querySelector(binding.value) : el.closest('form')

        if (form) {
          form.addEventListener('input', updateButtonState)
          form.addEventListener('change', updateButtonState)
        }
      },
    })
  },
}
