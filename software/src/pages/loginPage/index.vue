<script setup lang="ts">
import { ref } from 'vue';
import loginForm from './loginForm.vue';
import registerForm from './registerForm.vue';

const showRegisterDialog = ref(false)
</script>

<template>
  <v-container max-width="600">
    <v-row>
      <v-col>
        <login-form v-model:show-register-dialog="showRegisterDialog" />
      </v-col>
    </v-row>
  </v-container>

  <register-form v-model:show-register-dialog="showRegisterDialog" />
</template>