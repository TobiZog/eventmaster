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
  }
})
</script>

<template>
  <v-card
    :variant="tonal ? 'tonal' : 'elevated'"
  >
    <v-card-title v-if="title || loading" color="primary" class="pa-0">
      <v-sheet color="primary">
        <v-skeleton-loader
          type="heading"
          :loading="loading"
          style="background-color: transparent"
        >
          <div>
            <div class="pl-2 py-1">
              <v-icon :icon="icon" v-if="icon" /> &nbsp;{{ title }}
            </div>
            <div>
              <v-card-subtitle >{{ subtitle }}</v-card-subtitle>
            </div>
          </div>
        </v-skeleton-loader>
      </v-sheet>
    </v-card-title>

    <slot name="borderless"></slot>

    <v-container>
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
