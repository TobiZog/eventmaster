<script setup lang="ts">
import { useRouter } from 'vue-router';
import outlinedButton from '@/components/basics/outlinedButton.vue';

const router = useRouter()
</script>

<template>
  <v-container max-width="1000">
    <!-- Back to previous page -->
    <v-row>
      <v-col>
        <outlined-button prepend-icon="mdi-arrow-left" @click="router.back()" >
          {{ $t('misc.onePageBack') }}
        </outlined-button>
      </v-col>
    </v-row>

    <slot></slot>
  </v-container>
</template>