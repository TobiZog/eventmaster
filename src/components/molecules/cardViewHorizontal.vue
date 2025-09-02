<script setup lang="ts">
defineProps({
  /** Image to display on the left side (if prepend slot is not in use) */
  image: String,

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
    default: 140
  }
})
</script>

<template>
  <v-card
    variant="tonal"
    :link="link"
    :height="height"
  >
    <v-row
      no-gutters
    >
      <!-- First col for image or prepend text -->
      <v-col
        :cols="!$slots.prepend ? 'auto' : 2"
      >
        <v-skeleton-loader
          v-if="!$slots.prepend"
          type="image"
          :loading="loading"
        >
          <v-sheet
            color="sheet"
          >
            <v-img 
              :src="image" 
              :height="height"
              :width="height"
              cover
            />
          </v-sheet>
        </v-skeleton-loader>

        <v-skeleton-loader
          v-else
          type="text"
          :loading="loading"
        >
          <v-sheet
            :height="height"
            color="sheet"
            width="100%"
            class="text-center d-flex justify-center align-center"
          >
            <slot name="prepend" />
          </v-sheet>
        </v-skeleton-loader>
      </v-col>

      <v-divider vertical v-if="$slots.prepend" />

      <!-- Second col for main content -->
      <v-col
        class="pl-2"
      >
        <v-skeleton-loader
          :loading="loading"
          type="sentences"
        >
          <v-sheet
            :height="height"
            color="sheet"
            class="w-100"
          >
            <div>
              <div class="text-h4 font-weight-black pt-2 h-100">
                {{ title }}
              </div>

              <div class="text-disabled">
                <slot name="content" />
              </div>
            </div>
          </v-sheet>
        </v-skeleton-loader>
      </v-col>

      <v-divider vertical />

      <!-- Third col for append content after the divider -->
      <v-col
        class="text-center d-flex justify-center align-center"
        cols="3"
        lg="2"
      >
        <slot name="append"></slot>
      </v-col>
    </v-row>
  </v-card>
</template>