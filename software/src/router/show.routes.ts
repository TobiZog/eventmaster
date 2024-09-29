import ToursPage from "@/pages/shows/toursPage/index.vue";
import LocationsPage from "@/pages/shows/locationsPage/index.vue"
import SearchPage from "@/pages/shows/searchPage/index.vue"
import BandDetailPage from "@/pages/shows/bandDetailPage/index.vue"

export const showRoutes = [
  { path: '/shows/tours', component: ToursPage },
  { path: '/shows/locations', component: LocationsPage },
  { path: '/shows/search', component: SearchPage },
  { path: '/shows/band/:bandName', component: BandDetailPage }
]