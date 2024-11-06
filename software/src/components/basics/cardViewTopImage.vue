<script setup lang="ts">
defineProps({
  image: String,
  errorImage: {
    type: String,
    default: "artists/unknown-artist.jpg"
  },
  title: String,
  smallerTitle: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: true
  },
  loading: Boolean
})
</script>

<template>
  <v-card
    variant="tonal"
    :link="link"
  >
    <v-skeleton-loader
      :loading="loading"
      type="image"
      height="150"
    >
      <v-img
        :src="image"
        aspect-ratio="1"
        max-height="200"
        cover
      >
        <template #error>
          <v-img
            :src="'http://localhost:3000/static/' + errorImage"
            aspect-ratio="1"
            style="background-color: aliceblue;"
          />
        </template>
      </v-img>
    </v-skeleton-loader>

    <v-skeleton-loader
      :loading="loading"
      type="heading"
    >
      <div v-if="title">
        <v-card-title v-if="!smallerTitle">
          {{ title }}
        </v-card-title>

        <v-card-title v-else style="font-size: medium">
          {{ title }}
        </v-card-title>
      </div>
    </v-skeleton-loader>

    <v-skeleton-loader
      type="sentences"
      :loading="loading"
    >
      <div class="px-4 pb-4 text-disabled" v-if="$slots.default">
        <slot></slot>
      </div>
    </v-skeleton-loader>

    <v-card-actions v-if="$slots.actions" class="card-actions position-absolute bottom-0 right-0">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>