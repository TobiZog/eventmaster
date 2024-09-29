import BasketPage from "@/pages/basketPage/index.vue"
import HomePage from "@/pages/homePage/index.vue"
import { adminRoutes } from "./admin.routes";
import { accountRoutes } from "./account.routes";
import { systemRoutes } from "./system.routes";
import EventsPage from "@/pages/shows/eventsPage/index.vue";
import LocationsPage from "@/pages/locations/locationsPage/index.vue"
import SearchPage from "@/pages/shows/searchPage/index.vue"
import BandDetailPage from "@/pages/shows/bandDetailPage/index.vue"
import LocationDetailPage from "@/pages/locations/locationDetailPage/index.vue"

const routes = [
  { path: "/", component: HomePage },
  { path: '/basket', component: BasketPage },
  { path: '/locations', component: LocationsPage },
  { path: '/locations/:locationName', component: LocationDetailPage },
  { path: '/bands/:bandName', component: BandDetailPage },
  { path: '/events', component: EventsPage },
  { path: '/search', component: SearchPage },
  ...accountRoutes,
  ...adminRoutes,
  ...systemRoutes
]

export default routes