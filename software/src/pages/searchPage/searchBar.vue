<script setup lang="ts">
import cardView from '@/components/basics/cardView.vue';
import { useSearchStore } from '@/data/stores/searchStore';

const searchStore = useSearchStore()
</script>

<template>
  <card-view >
    <v-text-field
      variant="outlined"
      hide-details
      v-model="searchStore.searchTerm"
      :placeholder="$t('enterSomeKeywords')"
    >
      <template #append-inner>
        <v-btn
          icon="mdi-magnify"
          variant="plain"
          @click="searchStore.startSearch"
        />
      </template>
    </v-text-field>
  </card-view>
</template>