<script setup lang="ts">

defineProps({
  title: String,
  icon: {
    type: String
  },
  subtitle: {
    type: String,
  }
})
</script>

<template>
  <v-card
    :title="title"
    :subtitle="subtitle"
    :prepend-icon="icon"
    class="card-outter"
  >
    <slot></slot>
    
    <v-card-actions v-if="$slots.actions" class="card-actions">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<style>
</style>