import { validateRules } from '../utils/validation'

export const validationPlugin = {
  install: (app) => {
    app.config.globalProperties.$validate = validateRules
    app.directive('validate', {
      mounted(el, binding) {
        const input = el.tagName === 'INPUT' ? el : el.querySelector('input')
        if (!input) return

        const rules = binding.value

        input.addEventListener('blur', () => {
          let error = ''

          for (const rule in rules) {
            if (typeof validateRules[rule] === 'function') {
              const result = validateRules[rule](input.value, rules[rule])
              if (result !== true) {
                error = result
                break
              }
            }
          }
          let errorElement = el.querySelector('.validation-error')
          if (error) {
            if (!errorElement) {
              errorElement = document.createElement('span')
              errorElement.className = 'validation-error text-red-500 text-sm mt-1'
              el.appendChild(errorElement)
            }
            errorElement.textContent = error
          } else if (errorElement) {
            errorElement.remove()
          }
        })
      },
    })
  },
}
