<script setup lang="ts">
import BannerModel from '@/data/models/bannerModel';

const alertBanner = defineModel("alertBanner", { required: true, type: BannerModel })
</script>

<template>
  <v-expand-transition>
    <v-row v-if="alertBanner.show">
      <v-col>
        <v-alert v-model="alertBanner.show" :color="alertBanner.color" :icon="alertBanner.icon" closable>
          {{ alertBanner.message }}
        </v-alert>
      </v-col>
    </v-row>
  </v-expand-transition>
</template>