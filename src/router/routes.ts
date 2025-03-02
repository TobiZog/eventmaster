import BasketPage from "@/pages/misc/basketPage/index.vue"
import HomePage from "@/pages/misc/homePage/index.vue"
import { adminRoutes } from "./admin.routes";
import BandsPage from "@/pages/bands/bandsPage/index.vue"
import BandDetailPage from "@/pages/bands/bandDetailPage/index.vue"
import LocationsPage from "@/pages/locations/locationsPage/index.vue"
import LocationDetailPage from "@/pages/locations/locationDetailPage/index.vue"
import SearchPage from "@/pages/misc/searchPage/index.vue"
import ConcertsPage from "@/pages/concerts/concertsPage/index.vue"
import ConcertBookingPage from "@/pages/concerts/concertBookingPage/index.vue"
import AccountHomePage from "@/pages/account/accountHomePage/index.vue";
import AccountDataPage from "@/pages/account/accountDataPage/index.vue";
import OrdersPage from "@/pages/account/ordersPage/index.vue";
import LoginPage from "@/pages/account/loginPage/index.vue"
import PreferencesPage from "@/pages/misc/preferencesPage/index.vue";
import HelpPage from "@/pages/misc/helpPage/index.vue"
import ErrorPage from "@/pages/misc/errorPage/index.vue"
import ImageLicensePage from "@/pages/misc/imageLicensePage/index.vue"
import AccountPaymentsPage from "@/pages/account/accountPaymentsPage/index.vue"
import AccountAddressesPage from "@/pages/account/accountAddressesPage/index.vue"

const routes = [
  // Main page
  { path: "/", component: HomePage },
  { 
    path: "/:pathMatch(.*)*", 
    redirect: to => {
      return { path: "/404" }
    }
  },

  // Account
  { path: '/account/home', component: AccountHomePage },
  { path: '/account/orders', component: OrdersPage },
  { path: '/account/data', component: AccountDataPage },
  { path: '/account/login', component: LoginPage },
  { path: '/account/payments', component: AccountPaymentsPage },
  { path: '/account/addresses', component: AccountAddressesPage },

  // Admin
  ...adminRoutes,

  // Bands
  { path: '/bands', component: BandsPage },
  { path: '/bands/details/:name', component: BandDetailPage },

  // Concerts
  { path: '/concerts', component: ConcertsPage },
  { path: '/concerts/booking/:locationUrl/:date', component: ConcertBookingPage },

  // Locations
  { path: '/locations', component: LocationsPage },
  { path: '/locations/details/:name', name: 'locationDetails', component: LocationDetailPage },
  
  // Misc
  { path: '/search', component: SearchPage },
  { path: '/basket', component: BasketPage },
  { path: '/preferences', component: PreferencesPage },
  { path: '/help', component: HelpPage },
  { path: '/license', component: ImageLicensePage },

  // Error Page
  { path: "/404", component: ErrorPage }
]

export default routes