<script setup lang="ts">
import { ModelRef } from 'vue';
import cardView from './cardView.vue';

const showDialog: ModelRef<boolean> = defineModel()

defineProps({
  title: String,
  icon: {
    type: String
  },
  subtitle: {
    type: String
  }
})
</script>

<template>
  <v-dialog max-width="1200" v-model="showDialog">
    <v-card
      :title="title"
      :subtitle="subtitle"
      :icon="icon"
    >
      <slot></slot>

      <template #actions>
        <slot name="actions"></slot>
      </template>
    </v-card>
  </v-dialog>
</template>