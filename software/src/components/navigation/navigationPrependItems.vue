<script setup lang="ts">
</script>

<template>
  <v-app-bar-title class="pr-5">
    <!-- todo: Brand logo -->
    <v-btn variant="plain" to="/" flat>HackMyCart</v-btn>
  </v-app-bar-title>

  <v-divider vertical />

  <v-btn
    to="/bands"
    prepend-icon="mdi-guitar-electric"
    height="100%"
    :rounded="false"
  >
    {{ $t('allBands', 2) }}
  </v-btn>

  <v-divider vertical />

  <v-btn
    to="/concerts"
    prepend-icon="mdi-ticket"
    height="100%"
    :rounded="false"
  >
    {{ $t('allConcerts', 2) }}
  </v-btn>

  <v-divider vertical />


  <v-btn
    to="/locations"
    prepend-icon="mdi-city"
    height="100%"
    :rounded="false"
  >
    {{ $t('allLocations', 2) }}
  </v-btn>

  <v-divider vertical />
</template>