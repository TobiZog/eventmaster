import AccountPage from "@/pages/AccountPage.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import PreferencesPage from "@/pages/preferencesPage/index.vue";
import ProductsPage from "@/pages/ProductsPage.vue";

const routes = [
  { path: '/', component: ProductsPage },
  { path: '/account', component: AccountPage },
  { path: '/orders', component: OrdersPage },
  { path: '/preferences', component: PreferencesPage },
]

export default routes