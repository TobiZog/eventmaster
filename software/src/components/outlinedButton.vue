<script setup lang="ts">
defineProps({
  prependIcon: String,
  color: {
    type: String,
    default: "secondary"
  }
})
</script>

<template>
  <v-btn 
    :prepend-icon="prependIcon"
    variant="outlined"
    :color="color"
  >
    <slot></slot>
  </v-btn>
</template>