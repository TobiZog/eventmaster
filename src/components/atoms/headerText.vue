<script setup lang="ts">
defineProps({
  // Title text
  title: String,

  // Activate loading state (skeleton loader)
  loading: {
    default: false,
    type: Boolean,
  },
});
</script>

<template>
  <v-skeleton-loader
    type="heading"
    :loading="loading"
    width="300"
    class="d-flex justify-center align-center text-h4"
  >
    {{ title }}
  </v-skeleton-loader>
</template>
