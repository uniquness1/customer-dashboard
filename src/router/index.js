import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateCustomerView from '../views/CreateCustomerView.vue'
import EditCustomerView from '../views/EditCustomerView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Customer Dashboard' },
  },
  {
    path: '/customer/create',
    name: 'createCustomer',
    component: CreateCustomerView,
    meta: { title: 'Add New Customer' },
  },
  {
    path: '/customer/edit/:id',
    name: 'editCustomer',
    component: EditCustomerView,
    props: true,
    meta: { title: 'Edit Customer' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Customer Dashboard`
  next()
})

export default router
