<script setup lang="ts">
import navigationPrependItems from './navigationPrependItems.vue';
import navigationAppendItems from './navigationAppendItems.vue';
</script>

<template>
  <v-app-bar
    height="80"
    color="primary" 
    class="px-5"
    elevation="0"
  >
    <template #prepend>
      <navigation-prepend-items />
    </template>

    <template #append>
      <navigation-append-items />
    </template>
  </v-app-bar>
</template>