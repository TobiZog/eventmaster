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
  }
})
</script>

<template>
  <v-card
    variant="tonal"
    link
  >
    <v-img
      :src="'http://localhost:3000/static/' + image"
      aspect-ratio="1"
      style="background-color: aliceblue;"
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

    <div v-if="title">
      <v-card-title v-if="!smallerTitle">
        {{ title }}
      </v-card-title>

      <v-card-title v-else style="font-size: medium">
        {{ title }}
      </v-card-title>
    </div>


    <div class="px-4 pb-4" v-if="$slots.default">
      <slot></slot>
    </div>

    <v-card-actions v-if="$slots.actions" class="card-actions position-absolute bottom-0 right-0">
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>