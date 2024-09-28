<script setup lang="ts">
defineProps({
  image: String,
  title: String
})
</script>

<template>
  <v-card
    variant="tonal"
    link
  >
    <v-row>
      <v-col cols="auto" class="pr-0">
        <v-img :src="image" aspect-ratio="1" width="140" cover />
      </v-col>

      <v-col class="pl-0">
        <v-card-title v-if="title">
          {{ title }}
        </v-card-title>

        <div class="px-4 pb-4" v-if="$slots.default">
          <slot></slot>
        </div>
      </v-col>

      <v-col cols="2" height="100%">
        <slot name="append"></slot>
      </v-col>
    </v-row>
  </v-card>
</template>