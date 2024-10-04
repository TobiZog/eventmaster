<script setup lang="ts">
import cardWithLeftImage from '../cardWithLeftImage.vue';

defineProps({
  image: String,
  title: String,
  description: String,
  loading: Boolean
})
</script>

<template>
  <v-row v-if="!loading">
    <v-col>
      <card-with-left-image
        :title="title"
        :image="'http://localhost:3000/static/' + image"
      >
        <div class="text-body-1 font-weight-bold">
          <div v-if="!$slots.description">
            {{ description }}
          </div>

          <div v-else>
            <slot name="description" />
          </div>
        </div>

        <template #append>
          <div>
            <v-icon
              icon="mdi-ticket"
              color="secondary"
              size="x-large"
            />
          </div>
          <slot name="append-text"></slot>
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