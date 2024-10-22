<script setup lang="ts">
import { useBandStore } from '@/stores/band.store';
import cardViewHorizontal from '@/components/basics/cardViewHorizontal.vue';
import bandListItem from '@/components/pageParts/bandListItem.vue';
import bandFilterbar from './bandFilterbar.vue';

const bandStore = useBandStore()

bandStore.getBands()
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer />

      <v-col cols="10">
        <v-row>
          <v-col>
            <band-filterbar />
          </v-col>
        </v-row>

        <v-row
          v-if="bandStore.fetchInProgress"
          v-for="i in 3"
        >
          <v-col>
            <card-view-horizontal :loading="true" />
          </v-col>
        </v-row>

        <v-row
          v-else-if="bandStore.bands.length > 0"
          v-for="band in bandStore.bands"
        >
          <v-col>
            <band-list-item
              :band="band"
              :concerts="band.concerts"
              :genres="band.genres"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>