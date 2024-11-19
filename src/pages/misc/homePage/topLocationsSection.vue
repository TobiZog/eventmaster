<script setup lang="ts">
import outlinedButton from '@/components/basics/outlinedButton.vue';
import cardViewTopImage from '@/components/basics/cardViewTopImage.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useRouter } from 'vue-router';
import { useLocationStore } from '@/stores/location.store';

const router = useRouter()
const locationStore = useLocationStore()
</script>

<template>
  <v-row>
    <v-col>
      <section-divider :title="$t('location.topLocations')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col
      v-if="locationStore.fetchInProgress"
      v-for="n in 8"
      cols="6"
      md="3"
    >
      <card-view-top-image :loading="true" />
    </v-col>

    <v-col
      v-else
      v-for="location in locationStore.topLocations"
      cols="6"
      md="3"
    >
      <card-view-top-image
        :image="location.imageOutdoor"
        :title="location.name"
        smaller-title
        @click="router.push('/locations/details/' + location.name.replaceAll(' ', '-').toLowerCase())"
        :loading="locationStore.fetchInProgress"
      >
        {{ location.city.name }}, {{ location.city.country }}
      </card-view-top-image>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <outlined-button
        append-icon="mdi-chevron-right"
        @click="router.push('/locations')"
        block
      >
        {{ $t('location.allLocations') }}
      </outlined-button>
    </v-col>
  </v-row>
</template>