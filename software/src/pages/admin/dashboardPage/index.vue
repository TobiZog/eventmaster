<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import { useBandStore } from '@/stores/band.store';
import { useAccountStore } from '@/stores/account.store';
import { useLocationStore } from '@/stores/location.store';
import { useExerciseStore } from '@/stores/exercise.store';
import { useGenreStore } from '@/stores/genre.store';
import { usePreferencesStore } from '@/stores/preferences.store';
import dashboardCard from './dashboardCard.vue';
import { useOrderStore } from '@/stores/order.store';

const concertStore = useConcertStore()
const bandStore = useBandStore()
const accountStore = useAccountStore()
const genreStore = useGenreStore()
const locationStore = useLocationStore()
const exerciseStore = useExerciseStore()
const preferencesStore = usePreferencesStore()
const orderStore = useOrderStore()

exerciseStore.solveExercise(2, 1)

preferencesStore.getStaticFiles()
bandStore.getBands()
locationStore.getLocations()
genreStore.getGenres()
accountStore.getAllAccounts()
concertStore.getConcerts()
orderStore.getAllOrders()
</script>

<template>
  <v-container>
    <v-row>
      <dashboard-card
        :title="$t('band.band', 2)"
        icon="mdi-guitar-electric"
        :first-line="bandStore.bands.length + ' ' + $t('band.band', 2)"
        :second-line="bandStore.bands.reduce((counter, band) => {
          return band.concerts.length == 0 ? counter += 1 : counter
        }, 0) + ' ' + $t('band.withoutConcert', 2)"
        button-route="/admin/bands"
        :loading="bandStore.fetchInProgress"
      />

      <dashboard-card
        :title="$t('concert.concert', 2)"
        icon="mdi-ticket"
        :first-line="concertStore.concerts.length + ' ' + $t('concert.concert', 2)"
        :second-line="concertStore.concerts.reduce((counter, obj) => {
          if (obj.inStock == 0) {
            counter += 1
          }

          return counter
        }, 0) + ' ' + $t('concert.concertSoldOut')"
        button-route="/admin/concerts"
        :loading="concertStore.fetchInProgress"
      />


      <dashboard-card
        :title="$t('location.location', 2)"
        icon="mdi-city"
        :first-line="locationStore.locations.length + ' ' + $t('location.location', 2)"
        :second-line="locationStore.locations.reduce((city, obj) => {
          city[obj.city.name] = 
            city[obj.city.name] === undefined ? city.push(obj.city.name) : city[obj.city.name] += 1

          return city
        }, []).length + ' ' + $t('location.city', 2)"
        button-route="/admin/locations"
        :loading="locationStore.fetchInProgress"
      />

      <dashboard-card
        :title="$t('account.account', 2)"
        icon="mdi-account"
        :first-line="accountStore.accounts.length + ' ' + $t('account.account', 2)"
        :second-line="accountStore.accounts.reduce((counter, obj) => {
          return obj.accountRole.privilegeAdminPanel ? counter += 1 : counter
          }, 0) + ' ' + $t('account.administrator', 2)"
        button-route="/admin/accounts"
        :loading="accountStore.fetchInProgress"
      />

      <dashboard-card
        :title="$t('band.genre', 2)"
        icon="mdi-music-clef-treble"
        :first-line="genreStore.genres.length + ' ' + $t('band.genre', 2)"
        :second-line="genreStore.genres.reduce((counter, obj) => {
            return obj.bands.length == 0 ? counter += 1 : counter
          }, 0) + ' ' + $t('genre.withoutBand', 2)"
        button-route="/admin/genres"
        :loading="genreStore.fetchInProgress"
      />

      <dashboard-card
        :title="$t('misc.file', 2)"
        icon="mdi-file"
        :first-line="preferencesStore.staticFiles.reduce((counter, obj) => {
            return counter += obj.files.length
          }, 0) + ' ' + $t('misc.file', 2)"
        :second-line="preferencesStore.staticFiles.length + ' ' + $t('misc.folder', 2)"
        button-route="/admin/files"
        :loading="preferencesStore.fetchInProgress"
      />

      <dashboard-card
        :title="$t('order.order', 2)"
        icon="mdi-basket"
        :first-line="orderStore.orders.length + ' ' + $t('order.order', 2)"
        :second-line="orderStore.orders.reduce((counter, obj) => {
          return !obj.shipped ? counter += 1 : counter
        }, 0) + ' ' + $t('order.notShipped')"
        button-route="/admin/orders"
        :loading="orderStore.fetchInProgress"
      />
    </v-row>
  </v-container>
</template>