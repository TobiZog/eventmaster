<script setup lang="ts">
import { ref } from 'vue';
import loginForm from '@/components/organisms/loginForm.vue';
import registerForm from '@/components/organisms/registerForm.vue';

const showRegisterCard = ref(false)
</script>

<template>
  <v-container max-width="500">
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