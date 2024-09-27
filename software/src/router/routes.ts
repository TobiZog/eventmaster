import BasketPage from "@/pages/basketPage/index.vue"
import HomePage from "@/pages/homePage/index.vue"
import { adminRoutes } from "./admin.routes";
import { accountRoutes } from "./account.routes";
import { showRoutes } from "./show.routes";
import { systemRoutes } from "./system.routes";

const routes = [
  { path: "/", component: HomePage },
  { path: '/basket', component: BasketPage },
  ...showRoutes,
  ...accountRoutes,
  ...adminRoutes,
  ...systemRoutes
]

export default routes