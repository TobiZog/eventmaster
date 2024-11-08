<script setup lang="ts">
import { useBandStore } from '@/stores/band.store';
import { useRouter } from 'vue-router';

const bandStore = useBandStore()
const router = useRouter()

bandStore.getBands()
</script>

<template>
  <v-slide-group
    show-arrows
    center-active
  >
    <v-slide-group-item
      v-for="band of bandStore.bands"
      v-slot="{ isSelected, toggle }"
    >
      <v-hover
        v-slot="{ isHovering, props }"
      >
        <v-card
          :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 12 : 2"
          v-bind="props"
          class="mx-2"
          @click="router.push('bands/details/' + band.name.replaceAll(' ', '-').toLowerCase())"
        >
          <v-img
            class="d-flex align-center text-center"
            :src="band.imageMembers"
            height="250px"
            width="350"
            cover
          >
            <v-card-title class="text-white text-h5">
              <p class="mt-4">
                {{ band.name }}
              </p>

              <p class="ma-0 text-body-1 font-weight-bold">
                {{ band.genres[0].name }}
              </p>
            </v-card-title>
          </v-img>
        </v-card>
      </v-hover>
    </v-slide-group-item>
  </v-slide-group>
</template>

<style scoped>
  .v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
</style>