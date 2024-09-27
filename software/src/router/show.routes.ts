import EventsPage from "@/pages/shows/eventsPage/index.vue";
import GenresPage from "@/pages/shows/genresPage/index.vue";
import LocationsPage from "@/pages/shows/locationsPage/index.vue"
import SearchPage from "@/pages/shows/searchPage/index.vue"

export const showRoutes = [
  { path: '/shows/events', component: EventsPage },
  { path: '/shows/genres', component: GenresPage },
  { path: '/shows/locations', component: LocationsPage },
  { path: '/shows/search', component: SearchPage },
]