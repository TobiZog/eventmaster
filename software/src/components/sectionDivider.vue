<script setup lang="ts">
defineProps({
  title: String,
  image: String,
  loading: Boolean
})
</script>

<template>
  <div v-if="image" class="pt-1">
    <v-img
      :src="'http://localhost:3000/static/' + image"
      height="120"
      gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.7)"
      cover
      class="rounded-t-xl"
    >
      <v-container
        height="100%"
        class="d-flex justify-center align-center"
      >
        <v-row>
          <v-spacer />

          <v-col class="v-col-auto">
            <span class="text-h4" style="color: white;">{{ title }}</span>
          </v-col>

          <v-spacer />
        </v-row>
      </v-container>
    </v-img>
  </div>

  <v-row v-else class="pt-3">
    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" class="rounded-s-lg" />
    </v-col>
    
    <v-col class="v-col-auto">
      <v-skeleton-loader
        type="heading"
        :loading="loading"
        width="300"
      >
        <span class="text-h4">{{ title }}</span>
      </v-skeleton-loader>
    </v-col>

    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" class="rounded-e-lg" />
    </v-col>
  </v-row>
</template>