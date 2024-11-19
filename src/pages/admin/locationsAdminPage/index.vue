<script setup lang="ts">
import adminDataLayout from '@/layouts/adminDataLayout.vue';
import { useFeedbackStore } from '@/stores/feedback.store';
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore()
const feedbackStore = useFeedbackStore()

const headers = [
  { title: feedbackStore.i18n.t('location.name'), value: "name" },
  { title: feedbackStore.i18n.t('location.address'), value: "address" },
  { title: feedbackStore.i18n.t('location.imageIndoor'), value: "imageIndoor" },
  { title: feedbackStore.i18n.t('location.imageOutdoor'), value: "imageOutdoor" },
  { title: feedbackStore.i18n.t('location.layoutNr'), value: "layout" },
  { title: feedbackStore.i18n.t('location.capacity'), value: "capacity" },
  { title: feedbackStore.i18n.t('location.city'), value: "city" },
  { title: feedbackStore.i18n.t('location.nrOfConcerts'), value: "nrOfConcerts" },
  { title: "", value: "edit", width: 130 }
]

locationStore.getLocations()
</script>

<template>
  <admin-data-layout
    :fetch-in-progress="locationStore.fetchInProgress"
    :add-button-string="$t('location.addLocation')"
    :on-add-click="() => { locationStore.newLocation() }"
  >
    <v-data-table
      :items="locationStore.locations"
      :headers="headers"
      :loading="locationStore.fetchInProgress"
    >
      <template #item.imageIndoor="{ item }">
        <v-icon
          :icon="item.imageIndoor != '' ? 'mdi-check' : 'mdi-close'"
          :color="item.imageIndoor != '' ? 'green' : 'red'"
        />
      </template>

      <template #item.imageOutdoor="{ item }">
        <v-icon
          :icon="item.imageOutdoor != '' ? 'mdi-check' : 'mdi-close'"
          :color="item.imageOutdoor != '' ? 'green' : 'red'"
        />
      </template>
      
      <template #item.city="{ item }">
        {{ item.city.name }}
      </template>

      <template #item.edit="{ item }">
        <!-- todo <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="locationStore.editLocation(item)"
        /> -->

        <!-- todo <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="locationStore.deleteLocation(item)"
        /> -->
      </template>
    </v-data-table>
  </admin-data-layout>
</template>