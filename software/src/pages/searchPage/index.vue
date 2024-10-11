<script setup lang="ts">
import searchBar from './searchBar.vue';
import eventListItem from '@/components/pageParts/eventListItem.vue';
import sectionDivider from '@/components/basics/sectionDivider.vue';
import { useSearchStore } from '@/data/stores/searchStore';

const searchStore = useSearchStore()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <search-bar />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            {{ searchStore.bands }}
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            {{ searchStore.locations }}
          </v-col>
        </v-row>


        <v-row>
          <v-col>
            <section-divider
              v-if="searchStore.alreadySearched"
              :title="$t('event', 2)"
            />
          </v-col>
        </v-row>

        <v-row
          v-if="searchStore.alreadySearched && !searchStore.searchInProgress"
          v-for="event in searchStore.events"
        >
          <v-col>
            <event-list-item
              :event="event"
              :band="event.band"
              :concerts="event.concerts"
              :loading="searchStore.searchInProgress"
            />
          </v-col>
        </v-row>

        <v-row
          v-else-if="searchStore.alreadySearched && searchStore.searchInProgress"
          v-for="i in 3"
        >
          <v-col>
            Loading...
            <!-- <event-list-item
              :loading="searchStore.searchInProgress"
            /> -->
          </v-col>
        </v-row>

        <v-row>
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