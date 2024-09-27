<script setup lang="ts">
import sectionDivider from '@/components/sectionDivider.vue';
import { useShowStore } from '@/data/stores/showStore';
import cardWithTopImage from '@/components/cardWithTopImage.vue';
import { calcRating } from '@/scripts/showsScripts';

const showStore = useShowStore()
</script>

<template>
  <v-container>
    <div v-for="genre in showStore.genres">
      <v-row>
        <v-col>
          <section-divider 
            :title="genre.name"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="band in genre.bands" cols="3">
          <card-with-top-image
            :image="'bands/' + band.images[0]"
            :title="band.name"
          >
            <div class="d-flex justify-center pt-3">
            <v-rating
              density="compact"
              readonly
              size="large"
              half-increments
              active-color="orange"
              :model-value="calcRating(band.ratings)"
            />
          </div>
          </card-with-top-image>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>