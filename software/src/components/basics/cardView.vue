<script setup lang="ts">

defineProps({
  title: String,
  icon: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <v-card variant="tonal" >
    <v-card-title v-if="title || loading" color="primary" class="pa-0">
      <v-sheet color="primary" class="pl-2 py-1">
        <v-skeleton-loader
          type="heading"
          :loading="loading"
          style="background-color: transparent"
        >
          <v-icon :icon="icon" v-if="icon" /> &nbsp;{{ title }}
        </v-skeleton-loader>
      </v-sheet>
    </v-card-title>

    <v-container>
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
