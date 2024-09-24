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
  >
    <!-- Show default container only, if there is content -->
    <v-container v-if="$slots.default">
      <slot></slot>
    </v-container>

    <!-- Slot for content without padding -->
    <slot name="withoutContainer"></slot>
    
    <!-- Slot for Action Buttons in the right bottom corner -->
    <v-card-actions v-if="$slots.actions" class="card-actions">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>
