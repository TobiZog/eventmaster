import AccountPage from "@/pages/accountPage/index.vue";
import OrdersPage from "@/pages/ordersPage/index.vue";
import PreferencesPage from "@/pages/preferencesPage/index.vue";
import ProductsPage from "@/pages/productsPage/index.vue";
import LoginPage from "@/pages/loginPage/index.vue"
import BasketPage from "@/pages/basketPage/index.vue"
import HelpPage from "@/pages/helpPage/index.vue"
import ScoreBoardPage from "@/pages/scoreBoardPage/index.vue"
import adminRoutes from "./admin.routes";

const routes = [
  { path: '/', component: ProductsPage },
  { path: '/account', component: AccountPage },
  { path: '/orders', component: OrdersPage },
  { path: '/preferences', component: PreferencesPage },
  { path: '/login', component: LoginPage },
  { path: '/basket', component: BasketPage },
  { path: '/scoreboard', component: ScoreBoardPage },
  { path: '/help', component: HelpPage },
  ...adminRoutes
]

export default routes