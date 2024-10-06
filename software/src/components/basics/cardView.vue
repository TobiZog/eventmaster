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
    variant="tonal"
    :prepend-icon="icon"
    :title="title"
    :subtitle="subtitle"
  >
    <v-container class="pt-0">
      <v-row>
        <v-col >
          <slot></slot>
        </v-col>
      </v-row>
    </v-container>
    
    <v-card-actions v-if="$slots.actions">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>
