<script setup lang="ts">
defineProps({
  title: String
})
</script>

<template>
  <v-row class="pt-3">
    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" :rounded="true" />
    </v-col>
    
    <v-col class="v-col-auto">
      <span class="text-h6">{{ title }}</span>
    </v-col>

    <v-col class="d-flex justify-center align-center">
      <v-sheet height="12" width="100%" color="primary" :rounded="true" />
    </v-col>
  </v-row>
</template>