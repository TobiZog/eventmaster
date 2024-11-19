<script setup lang="ts">
import { useBandStore } from '@/stores/band.store';
import { useConcertStore } from '@/stores/concert.store';
import { useFeedbackStore } from '@/stores/feedback.store';
import adminDataLayout from '@/layouts/adminDataLayout.vue';
import moment from 'moment';

const concertStore = useConcertStore()
const bandStore = useBandStore()
const feedbackStore = useFeedbackStore()

const headers = [
  { title: feedbackStore.i18n.t('concert.date'), value: "date" },
  { title: feedbackStore.i18n.t('concert.name'), value: "name" },
  { title: feedbackStore.i18n.t('band.name'), value: "band.name" },
  { title: feedbackStore.i18n.t('location.name'), value: "location.name" },
  { title: feedbackStore.i18n.t('concert.inStock'), value: "inStock" },
  { title: feedbackStore.i18n.t('concert.offered'), value: "offered" },
  { title: feedbackStore.i18n.t('concert.image'), value: "image" },
  { title: feedbackStore.i18n.t('concert.price'), value: "price" },
  { title: "", value: "edit", width: 130 }
]

concertStore.getConcerts()
</script>

<template>
  <admin-data-layout
    :add-button-string="$t('concert.addNewConcert')"
    :fetch-in-progress="concertStore.fetchInProgress"
    :on-add-click="() => concertStore.newConcert()"
  >
    <v-data-table
      :items="concertStore.concerts"
      :loading="concertStore.fetchInProgress"
      :headers="headers"
    >
      <template #item.date="{ item }">
        {{ moment(item.date).format("dd, DD.MM.YYYY") }}
      </template>

      <template #item.price="{ item }">
        {{ item.price.toFixed(2) }} €
      </template>

      <template #item.image="{ item }">
        <v-icon
          :icon="item.image != '' ? 'mdi-check' : 'mdi-close'"
          :color="item.image != '' ? 'green' : 'red'"
        />
      </template>

      <template #item.offered="{ item }">
        <v-icon
          :icon="item.offered ? 'mdi-check' : 'mdi-close'"
          :color="item.offered ? 'green' : 'red'"
        />
      </template>

      <template #item.edit="{ item }">
        <!-- todo <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="concertStore.editConcert(item)"
        /> -->

        <!-- todo <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="concertStore.deleteConcert(item)"
        /> -->
      </template>
    </v-data-table>
  </admin-data-layout>
</template>