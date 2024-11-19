import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '../router/routes'

// Router configuration
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router