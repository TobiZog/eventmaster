<script setup lang="ts">
import { useFeedbackStore } from '@/data/stores/feedbackStore';

const feedbackStore = useFeedbackStore()
</script>

<template>
  <v-expand-transition>
    <v-row v-if="feedbackStore.showBanner">
      <v-col>
        <v-alert
          v-model="feedbackStore.showBanner"
          :color="feedbackStore.color"
          :icon="feedbackStore.icon"
          closable
        >
          {{ feedbackStore.title }}
        </v-alert>
      </v-col>
    </v-row>
  </v-expand-transition>
</template>