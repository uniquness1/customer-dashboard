import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { validationPlugin } from './plugins/validation'
import { buttonValidationPlugin } from './plugins/button-validation'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(validationPlugin)
app.use(buttonValidationPlugin)

app.mount('#app')
