<script setup lang="ts">
import { useFeedbackStore } from '@/data/stores/feedbackStore';

defineProps({
  image: String,
  logo: String,
  title: String,
  chips: Array<String>,
  description: String,
  loading: Boolean
})
</script>

<template>
  <div class="position-relative top-0 left-0">
    <v-img
      :src="'http://localhost:3000/static/' + image"
      height="600"
      gradient="to top, rgba(0, 0, 0, .9), rgba(255, 255, 255, 0.1)"
      cover
    >
      <div class="position-absolute bottom-0 pa-5" style="width: 100%;">
        <v-row>
          <v-col cols="2">
            <v-skeleton-loader
              type="image"
              :loading="loading"
              height="200"
              width="200"
            >
              <v-card>
                <v-img
                  v-if="logo"
                  :src="'http://localhost:3000/static/' + logo"
                  width="200"
                  aspect-ratio="1"
                  cover
                />
              </v-card>
            </v-skeleton-loader>
          </v-col>

          <v-col cols="8">
            <v-skeleton-loader
              type="heading"
              :loading="loading"
              width="500"
            >
              <span class="text-h3">{{ title }}</span>
            </v-skeleton-loader>

            <v-skeleton-loader
              :loading="loading"
              type="sentences"
            >
              <v-chip
                v-for="chip in chips"
                class="mr-2 my-1"
                variant="flat"
              >
                {{ chip }}
              </v-chip>

              <p class="text-h6" v-if="!$slots.description">{{ description }}</p>
              
              <p class="text-h6">
                <slot name="description"></slot>
              </p>
            </v-skeleton-loader>

          </v-col>
        </v-row>
        
      </div>
    </v-img>
  </div>
</template>

<style scoped>
.v-skeleton-loader {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>