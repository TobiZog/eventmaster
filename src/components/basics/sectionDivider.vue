<script setup lang="ts">
defineProps({
  title: String,
  image: String,
  loading: Boolean
})
</script>

<template>
  <v-row class="pt-3 d-none d-md-flex">
    <!-- Left line -->
    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" class="rounded-s-lg" />
    </v-col>
    
    <!-- Title -->
    <v-col class="v-col-auto">
      <v-skeleton-loader
        type="heading"
        :loading="loading"
        width="300"
      >
        <v-sheet
          class="text-h4"
          color="sheet"
        >
          {{ title }}
        </v-sheet>
      </v-skeleton-loader>
    </v-col>

    <!-- Right line -->
    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" class="rounded-e-lg" />
    </v-col>
  </v-row>

  <v-row class="d-md-none">
    <v-col>
      <v-skeleton-loader
        type="heading"
        :loading="loading"
        class="d-flex justify-center align-center"
      >
        <span class="text-h4 text-center">{{ title }}</span>
      </v-skeleton-loader>
    </v-col>
  </v-row>

  <v-row class="d-md-none">
    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="80%" color="primary" class="rounded-pill" />
    </v-col>
  </v-row>
</template>