<script setup lang="ts">
</script>

<template>
  <v-app-bar-title class="pr-5">
    <!-- todo: Brand logo -->
    <v-btn variant="plain" to="/" flat>HackMyCart</v-btn>
  </v-app-bar-title>

  <v-divider vertical />

  <v-btn
    to="/events"
    prepend-icon="mdi-ticket"
    height="100%"
    :rounded="false"
  >
    {{ $t('allEvents', 2) }}
  </v-btn>

  <v-divider vertical />


  <v-btn
    variant="text"
    to="/locations"
    prepend-icon="mdi-city"
    height="100%"
    :rounded="false"
  >
    {{ $t('allLocations', 2) }}
  </v-btn>

  <v-divider vertical />
</template>