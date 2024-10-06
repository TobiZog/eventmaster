<script setup lang="ts">
defineProps({
  title: String,
  image: String,
  loading: Boolean
})
</script>

<template>
  <v-row class="pt-3">
    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" class="rounded-s-lg" />
    </v-col>
    
    <v-col class="v-col-auto">
      <v-skeleton-loader
        type="heading"
        :loading="loading"
        width="300"
      >
        <span class="text-h4">{{ title }}</span>
      </v-skeleton-loader>
    </v-col>

    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" class="rounded-e-lg" />
    </v-col>
  </v-row>
</template>