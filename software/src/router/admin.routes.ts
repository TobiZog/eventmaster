import DashboardPage from "@/pages/admin/dashboardPage/index.vue"
import CategoriesPage from "@/pages/admin/categoriesPage/index.vue"
import AccountsPage from "@/pages/admin/accountsPage/index.vue"
import ProductsPage from "@/pages/admin/productsPage/index.vue"
import BrandsPage from "@/pages/admin/brandsPage/index.vue"

export default [
  {
    path: '/admin/dashboard',
    component: DashboardPage
  },
  {
    path: '/admin/categories',
    component: CategoriesPage
  },
  {
    path: '/admin/accounts',
    component: AccountsPage
  },
  {
    path: '/admin/products',
    component: ProductsPage
  },
  {
    path: '/admin/brands',
    component: BrandsPage
  }
]