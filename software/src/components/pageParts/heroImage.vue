<script setup lang="ts">
import { useFeedbackStore } from '@/data/stores/feedbackStore';

defineProps({
  image: String,
  logo: String,
  title: String,
  chips: Array<String>,
  description: String
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
        <div class="position-absolute bottom-0 pa-5">
          <v-row>
            <v-col cols="2">
              <v-card>
                <v-img
                  v-if="logo"
                  :src="'http://localhost:3000/static/' + logo"
                  height="200"
                  aspect-ratio="1"
                  cover
                />
              </v-card>
            </v-col>

            <v-col cols="auto">
              <p class="text-h3">{{ title }}</p>

              <div>
                <v-chip
                  v-for="chip in chips"
                  class="mr-2 my-1"
                  variant="flat"
                >
                  {{ chip }}
                </v-chip>
              </div>

              
              <p class="text-h6" v-if="!$slots.description">{{ description }}</p>
              <slot name="description"></slot>
            </v-col>
          </v-row>
          
        </div>
      </v-img>
  </div>
</template>