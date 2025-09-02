<script setup lang="ts">
defineProps({
  // Icon displayed on the left side
  prependIcon: String,

  // Color of button, defaults to secondary
  color: {
    type: String,
    default: "secondary"
  },

  // Activate loading state
  loading: Boolean
})
</script>

<template>
  <v-btn 
    :prepend-icon="prependIcon"
    variant="outlined"
    :color="color"
    :loading="loading"
  >
    <slot></slot>
  </v-btn>
</template>