<script setup lang="ts">
defineProps({
  /** Image to display on the left side */
  image: String,

  /** Title in the top bar */
  title: String,

  /** Make the CardView click- and hoverable */
  link: {
    type: Boolean,
    default: true
  },

  /** Displays a Skeleton Loader if true */
  loading: Boolean,

  /** Height of the card, default 140px */
  height: {
    type: Number,
    default: 200
  },

  colorHeader: String
})
</script>

<template>
  <v-card
    variant="tonal"
    :link="link"
  >
    <v-card-title v-if="title" color="primary" class="pa-0">
      <v-sheet color="primary" class="pl-2 py-1">
        {{ title }}
      </v-sheet>
    </v-card-title>

    <v-row :height="height">
      <!-- First col for image -->
      <v-col
        cols="3"
      >
        <v-skeleton-loader
          type="image"
          :loading="loading"
        >
          <v-img 
            :src="image" 
            :height="height"
            :width="100"
            aspect-ratio="1"
            cover
          />
        </v-skeleton-loader>
      </v-col>

      <!-- Second col for main content -->
      <v-col
        cols="7"
        class="text-h5"
      >
        <v-skeleton-loader
          :loading="loading"
          type="sentences"
          class="my-2"
        >
          <div>
            <slot name="content" />
          </div>
        </v-skeleton-loader>
      </v-col>

      <v-divider vertical class="mt-3" />

      <!-- Third col for append content after the divider -->
      <v-col
        cols="2"
        class="text-center pr-5 text-h5 d-flex justify-center align-center"
      >
        <slot name="append"></slot>
      </v-col>
    </v-row>
  </v-card>
</template>