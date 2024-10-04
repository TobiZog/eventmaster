<script setup lang="ts">
import { createDateRangeString, lowestTicketPrice } from '@/scripts/concertScripts';
import filterBar from './filterBar.vue';
import { useRouter } from 'vue-router';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import concertListItem from '@/components/pageParts/concertListItem.vue';

const router = useRouter()
const shoppingStore = useShoppingStore()
const feedbackStore = useFeedbackStore()

shoppingStore.getEvents()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <filter-bar />
          </v-col>
        </v-row>

        <concert-list-item
          v-if="feedbackStore.fetchDataFromServerInProgress"
          v-for="i in 3"
          :loading="true"
        />

        <concert-list-item
          v-else-if="shoppingStore.events.length > 0"
          v-for="event of shoppingStore.events"
          :image="event.image"
          :title="event.band.name + ' - ' +  event.name"
          @click="router.push('/bands/' + event.band.name.replaceAll(' ', '-').toLowerCase())"
        >
          <template #description>
            {{ createDateRangeString(event) }}
            <div>{{ event.concerts.length }} {{ $t('concert', event.concerts.length) }}</div>
          </template>

          <template #append-text>
            {{ $t('from') + ' ' + lowestTicketPrice(event) + ' €' }}
          </template>
        </concert-list-item>

        <v-row v-else>
          <v-col>
            <v-empty-state 
              :title="$t('noEventsFound')"
              icon="mdi-magnify"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>