<script setup lang="ts">
import { ref } from 'vue';
import loginForm from './loginForm.vue';
import registerForm from './registerForm.vue';
import alertBanner from '@/components/alertBanner.vue';

const showRegisterCard = ref(false)
</script>

<template>
  <v-container max-width="800">
    <v-row>
      <v-col>
        <alert-banner />
      </v-col>
    </v-row>

    <v-expand-transition>
      <v-row v-if="!showRegisterCard">
        <v-col>
          <login-form v-model:show-register-card="showRegisterCard" />
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-expand-transition>
      <v-row v-if="showRegisterCard">
        <v-col>
          <register-form v-model:show-register-card="showRegisterCard" />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>