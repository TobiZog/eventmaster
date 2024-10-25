<script setup lang="ts">
import accountDataCard from './accountDataCard.vue';
import accountManagingCard from './accountManagingCard.vue';
import addressesCard from './addressesCard.vue';
import paymentsCard from './paymentsCard.vue';
import OutlinedButton from '@/components/basics/outlinedButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <v-container max-width="1000">
    <v-row>
      <v-col>
        <outlined-button prepend-icon="mdi-arrow-left" @click="router.back()" >
          {{ $t('misc.onePageBack') }}
        </outlined-button>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <account-data-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <addresses-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <payments-card />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <account-managing-card />
      </v-col>
    </v-row>
  </v-container>
</template>