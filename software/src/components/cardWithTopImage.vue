<script setup lang="ts">
defineProps({
  image: String,
  title: String
})
</script>

<template>
  <v-card>
    <v-img
      :src="'http://localhost:3000/static/' + image"
      aspect-ratio="1"
      style="background-color: aliceblue;"
      cover
    />

    <v-card-title v-if="title">
      {{ title }}
    </v-card-title>

    <div class="px-4 pb-4" v-if="$slots.default">
      <slot></slot>
    </div>

    <v-card-actions v-if="$slots.actions" class="card-actions position-absolute bottom-0 right-0">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>