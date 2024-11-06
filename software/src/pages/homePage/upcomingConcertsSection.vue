<script setup lang="ts">
import { useConcertStore } from '@/stores/concert.store';
import { useRouter } from 'vue-router';
import cardViewTopImage from '@/components/basics/cardViewTopImage.vue';
import outlinedButton from '@/components/basics/outlinedButton.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import moment from 'moment';

const concertStore = useConcertStore()
const router = useRouter()
</script>

<template>
  <v-row>
    <v-col>
      <section-divider :title="$t('concert.upcomingConcerts')" />
    </v-col>
  </v-row>

  <v-row>
    <v-col v-if="concertStore.fetchInProgress" v-for="n in 4" cols="3">
      <card-view-top-image :loading="true" />
    </v-col>

    <v-col v-else v-for="concert in concertStore.upcomingConcerts" cols="3">
      <card-view-top-image
        :image="concert.image"
        :title="concert.band.name"
        smaller-title
        @click="router.push('/bands/details/' + concert.band.name.replaceAll(' ', '-').toLowerCase())"
        :loading="concertStore.fetchInProgress"
      >
        {{ moment(concert.date).format("DD.MM.YYYY") }},
        {{ $t("misc.from") }} {{ (concert.price).toPrecision(4) }} €
      </card-view-top-image>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <outlined-button
        append-icon="mdi-chevron-right"
        @click="router.push('/concerts')"
        block
      >
        {{ $t('concert.allConcerts') }}
      </outlined-button>
    </v-col>
  </v-row>
</template>