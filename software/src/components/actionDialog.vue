<script setup lang="ts">
import { ModelRef } from 'vue';

const showDialog: ModelRef<boolean> = defineModel()

defineProps({
  title: String,
  icon: {
    type: String,
    default: "mdi-cog"
  },
  subtitle: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <v-dialog max-width="1200" v-model="showDialog">
    <v-card :title="title" :subtitle="subtitle" :prepend-icon="icon" >
      <slot name="content"></slot>
      
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>