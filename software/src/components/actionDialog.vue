<script setup lang="ts">
import { ModelRef } from 'vue';

const showDialog: ModelRef<boolean> = defineModel()

defineProps({
  title: String,
  subtitle: String,
  imageUrl: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <v-dialog max-width="800" v-model="showDialog">
    <v-card :title="title" >
      <v-img v-if="imageUrl != ''" :src="imageUrl" max-height="300" />

      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>