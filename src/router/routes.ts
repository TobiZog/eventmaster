import BasketPage from "@/pages/BasketPage.vue"
import HomePage from "@/pages/HomePage.vue"
import { adminRoutes } from "./admin.routes";
import BandsPage from "@/pages/BandListPage.vue"
import BandDetailPage from "@/pages/BandDetailPage.vue"
import LocationsPage from "@/pages/LocationListPage.vue"
import LocationDetailPage from "@/pages/LocationDetailPage.vue"
import SearchPage from "@/pages/SearchPage.vue"
import ConcertsPage from "@/pages/ConcertListPage.vue"
import ConcertBookingPage from "@/pages/ConcertBookingPage.vue"
import AccountHomePage from "@/pages/AccountHomePage.vue";
import AccountDataPage from "@/pages/AccountUserDataPage.vue";
import OrdersPage from "@/pages/AccountOrdersPage.vue";
import LoginPage from "@/pages/AccountLoginPage.vue"
import PreferencesPage from "@/pages/PreferencesPage.vue";
import HelpPage from "@/pages/HelpPage.vue"
import ErrorPage from "@/pages/ErrorPage.vue"
import ImageLicensePage from "@/pages/ImageLicensePage.vue"
import AccountPaymentsPage from "@/pages/AccountPaymentsPage.vue"
import AccountAddressesPage from "@/pages/AccountAddressesPage.vue"

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