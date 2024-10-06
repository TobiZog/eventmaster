<script setup lang="ts">
import cardWithLeftImage from '../basics/cardViewLeftImage.vue';

defineProps({
  /** Image to print on the left side */ 
  image: String,
  title: String,
  loading: Boolean,
  appendIcon: {
    type: String,
    default: "mdi-ticket"
  },
  appendIconColor: {
    type: String,
    default: "secondary"
  },
  link: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <v-row v-if="!loading">
    <v-col>
      <card-with-left-image
        :title="title"
        :image="'http://localhost:3000/static/' + image"
        :link="link"
      >
        <template #content>
          <div>
            <slot name="content" />
          </div>
        </template>

        <template #append>
          <div>
            <div>
              <v-icon
                :icon="appendIcon"
                :color="appendIconColor"
                size="x-large"
              />
            </div>
            <slot name="append-text"></slot>
          </div>
        </template>
      </card-with-left-image>
    </v-col>
  </v-row>

  <v-row v-else>
    <v-col>
      <card-with-left-image :loading="loading">
        <v-skeleton-loader
          type="text" />
      </card-with-left-image>
    </v-col>
  </v-row>
</template>