<script setup lang="ts">
import { BandModel } from '@/data/models/acts/bandModel';
import { useBandStore } from '@/data/stores/bandStore';

const bandStore = useBandStore()

defineProps({
  band: {
    type: BandModel,
    required: true
  }
})
</script>

<template>
  <v-row>
    <v-col>
      <v-skeleton-loader
        type="image"
        :loading="bandStore.fetchInProgress"
      >
        <v-carousel
          show-arrows
          hide-delimiter-background
          hide-delimiters
          height="900"
        >
          <template #prev="{ props }">
            <v-btn
              variant="text"
              @click="props.onClick"
              icon="mdi-chevron-left"
            />
          </template>

          <template #next="{ props }">
            <v-btn
              variant="text"
              @click="props.onClick"
              icon="mdi-chevron-right"
            />
          </template>


          <v-carousel-item
            v-for="image in band.images"
            :src="'http://localhost:3000/static/' + image" 
            cover
          />
        </v-carousel>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>