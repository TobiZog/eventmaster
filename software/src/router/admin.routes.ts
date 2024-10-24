import DashboardPage from "@/pages/admin/dashboardPage/index.vue"
import ConcertsAdminPage from "@/pages/admin/concertsAdminPage/index.vue"
import BandsAdminPage from "@/pages/admin/bandsAdminPage/index.vue"
import AccountsAdminPage from "@/pages/admin/accountsAdminPage/index.vue"
import GenresAdminPage from "@/pages/admin/genresAdminPage/index.vue"
import CategoriesAdminPage from "@/pages/admin/categoriesAdminPage/index.vue"
import LocationsAdminPage from "@/pages/admin/locationsAdminPage/index.vue"

export const adminRoutes = [
  {
    path: '/admin',
    component: DashboardPage
  },
  {
    path: '/admin/concerts',
    component: ConcertsAdminPage
  },
  {
    path: '/admin/bands',
    component: BandsAdminPage
  },
  {
    path: '/admin/accounts',
    component: AccountsAdminPage
  },
  {
    path: '/admin/genres',
    component: GenresAdminPage
  },
  {
    path: '/admin/categories',
    component: CategoriesAdminPage
  },
  {
    path: '/admin/locations',
    component: LocationsAdminPage
  },
]