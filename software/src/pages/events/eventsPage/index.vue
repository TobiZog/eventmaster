<script setup lang="ts">
import filterBar from './filterBar.vue';
import { useRouter, useRoute } from 'vue-router';
import { useShoppingStore } from '@/data/stores/shoppingStore';
import { useFeedbackStore } from '@/data/stores/feedbackStore';
import eventListItem from './eventListItem.vue';

const route = useRoute()
const router = useRouter()
const shoppingStore = useShoppingStore()
const feedbackStore = useFeedbackStore()

// Load query attributes
shoppingStore.cityFilterName = String(route.query.city)
shoppingStore.genreFilterName = String(route.query.genre)

shoppingStore.getEvents()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />
      <!-- <div v-html="route.query.genre" /> -->

      <v-col cols="10">
        <v-row>
          <v-col>
            <filter-bar />
          </v-col>
        </v-row>

        <event-list-item
          v-if="feedbackStore.fetchDataFromServerInProgress"
          v-for="i in 3"
          :loading="true"
        />

        <v-row
          v-else-if="shoppingStore.events.length > 0"
          v-for="event of shoppingStore.events"
        >
          <v-col>
            <event-list-item
              :event="event"
            />
          </v-col>
        </v-row>

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