<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  icon: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  },
  tonal: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: "primary"
  }
})
</script>

<template>
  <v-card
    :variant="tonal ? 'tonal' : 'elevated'"
  >
    <v-card-title
      v-if="title || loading"
      class="pa-0"
    >
      <v-sheet :color="color">
        <v-skeleton-loader
          type="heading"
          :loading="loading"
          style="background-color: transparent"
        >
          <div>
            <div class="px-2 py-1 d-flex justify-center">
              <v-icon :icon="icon" v-if="icon" />&nbsp;{{ title }}
            </div>
            <div>
              <v-card-subtitle >{{ subtitle }}</v-card-subtitle>
            </div>
          </div>
        </v-skeleton-loader>
      </v-sheet>
    </v-card-title>

    <slot name="borderless" v-if="$slots.borderless"></slot>

    <v-container v-if="$slots.default">
      <v-row>
        <v-col>
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
