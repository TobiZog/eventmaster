<script setup lang="ts">
defineProps({
  /** Background image */
  image: String,

  /** Mini image on the left */
  logo: String,

  /** Title */
  title: String,

  /** Array of string to display as chips */
  chips: Array<String>,

  /** Description text */
  description: String,

  /** If true, display skeleton loader */
  loading: Boolean
})
</script>

<template>
  <v-img
    :src="!loading ? image : ''"
    height="600"
    gradient="to top, rgba(0, 0, 0, .9), rgba(255, 255, 255, 0.1)"
    cover
  >
    <div class="position-absolute bottom-0 pa-5" style="width: 100%;">
      <v-row>
        <!-- Logo -->
        <v-col cols="2 d-none d-md-block">
          <v-skeleton-loader
            type="image"
            :loading="loading"
            height="200"
            width="200"
          >
            <v-card>
              <v-img
                v-if="logo"
                :src="logo"
                width="200"
                aspect-ratio="1"
                cover
              />
            </v-card>
          </v-skeleton-loader>
        </v-col>


        <v-col cols="8">
          <!-- Title -->
          <v-skeleton-loader
            type="heading"
            :loading="loading"
            width="500"
            class="text-white"
          >
            <span class="text-h3 font-weight-bold">
              {{ title }}
            </span>
          </v-skeleton-loader>

          <v-skeleton-loader
            :loading="loading"
            type="sentences"
          >
            <!-- Chips -->
            <v-chip
              v-for="chip in chips"
              class="mr-2 my-1"
              variant="flat"
            >
              {{ chip }}
            </v-chip>


            <!-- Description -->
            <p
              class="text-h6 text-white"
              style="opacity: 0.7;"
              v-if="!$slots.description"
            >
              {{ description }}
            </p>
            
            <p
              class="text-h6 text-white"
              style="opacity: 0.7;"
            >
              <slot name="description"></slot>
            </p>
          </v-skeleton-loader>

        </v-col>
      </v-row>
      
    </div>
  </v-img>
</template>

<style scoped>
.v-skeleton-loader {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>