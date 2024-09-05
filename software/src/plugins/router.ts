import { createRouter, createWebHistory } from 'vue-router'
import routes from './../router/routes'

// Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router