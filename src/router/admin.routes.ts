import DashboardPage from "@/pages/AdminDashboardPage.vue"
import ConcertsAdminPage from "@/pages/AdminConcertsPage.vue"
import BandsAdminPage from "@/pages/AdminBandsPage.vue"
import AccountsAdminPage from "@/pages/AdminAccountsPage.vue"
import GenresAdminPage from "@/pages/AdminGenresPage.vue"
import LocationsAdminPage from "@/pages/AdminLocationsPage.vue"
import FilesAdminPage from "@/pages/AdminFilesPage.vue"
import OrdersAdminPage from "@/pages/AdminOrdersPage.vue"

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
    path: '/admin/locations',
    component: LocationsAdminPage
  },
  {
    path: '/admin/files',
    component: FilesAdminPage
  },
  {
    path: '/admin/orders',
    component: OrdersAdminPage
  }
]