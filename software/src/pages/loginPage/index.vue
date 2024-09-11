<script setup lang="ts">
import { ref } from 'vue';
import loginForm from './loginForm.vue';
import registerForm from './registerForm.vue';
import BannerModel from '@/data/models/bannerModel';
import alertBanner from '@/components/alertBanner.vue';

const showRegisterCard = ref(false)
const banner = ref(new BannerModel())
</script>

<template>
  <v-container max-width="800">
    <v-row>
      <v-col>
        <alert-banner v-model:alert-banner="banner" />
      </v-col>
    </v-row>

    <v-expand-transition>
      <v-row v-if="!showRegisterCard">
        <v-col>
          <login-form v-model:show-register-card="showRegisterCard" v-model:banner="banner" />
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-expand-transition>
      <v-row v-if="showRegisterCard">
        <v-col>
          <register-form v-model:banner="banner" v-model:show-register-card="showRegisterCard" />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>