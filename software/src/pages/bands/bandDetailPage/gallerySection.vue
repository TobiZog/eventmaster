<script setup lang="ts">
import { useBandStore } from '@/stores/band.store';
import sectionDivider from '@/components/basics/sectionDivider.vue';

const bandStore = useBandStore()
</script>

<template>
  <v-row>
    <v-col>
      <section-divider :title="$t('band.image', 2)" />
    </v-col>
  </v-row>

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
          max-height="900"
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
            v-for="image in bandStore.band.images"
            :src="image" 
            cover
          />
        </v-carousel>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>