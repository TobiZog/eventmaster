<script setup lang="ts">
import accountDataCard from './accountDataCard.vue';
import accountManagingCard from './accountManagingCard.vue';
import { useRouter } from 'vue-router';
import accountSubPageLayout from '@/layouts/accountSubPageLayout.vue';

const router = useRouter()
</script>

<template>
  <account-sub-page-layout>
    <v-row>
      <v-col>
        <account-data-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <account-managing-card />
      </v-col>
    </v-row>
  </account-sub-page-layout>
</template>