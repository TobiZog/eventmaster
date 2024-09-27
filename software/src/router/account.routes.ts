import AccountHomePage from "@/pages/account/accountHomePage/index.vue";
import AccountDataPage from "@/pages/account/accountDataPage/index.vue";
import OrdersPage from "@/pages/account/ordersPage/index.vue";
import LoginPage from "@/pages/account/loginPage/index.vue"

export const accountRoutes = [
  { path: '/account/home', component: AccountHomePage },
  { path: '/account/login', component: LoginPage },
  { path: '/account/edit', component: AccountDataPage },
  { path: '/account/orders', component: OrdersPage },
]