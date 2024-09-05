<script setup lang="ts">
import { Ref, ref } from 'vue';
import pageSetup from './pageSetup.vue';
import systemSetup from './systemSetup.vue';
import BannerModel from '@/data/models/bannerModel';
import alertBanner from '@/components/alertBanner.vue';

const banner: Ref<BannerModel> = ref(new BannerModel())
</script>

<template>
  <v-container max-width="800">
    <alert-banner v-model:alert-banner="banner" />

    <v-row>
      <v-col>
        <page-setup />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <system-setup v-model:alert-banner="banner" />
      </v-col>
    </v-row>
  </v-container>
</template>