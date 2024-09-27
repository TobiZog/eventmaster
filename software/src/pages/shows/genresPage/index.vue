<script setup lang="ts">
import sectionDivider from '@/components/sectionDivider.vue';
import { useShowStore } from '@/data/stores/showStore';

const showStore = useShowStore()
</script>

<template>
  <v-container>
    <div v-for="genre in showStore.genres">
      <v-row>
        <v-col>
          <section-divider :title="genre.name" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>