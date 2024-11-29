<script setup lang="ts">
import { useBandStore } from '@/stores/band.store';
import bandEditDialog from './bandEditDialog.vue';
import dataLayout from '@/layouts/dataLayout.vue';
import { useFeedbackStore } from '@/stores/feedback.store';

const bandStore = useBandStore()
const feedbackStore = useFeedbackStore()

const headers = [
  { title: feedbackStore.i18n.t('band.name'), value: "name" },
  { title: feedbackStore.i18n.t('band.foundingYear'), value: "foundingYear" },
  { title: feedbackStore.i18n.t('band.genre', 2), value: "genres" },
  { title: feedbackStore.i18n.t('band.logo', 2), value: "logo" },
  { title: feedbackStore.i18n.t('band.imageMember', 2), value: "imageMembers" },
  { title: feedbackStore.i18n.t('band.image', 2), value: "images" },
  { title: feedbackStore.i18n.t('concert.concert', 2), value: "nrOfConcerts" },
  { title: "", value: "edit", width: 130 }
]

bandStore.getBands()
</script>

<template>
  <data-layout
    :add-button-string="$t('band.addNewBand')"
    :fetch-in-progress="bandStore.fetchInProgress"
    :on-add-click="() => bandStore.newBand()"
  >
    <v-data-table
      :items="bandStore.bands"
      :headers="headers"
      :loading="bandStore.fetchInProgress"
    >
      <template #item.genres="{ item }">
        <v-chip v-for="genre of item.genres" class="mx-1">
          {{ genre.name }}
        </v-chip>
      </template>

      <template #item.logo="{ item }">
        <v-icon
          :icon="item.logo != '' ? 'mdi-check' : 'mdi-close'"
          :color="item.logo != '' ? 'green' : 'red'"
        />
      </template>

      <template #item.imageMembers="{ item }">
        <v-icon
          :icon="item.imageMembers != '' ? 'mdi-check' : 'mdi-close'"
          :color="item.imageMembers != '' ? 'green' : 'red'"
        />
      </template>

      <template #item.images="{ item }">
        {{ item.images.length }} {{ $t('band.image', item.images.length) }}
      </template>

      <template #item.edit="{ item }">
        <!-- todo <v-btn
          icon="mdi-pencil"
          variant="plain"
          color="orange"
          @click="bandStore.editBand(item.name)"
        /> -->

        <!-- todo <v-btn
          icon="mdi-delete"
          variant="plain"
          color="red"
          @click="bandStore.deleteBand(item.id)"
        /> -->
      </template>
    </v-data-table>
  </data-layout>

  <band-edit-dialog />
</template>