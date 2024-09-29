<script setup lang="ts">
defineProps({
  image: String,
  title: String,
  link: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <v-card
    variant="tonal"
    :link="link"
  >
    <v-row>
      <v-col cols="auto" class="pr-0">
        <v-img 
          :src="image" 
          aspect-ratio="1" 
          width="140" 
          cover 
        />
      </v-col>

      <v-col class="pl-0" cols="7">
        <v-card-title v-if="title">
          {{ title }}
        </v-card-title>

        <div class="px-4 pb-4" v-if="$slots.default">
          <slot></slot>
        </div>
      </v-col>

      <v-spacer />

      <v-divider vertical height="100%" />

      <v-col
        cols="2"
        height="100%"
        style="flex-wrap: nowrap; align-self: center;"
        class="text-h5 text-center mr-3"
      >
        <slot name="append"></slot>
      </v-col>
    </v-row>
  </v-card>
</template>