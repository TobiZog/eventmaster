import AccountPage from "@/pages/AccountPage.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import PreferencesPage from "@/pages/preferencesPage/index.vue";
import ProductsPage from "@/pages/productsPage/index.vue";
import LoginPage from "@/pages/loginPage/index.vue"

const routes = [
  { path: '/products', component: ProductsPage },
  { path: '/account', component: AccountPage },
  { path: '/orders', component: OrdersPage },
  { path: '/preferences', component: PreferencesPage },
  { path: '/login', component: LoginPage },
]

export default routes